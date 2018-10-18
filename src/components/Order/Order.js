import React from 'react';

import classes from './Order.module.css';

function Order(props) {
    console.log(props);
    return (
        <div className={classes.Order}>
            <p>Ingredients: Salad(1)</p>
            <p>Price: <stong>$ 5.45</stong></p>
        </div>
    );
}

export default Order;