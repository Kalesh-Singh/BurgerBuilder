import React, {Component} from 'react';

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import fire from "../../../fire";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

       const order = {
           ingredients: this.props.ingredients,
           price: this.props.price,
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

       this.writeUserOrder(order);

        console.log('INGREDIENTS', this.props.ingredients);
    };

    writeUserOrder = (order) => {
        fire.database().ref('orders').push(order).then(() => {
            setTimeout(() => {
                this.setState({loading: false, purchasing: false});
                this.props.history.push('/');
            }, 1500);
            console.log('Loading:', this.state.loading);
        }).catch(error => {
            setTimeout(() => {
                this.setState({loading: false, purchasing: false});
                this.props.history.push('/');
            }, 1500);
            console.log(error.code, error.message);
            this.setState({error: error});
        });
    };

    render() {
        let form = (
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='Your name' />
                <input className={classes.Input} type='email' name='email' placeholder='Your email' />
                <input className={classes.Input} type='text' name='street' placeholder='Street' />
                <input className={classes.Input} type='text' name='postal' placeholder='Postal Code' />
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