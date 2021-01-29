import React, {useState,useEffect} from 'react';
import headerImg from '../../img/header.png'
export default function Header() {
const [state,setState]=useState(new Date())


    return (<div className={"header"}>
        <div className={"time"}>
            {state.getHours().toString().padStart(2,0)}:{state.getMinutes().toString().padStart(2,0)}
        </div>
        <div className={"imgWrapper"}>
            <img src={headerImg} alt=""/>
        </div>
    </div>)
}