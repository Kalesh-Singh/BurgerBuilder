import React from 'react';

import Button from '../../UI/Button/Button';

function OrderSummary(props) {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return <li key={ingredientKey}>
                <span style={{textTransform: 'capitalize'}}>{ingredientKey}</span>
                : {props.ingredients[ingredientKey]}
            </li>
        });
    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue with checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </>
    );
}

export default OrderSummary;

