import React from "react";
import PhotoList, { PhotoCard } from "./photo/Photo";
import ButtonIcon from "./buttoms";
import {useNavigate} from "react-router-dom"
import { IconCamera } from "./photo/avatar"
//import Contacto from "./contact";

export default function ContactGroup(props){
   let navigate = useNavigate()
   props.pic ? URL = `http://localhost:3001/${props.pic}` : URL = 'http://localhost:3001/user.png' //'https://www.entupantalla.com/wp-content/uploads/2016/08/saintseiya_001.jpg' //'http://localhost:3001/1659129281758-grupo-1-toti-1555453.jpg' // 'http://localhost:3001/user.png' // ''http://localhost:3001/1659133011128-grupo-1-toti-1555453.jpg''
   return(
      <div className="card--list">
         <ButtonIcon icon="arrow_back_ios" onClick={() => { navigate("/addgroup") }} />
         <PhotoList
            src = {URL}
            alt = "..."
         />
         
         <h1>{props.name}</h1>
         <p>{props.descrisption}</p>
      </div>
   )
};



export function Card(props){
   
   props.pic ? URL = `http://localhost:3001/${props.pic}` : URL = 'http://localhost:3001/user.png'
   return(
      <div className="card--contact">
    
         <PhotoCard 
            src = {URL}  // 'http://localhost:3001/user.png'
         />
         <h1>{props.name}</h1>
         <p>{props.descrisption}</p>
         
      </div>
   )
}