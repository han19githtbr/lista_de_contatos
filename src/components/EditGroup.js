import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import { Card, Grupo, GrupoCard, ListContactGroup } from "./contact";
import ButtonIcon from "./buttoms";
import FormDialog from "./Dialog"; //modal
import GroupDialog from "./GroupDialog";
import Contacto from "./contact";




export default function EditGroup(){
    const {id} = useParams();
    const URL = `http://localhost:3001/`; //editar grupo
    // const URL2 = `http://127.0.0.1:3001/group-contact/${id}`; //consultar contactos en grupo
    let navigate = useNavigate()
    
    const [grupos, setGrupos] = useState([]);
    const [contactos, setContactos] = useState([]);
    const [open, setOpen] = useState(false); //modal
    console.log(grupos);


    const getContact = async()=>{
        await Axios.get(`${URL}groupcontact/${id}`)
        .then(response=>{
        //   setContact(response.data);
          setContactos(response.data);
        }).catch(error=>{
          console.log(error);
        })  
      }
      useEffect(() =>{
        getContact();
      },[])

    useEffect(() => {
        Axios.get(`${URL}group/${id}`)
        .then((response) => {
            // console.log(response);
            setGrupos(response.data);
        });
        // Axios.get(`${URL}groupcontact/${id}`)
        //     .then((response) => {
        //         console.log("contactList: ",response);
        //         setContactos(response.data);
        //     });
    }, [id]);
    
        
    const handleClickCard = () =>{ //modal
        setOpen(true)
    }
    
    const handleDelete = ()=>{
        let isDelete = window.confirm(
            `¿Estás seguro de eliminar el registro de '${grupos.name}'?`
            )
            if(isDelete){
                Axios.delete(`http://localhost:3001/delete-group/${id}`)  //ajustar para grupos
                navigate("/group")
            }
            // handleClose();
        }
        //  console.log(contato)  
        
            // useEffect(() => {
            //     Axios.get(URL2)
            //     .then((response) => {
            //         console.log("contactList: ",response);
            //         setContactos(response.data);
            //     });
            // }, [id]);
    // const contactList = contactos.map((grp) => 
    // <p value={grp.id}>{grp.name}</p>
    // );
        return(
        <div>
            <div className="container-card">
                <div className="btn--group--contact">
                    <ButtonIcon 
                        icon="arrow_back_ios"
                        onClick={() => {
                            navigate("/group")
                        }}
                    />
                    <ButtonIcon icon="home" onClick={() => { navigate("/") }} />

                </div>
                <GroupDialog //modal
                    open={open} 
                    setOpen={setOpen}
                    key={grupos.id}
                    id={grupos.id}
                    name={grupos.name}
                    descrisption={grupos.descrisption}
                />
                
                <GrupoCard 
                    key={grupos.id}
                    name={grupos.name}
                    descrisption={grupos.descrisption}
                    img={grupos.img}
                    
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
            <div>
            {typeof contactos !== "undefined" && contactos.map((contact) => {
                    return (
                        <div className="container-list-contact">
                            <ListContactGroup
                                key={contact.id}
                                name={contact.name}
                                img={contact.img}
                            />
                        </div>
                    )
                })}
            {/* {const contactList = contactos.map((grp) => {
                return(
                    <ListContactGroup
                    key={grp.id}
                    id={grp.id}
                    name={grp.name}
                     />

                )
            } */}
    {/* // <p value={grp.id}>{grp.name}</p>
    // ); */}
            {/* {contactList} */}
                {/* {typeof contactos !== "undefined" && contactos.map((contact) => {
                    return(
                        <p>{contact.name}</p>
                        <Contacto
                                key={contact.id}
                                name={contact.name}
                                phone={contact.phone}
                                // email={contact.email}
                                pic={contact.pic}
                                // className={(contact.id) %2 ?'--n':'--p'}
                            ></Contacto>
                    )
                })} */}
            </div>
            {/* <div className="lista--contact">
                {typeof contactos !== "undefined" && contactos.map((contact) => {
                    return (
                        <Link key={contact.id} to={`/contact/${contact.id}`} >
                            <Contacto
                                key={contact.id}
                                name={contact.name}
                                phone={contact.phone}
                                email={contact.email}
                                pic={contact.pic}
                                // className={(contact.id) %2 ?'--n':'--p'}
                            ></Contacto>
                        </Link>
                    )
                })}
            </div> */}

        </div>
    )
}