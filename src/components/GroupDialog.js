import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom"
import Axios from "axios";
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ButtonIcon from './buttoms';
import { Icon } from "@mui/material";
import Avatar, {IconCamera} from "./photo/avatar"
import { useForm } from 'react-hook-form'


export default function GroupDialog(props) {
   const { register, handleSubmit, formState: { errors } } = useForm();
  // URL = `http://localhost:3001/${props.pic}`: URL = 'http://localhost:3001/user.png'
  props.img ?  URL = `http://localhost:3001/${props.img}` : URL = 'http://localhost:3001/user.png' 
  const [pathImage, setPathImage] = useState(URL);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState();
  const [grupos, setGrupos] = useState([]);
  const [phones, setPhones] = useState([]);
  
  let navigate = useNavigate();



  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    if(e.target.files && e.target.files.length > 0) {
        const files = e.target.files[0];
        // const filesName = e.target.files[0].name;
        if(files.type.includes('image')){
            const reader = new FileReader()
            reader.readAsDataURL(files)

            reader.onload = function load() {
                setPathImage(reader.result)
            }
        }
        setFile(files);
        setFileName(files);
        // handleChangeValues(props);
        console.log('file: '+ file);
        // console.log('fileName: '+ filesName);
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
      descrisption: props.descrisption,
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
   formData.append('descrisption', editValue.descrisption);
      Axios.post('http://localhost:3001/editgroup', formData, {
        headers: { "Content-Type": "multipart/form-data" }        
      }).then((res) => {
        console.log(res)
    });
      navigate("/");
   }
};

const handleDelete = ()=>{
   let isDelete = window.confirm(
       `¿Estás seguro de eliminar el registro de '${props.name}'?`
   )
   if(isDelete){
       Axios.delete(`http://localhost:3001/delete-group/${props.id}`)
       navigate("/group")
   }
}
// setPhones(props.phone)
// console.log("telefonos ",props)
  return (
    <div>
      <Dialog 
        open={props.open} 
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
            Editar Informação do grupo.
         </DialogTitle>
        <DialogContent>
          <form  encType="multipart/form-data">

          <div className='contact--modal'>
              <div className="container--avatar">
                {/* <img className="avatar" src={pathImage} alt="User" /> */}
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
                // {...register("name", {
                //   required: {
                //      value: true,
                //      message: "Campo obrigatorio!"
                //   },
                //   pattern: {
                //      value: /^[a-zA-ZÀ-ÿ\s\W]{3,25}$/,
                //      message: "O nome debe conter entre 3 e 25 carateres!"
                //   }
                // })}
              />
            </div>
            {/* {errors.name && <span className="error">{errors.name.message}</span>} */}

            
            <div className="textFile">
              <img className="photo-icon-form"
                  src="http://localhost:3001/telephone.png" 
              />
              <TextField
                margin="dense"
                id="descrisption"
                name="descrisption"
                label="Descrição"
                defaultValue={props.descrisption}
                onChange={handleChangeValues}
                type="text"
                fullWidth
                variant="standard"
                // {...register("phone", {
                //   pattern: {
                //      value: /^[0-9]+$/,
                //      message: "Por favor, só ingrese número"
                //   }
                // })}
              />
            </div>
            {/* {errors.phone && <span className="error">{errors.phone.message}</span>} */}            
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
