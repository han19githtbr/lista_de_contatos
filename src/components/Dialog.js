import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom"
import Axios from "axios";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ButtonIcon from './buttoms';
//import ButtonIcon from './Button';
import Avatar, {IconCamera} from "./photo/avatar"
import { useForm } from 'react-hook-form'


export default function FormDialog(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  props.pic ?  URL = `http://localhost:3001/${props.pic}` : URL = 'http://localhost:3001/user.png' 
  const [pathImage, setPathImage] = useState(URL);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState();
  const [grupos, setGrupos] = useState([]);
  const [phones, setPhones] = useState([]);
  
  let navigate = useNavigate();
  let URLs = 'http://localhost:3001/group';

  useEffect(() => {
    Axios.get(URLs)
    .then(response =>{
       setGrupos(response.data)
    }).catch(error => {
       console.log(error)
    });
  });
  
  const suppliers = grupos.map((grp) => 
  <option 
  value={grp.id}
  >{grp.name}</option>
  );


  const onFileChange = (e) => {
    setFile(e.target.files[0]);
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
        console.log("there was an error")
    }
}
   const handleClose = () => {
      props.setOpen(false);
   };

      const [editValue, setEditValue] = useState({
      id: props.id,
      name: props.name,
      phone: props.phone,
      email: props.email,
      adress: props.adress,
      id_cont_social:props.id_cont_social,
      id_contact_group: props.id_contact_group,
      id_work:  props.id_work,
   });

  const handleChangeValues = (values) => {
   setEditValue({
      ...props,
      [values.target.id]: values.target.value,
   })
   console.log(values.target.value)
  };

  const handleSaveChange = () => {
   let isSave = window.confirm(
      "Desea guardar los cambios realizados?"
   )
   
   if(isSave) {
   const formData = new FormData();
   formData.append('image', file);
   formData.append('id', props.id);
   formData.append('name', editValue.name);
   formData.append('phone', editValue.phone);
   formData.append('email', editValue.email);
   formData.append('adress', editValue.adress);
   formData.append('id_cont_social', editValue.id_cont_social);
   formData.append('id_contact_group', editValue.id_contact_group);
   formData.append('id_work', editValue.id_work);
      Axios.post('http://localhost:3001/edit', formData, {
        headers: { "Content-Type": "multipart/form-data" }        
      }).then((res) => {
        console.log(res)
    });
      navigate("/contact");
   }
};

const handleDelete = ()=>{
   let isDelete = window.confirm(
       `¿Estás seguro de eliminar el registro de '${props.name}'?`
   )
   if(isDelete){
       Axios.delete(`http://localhost:3001/delete/${props.id}`)
       navigate("/")
   }
}
  return (
    <div>
      <Dialog 
        open={props.open} 
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
            Editar Contato
         </DialogTitle>
        <DialogContent>
          <form  encType="multipart/form-data">

          <div className='contact--modal'>
              <div className="container--avatar">
                <Avatar src={pathImage} />
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
              onChange={handleChangeValues}
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
                margin="dense"
                id="name"
                label="Nome"
                name="name"
                defaultValue={props.name}
                onChange={handleChangeValues}
                type="text"
                fullWidth
                variant="standard"
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
                defaultValue={props.phone}
                onChange={handleChangeValues}
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
                margin="dense"
                id="email"
                name="email"
                label="Email"
                defaultValue={props.email}
                onChange={handleChangeValues}
                type="email"
                fullWidth
                variant="standard"
              />
            </div>
            <div className="textFile">
              <label>
                <img className="photo-icon-form"
                    src="http://localhost:3001/location.png" 
                />
              </label>
              <TextField
                margin="dense"
                id="adress"
                name="adress"
                label="Endereço"
                defaultValue={props.adress}
                onChange={handleChangeValues}
                type="text"
                fullWidth
                variant="standard"
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
                  defaultValue={props.id_contact_group}
                  onChange={handleChangeValues}
                  
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
                  margin="dense"
                  id="id_cont_social"
                  name="id_cont_social"
                  defaultValue={props.id_cont_social}
                  onChange={handleChangeValues}
                  label="Empresa"
                  type="text"
                  fullWidth
                  variant="standard"
                />
            </div>

            <div className="textFile">
              <label>
                <img className="photo-icon-form"
                    src="http://localhost:3001/job-description.png" 
                />
              </label>
              <TextField
                margin="dense"
                id="id_work"
                name="id_work"
                label="Cargo"
                defaultValue={props.id_work}
                onChange={handleChangeValues}
                type="text"
                fullWidth
                variant="standard"
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
               icon = "delete"
               onClick={()=>{
                  handleDelete()
               }}
            />
            <ButtonIcon
               icon = "save"
               onClick={handleSubmit(handleSaveChange)}
            />
        </DialogActions>
      </Dialog>
    </div>
  );
}
