import Axios from "axios";
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonIcon from "./buttoms";


export default function AddContactGroup() {
    let navigate = useNavigate();
    return (
        <div className="button-add">
            <ButtonIcon icon="person_add" onClick={() => { navigate("/addcontactgroup") }} />
            <ButtonIcon icon="edit" onClick={() => { navigate("/addgroup") }} />
        </div>
    )
} 
