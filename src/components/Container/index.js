import React, {useState} from 'react';
import Display from "./Display";
import {btns, functions} from "../../const";
import Button from "./Button";

export default function Container() {
    const [state, setState] = useState({
        currentNumber: "0",
        operator: null,
        prevNumber: null,
        result: null,
        memory: "0",
    });
    console.log(state);

    function onBtnClickHandler(e) {
        const target = e.target;
        if (target.dataset.type === "number") {
            const newNumber = functions.addNumber(state.currentNumber, target.value);
            return setState((state) => {
                return {...state, ...{currentNumber: newNumber}};
            })
        } else if (target.dataset.type === "operator") {
            const currentValue = state.currentNumber;
            const operator = target.dataset.action;
            const data = {...state, btnOperator: operator}
            const setOperator = functions.operator(data);
            return setState(state => {
                return {...state, ...setOperator}
            })
        } else if (target.dataset.type === "action") {
            const action = functions[target.dataset.action](state);
            return setState(state => {
                return {...state, ...action}
            })
        } else {
            const floatNumber = functions.symbol(state.currentNumber)
            setState(item=>{
                return{
                    ...state,...floatNumber
                }
            })
        }
    }

    return (<div className="container">
        <Display currentNumber={state.currentNumber} operator={state.operator} prevNumber={state.prevNumber}/>

        <div className={'btnWrapper'}>{btns.map(item => {
            return (<Button props={item} key={item.value} onBtnClickHandler={onBtnClickHandler}/>)
        })}</div>
    </div>)
}