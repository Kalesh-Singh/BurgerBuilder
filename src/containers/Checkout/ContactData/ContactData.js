import React, {Component} from 'react';

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import fire from "../../../fire";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: 'Kalesh'
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: 'Kalesh'
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: 'Kalesh'
            },
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,

        };

        this.writeUserOrder(order);

        console.log('INGREDIENTS', this.props.ingredients);
    };

    writeUserOrder = (order) => {
        fire.database().ref('orders').push(order).then(() => {
            setTimeout(() => {
                this.setState({loading: false, purchasing: false});
                this.props.history.push('/');
            }, 1000);
            console.log('Loading:', this.state.loading);
        }).catch(error => {
            setTimeout(() => {
                this.setState({loading: false, purchasing: false});
                this.props.history.push('/');
            }, 1000);
            console.log(error.code, error.message);
            this.setState({error: error});
        });
    };

    render() {

        const formElementsArray = [];

        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                    />
                ))}
                <Button
                    btnType='Success'
                    clicked={this.orderHandler}
                >ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;