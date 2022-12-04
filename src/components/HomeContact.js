import Axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ButtonIcon from "./buttoms";
import Contacto from "./contact";
import "bootstrap/dist/css/bootstrap.min.css";
import FormAddContact from "./formAddContact";



export default function HomeContact() { 
    const [open, setOpen] = useState(false);
    const [contato, setContact] = useState([]);
    const URL = "http://localhost:3001/list";
    const [formContacts, setFormContacts] = useState([]); 
    const [pesquisar, setPesquisar] = useState("");
    
    const getContact = async()=>{
      await Axios.get(URL)
      .then(response=>{
        setContact(response.data);
        setFormContacts(response.data);
      }).catch(error=>{
        console.log(error);
      })  
    }
    
    
    const handleChange=e=>{
       setPesquisar(e.target.value);
       filtrar(e.target.value); 
    }


    const filtrar=(terminaPesquisa)=>{
      var resultadosBusca = formContacts.filter((elemento)=>{
        if(elemento.name.toString().toLowerCase().includes(terminaPesquisa.toLowerCase())
        ){
          return elemento;  
        }
      });  
      setContact(resultadosBusca);
    } 


    useEffect(()=>{
    getContact();    
    },[])

    let navigate = useNavigate()
    console.log(contato);
    useEffect(() => {
        Axios.get(URL)
        .then((response) => {
            console.log(response);
            const listOrd = response.data;
            listOrd.sort((a,b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0 ))
            setContact(listOrd);
        });
    }, []);

    //modal
    const handleClickCard = () =>{
        setOpen(true)
    }
    
    return (
        <div className="home">
            <h1> Lista de Contatos</h1>
            <div className="bar-principal">
                <div className="containerInput">
                    <input
                        className="form-control inputPesquisar"
                        type={"text"}
                        placeholder = "Pesquise um contato..."
                        //name = "name"
                        value={pesquisar}
                        onChange = {handleChange}
                    />                      
                </div>
                <div className="button-add">
                    <ButtonIcon icon="home" onClick={() => { navigate("/") }} />
                    <ButtonIcon icon="person_add" onClick={() => { handleClickCard() }} />
                    <ButtonIcon icon="group_add" onClick={() => { navigate("/addgroup") }} />
                    <ButtonIcon icon="shopping-cart" />
                </div>
            </div>
            <FormAddContact
                open={open} 
                setOpen={setOpen}
            />
            <div className="lista--contact">
                {typeof contato !== "undefined" && contato.map((contact) => {
                    return (
                        <Link key={contact.id} to={`/contact/${contact.id}`} >
                            <Contacto
                                key={contact.id}
                                name={contact.name}
                                phone={contact.phone}
                                email={contact.email}
                                pic={contact.pic}
                            ></Contacto>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

