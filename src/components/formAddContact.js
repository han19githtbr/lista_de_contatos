import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import Axios from "axios";
import ButtonIcon from "./buttoms";
import { IconCamera } from "./photo/avatar";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormAddContact (props) {
   const handleClose = () => {
      props.setOpen(false);
   };

    const [values, setValues] = useState([]);
    const [phones, setPhones] = useState([]);
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [pathImage, setPathImage] = useState('http://localhost:3001/user.png');
    const [grupos, setGrupos] = useState([]);
    const URL = "http://localhost:3001/group"

    // cargar Gupros
    useEffect(() => {
      Axios.get(URL)
      .then(response =>{
         setGrupos(response.data)
      }).catch(error => {
         console.log(error)
      });
    });

    let navigate = useNavigate()

    const handleChange = value => {
        setValues((prevValue)=> ({
            ...prevValue,
            [value.target.name]: value.target.value
        }))
        console.log(value.target.value)
    }

    const onFileChange = (e) => {
        if(e.target.files && e.target.files.length > 0) {
            const files = e.target.files[0];
            if(files.type.includes('image')){
                const reader = new FileReader()
                reader.readAsDataURL(files)

                reader.onload = function load() {
                    setPathImage(reader.result)
                }
            }
            setFile(files);
            setFileName(files);
            console.log('file: '+ file);
        }else {
            console.log("there was an error");
        }
    }

    const handleClick = async (e) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('name', values.name);
        formData.append('phone', values.phone);
        formData.append('email', values.email);
        formData.append('adress', values.adress);
        formData.append('id_cont_social', values.id_cont_social);
        formData.append('id_contact_group', values.id_contact_group);
        formData.append('id_work', values.id_work);
        await Axios.post("http://localhost:3001/addcontact", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        }).then((res) => {
            console.log(res)
        });
        navigate("/");
        handleClose();
    };


//    const handleClick = async (e) => {

//       await Axios.post("http://localhost:3001/addcontact",{
//          name: values.name,
//          phone: values.phone,
//          email: values.email,
//          adress: values.adress,
//       }).then((res) => {
//           console.log(res)
//       });

//       const formData = new FormData();
//       formData.append('image', file);
//       await Axios.post("http://localhost:3001/add-pic-contact", formData, {
//           headers: { "Content-Type": "multipart/form-data" }
//       }).then((res) => {
//           console.log(res)
//       });

      
//       navigate("/");
//       handleClose();
//   };






    const handleAddPhone = (e) => {
        e.preventDefault();
        console.log("activado!");
        setPhones([...phones,""]);
    }
   
    const handleChangePhone =(e, index) => {
        phones[index] = e.target.value;
        setPhones([...phones])
    }

    const handleRemovePhone = (e, position) => {
        e.preventDefault();
        setPhones([...phones.filter((_, index) => index != position)])
    }
    const suppliers = grupos.map((grp) => 
      <option key={grp.id} value={grp.id}>{grp.name}</option>
      )


   return (
      <div>
      <Dialog 
         open={props.open} 
         onClose={handleClose}
         fullWidth
         maxWidth="sm"
      >
        <DialogTitle>
            Criar Contato
         </DialogTitle>
        <DialogContent>
        <form  encType="multipart/form-data" id="addContac">

          <div className='contact--modal'>
              <div className="container--avatar">
                <img className="avatar" src={pathImage} alt="User" />
                <label htmlFor="avatar1">
                  <IconCamera 
                    src="http://localhost:3001/photo-camera.png" 
                  />
                </label>
              </div>
              <input 
                id="avatar1"
                type={"file"}
                placeholder="avatar"
                name="avatar1"
                onChange={onFileChange}
                accept="image/*"
              />
          </div>
            <TextField
              disabled
              margin="dense"
              id="id"
              label="ID"
              defaultValue={props.id}
              type="text"
              fullWidth
              variant="standard"
            />
            <div className="textFile">
              <label>
              <img className="photo-icon-form"
                  src="http://localhost:3001/user1.png" 
              />
              </label>
              <TextField
                autoFocus
                type={"text"}
                placeholder="Nome"
                name="name"
                margin="dense"
                label="Nome"
                fullWidth 
                variant="standard"
                defaultValue={null}
                onChange={handleChange}
              />
            </div>

            <div className="textFile">
              <img className="photo-icon-form"
                  src="http://localhost:3001/telephone.png" 
              />
              <TextField
                margin="dense"
                id="phone"
                name="phone"
                label="Telefone"
                defaultValue={null}
                onChange={handleChange}
                type="text"
                fullWidth
                variant="standard"
              />
            </div>

            <div className="textFile">
               <label>
                  <img className="photo-icon-form"
                        src="http://localhost:3001/mail.png" 
                  />
               </label>
               <TextField
                  type={"text"}
                  placeholder="seu@email.com"
                  name="email"
                  margin="dense"
                  label="E-mail"
                  fullWidth
                  variant="standard"
                  defaultValue={null}
                  onChange={handleChange}
               />
            </div>
            <div className="textFile">
               <label>
                  <img className="photo-icon-form"
                        src="http://localhost:3001/location.png" 
                  />
               </label>
               <TextField
               type={"text"}
               placeholder="Endereço"
               name="adress"
               margin="dense"
               label="Endereço"
               fullWidth
               variant="standard"
               defaultValue={null}
               onChange={handleChange}
               />
            </div>

            <div className="textFile">
               <label>
                  <img className="photo-icon-form"
                        src="http://localhost:3001/people.png" 
                  />
               </label>
               <select 
                  name="id_contact_group" 
                  id="id_contact_group" 
                  form="addContac" 
                  className="select--form"
                  onChange={handleChange}
               >
                  <option>Selecione un grupo </option>
                  {suppliers}
                  
               </select>
            </div>
            <div className="textFile">
               <label>
                  <img className="photo-icon-form"
                        src="http://localhost:3001/suitcase.png" 
                  />
               </label>
               <TextField
                  type={"text"}
                  placeholder="Empresa"
                  name="id_cont_social"
                  margin="dense"
                  label="Empresa"
                  fullWidth
                  variant="standard"
                  defaultValue={null}
                  onChange={handleChange}
               />
            </div>
            <div className="textFile">
               <label>
                  <img className="photo-icon-form"
                        src="http://localhost:3001/job-description.png" 
                  />
               </label>
               <TextField
                  type={"text"}
                  placeholder="Trabalho"
                  margin="dense"
                  label="Trabalho"
                  fullWidth
                  variant="standard"
                  name="id_work"
                  defaultValue={null}
                  onChange={handleChange}
               />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
            <ButtonIcon
               icon = "cancel"
               onClick={handleClose}
            /> 
            <ButtonIcon
               icon = "save"
               onClick={() => {
                  handleClick()
               }}
            />
        </DialogActions>
      </Dialog>
    </div>
   )
}