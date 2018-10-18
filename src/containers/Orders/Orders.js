import React, {Component} from 'react';
import Order from "../../components/Order/Order";
import fire from "../../fire";

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        this.readOrders();
    }

    readOrders = () => {
        fire.database().ref('orders').once('value')
            .then(snapshot => {
                console.log(snapshot.val());
                const fetchedOrders = [];
                for (let key in snapshot.val()) {
                    fetchedOrders.push({
                        ...snapshot.val()[key],
                        id: key
                    });
                }
                setTimeout(() => {
                    this.setState({
                        orders: fetchedOrders,
                        loading: false
                    });
                }, 1000);
            }).catch(error => {
            console.log(error.code, error.message);
            setTimeout(() => {
                this.setState({
                    error: error,
                    loading: false
                });
            }, 1000);
        });
    };

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))}
            </div>
        );
    }
}

export default Orders;