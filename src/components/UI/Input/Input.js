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

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
            />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
            />;
            break;
        case ('select'):
            inputElement =
                (<select
                    className={classes.InputElement}
                    value={props.value}
                >
                    {props.elementConfig.options.map(option => (
                        <option
                            key={option.vlaue}
                            value={option.value}
                        >
                            {option.displayValue}
                        </option>
                    ))}
                </select>);
            break;
        default:
            inputElement = <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
            />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;