import React from 'react';

import classes from './Input.module.css';

function Input(props) {
    /*
    * To use the Input component set the inputtype prop of
    * the type of inputElement you want to use and the label
    * prop for a corresponding label.
    * Additionally you MUST still set the attributes you
    * would have set if you were using the regular html element.
    * */

    let inputElement = null;

    switch(props.inputtype) {
        case ('input'):
            inputElement = <input className={classes.InputElement} {...props}/>;
            break;
        case ('textarea'):
            inputElement = <textarea className={classes.InputElement} {...props}/>;
            break;
        default:
            inputElement = <input className={classes.InputElement} {...props}/>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;