//import { Icon } from "@mui/material";
import React from "react";
import { Icon } from '@mui/icons-material/AddShoppingCart';

/*export default function ButtonIcon(props) {
    return(
        <button onClick={props.onClick} type={props.type} className="buttom" >
            <Icon>{props.icon}</Icon>
        </button>
    )
}*/


export function ButtonIcon(props) {
    return(
        <button onClick={props.onClick} type={props.type} className="buttom" >
            <Icon>{props.icon}</Icon>
        </button>
    )
}
