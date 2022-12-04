import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Card } from "./contact";
import ButtonIcon from "./buttoms";
import FormDialog from "./Dialog"; //modal



export default function EditContact(){
    const {id} = useParams();
    const URL = `http://localhost:3001/contact/${id}`;
    let navigate = useNavigate()
    
    const [contato, setContato] = useState([]);
    const [grupo, setGrupo] = useState('');
    const [open, setOpen] = useState(false); //modal
    console.log(contato);
    useEffect(() => {
        Axios.get(URL)
        .then((response) => {
            console.log(response);
            setContato(response.data);
        });

        // Axios.get(`http://localhost:3001/group/${contato.id_contact_group}`)
        // .then((response) => {
        //     console.log("grupo: ",response.data);
        //     setGrupo(response.data);
        // });

    }, [id]);

    useEffect(() => {
        // Axios.get(URL)
        // .then((response) => {
        //     console.log(response);
        //     setContato(response.data);
        // });

        Axios.get(`http://localhost:3001/group/${contato.id_contact_group}`)
        .then((response) => {
            console.log("grupo: ",response.data);
            setGrupo(response.data);
        });

    }, [id]);

    const handleClickCard = () =>{ //modal
        setOpen(true)
    }

    const handleDelete = ()=>{
        let isDelete = window.confirm(
            `¿Estás seguro de eliminar el registro de '${contato.name}'?`
        )
        if(isDelete){
            Axios.delete(`http://localhost:3001/delete/${id}`)
            navigate("/")
        }
        // handleClose();
     }
    //  console.log(contato)  
    return(
        <div className="container-card">
            <div className="btn--group--contact">
                <ButtonIcon 
                    icon="arrow_back_ios"
                    onClick={() => {
                        navigate("/contact")
                    }}
                />
                <ButtonIcon icon="home" onClick={() => { navigate("/") }} />
            </div>
            <FormDialog //modal
                open={open} 
                setOpen={setOpen}
                id={contato.id}
                name={contato.name}
                phone={contato.phone}
                email={contato.email}
                adress={contato.adress}
                pic={contato.pic}
                id_cont_social={contato.id_cont_social}
                id_contact_group={contato.id_contact_group}
                id_work={contato.id_work}
                // contato={contato.contato}
                // setContato={contato.setContato}
            />
            
            <Card 
                key={contato.id}
                name={contato.name}
                phone={contato.phone}
                email={contato.email}
                adress={contato.adress}
                pic={contato.pic}
                id_cont_social={contato.id_cont_social}
                id_contact_group={grupo.name}
                id_work={contato.id_work}
                
            />
            <div className="container--button">
                <ButtonIcon 
                    icon = "edit"            
                    onClick={()=>{
                        handleClickCard()
                    }}
                />
                <ButtonIcon 
                    icon = "delete"            
                    onClick={() => {
                        handleDelete()
                    }}
                />
            </div>

            
        </div>
    )
}