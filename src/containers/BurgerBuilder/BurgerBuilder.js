import React, {Component} from 'react';
import fire from '../../fire';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null
    };


    // A good hook for fetching data
    componentDidMount() {
        console.log(this.props);
        this.readIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(key => ingredients[key])
            .reduce((sum, el) => sum + el, 0);
        console.log('Sum', sum);
        this.setState({purchasable: sum > 0});
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        this.updatePurchaseState(updatedIngredients);

    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});

        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        /*this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Kalesh Singh',
                address: {
                    street: 'N Street',
                    zipCode: '51623',
                    country: 'Guyana'
                },
                email: 'kaleshsingh5162@gmail.com'
            },
            deliveryMethod: 'fastest'
        };

        this.writeUserOrder(order);*/

        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i)
                + '='
                + encodeURIComponent(this.state.ingredients[i]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    };

    writeUserOrder = (order) => {
        fire.database().ref('orders').push(order).then(() => {
            setTimeout(() => {
                this.setState({loading: false, purchasing: false});
            }, 1500);
            console.log('Loading:', this.state.loading);
        }).catch(error => {
            setTimeout(() => {
                this.setState({loading: false, purchasing: false});
            }, 1500);
            console.log(error.code, error.message);
            this.setState({error: error});
        });
    };

    readIngredients = () => {
        fire.database().ref('ingredients').once('value')
            .then(snapshot => {
                console.log(snapshot.val());
                setTimeout(() => {
                    this.setState({ingredients: snapshot.val()});
                }, 1500);
            }).catch(error => {
            console.log(error.code, error.message);
            this.setState({error: error});
        });
    };

    dismissErrorHandler = () => {
        this.setState({error: null});
    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner/>;

        if (this.state.ingredients) {
            burger =
                <>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </>;

            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}
            />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return (
            <>
                <Modal show={this.state.error} modalClosed={this.dismissErrorHandler}>
                    Something went wrong :(
                </Modal>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                 {burger}

            </>
        );
    }
}

export default BurgerBuilder;