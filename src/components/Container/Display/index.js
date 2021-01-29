import React, {useState} from 'react';

export default function Display(props) {
    return (<div className="display">
        {/*{props.prevNumber ? (<div className={'smallField'}>*/}
        {/*    {props.prevNumber}*/}
        {/*</div>) : null}*/}
        <div className={'smallField'}>{props.prevNumber}</div>
        <div className={'mainField'}>
            {props.operator} {props.currentNumber}
        </div>
    </div>)
}