import { ArrowForwardIosIcon } from '@mui/icons-material/ArrowForwardIos';
import { Icon } from "@mui/material";
import React from "react";

export default function ButtonIcon(props) {
    return(
        <button onClick={props.onClick} type={props.type} className="buttom" >
            <Icon>{props.icon}</Icon>
        </button>
    )
}

export function ButtonIconF(props) {
    return(
        <button onClick={props.onClick} type={props.type} className="buttom" >
            <ArrowForwardIosIcon>{props.icon}</ArrowForwardIosIcon>
        </button>
    )
}