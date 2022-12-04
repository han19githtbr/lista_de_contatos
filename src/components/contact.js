import React from "react";
import PhotoList, { PhotoCard } from "./photo/Photo";

export default function Contacto(props){
   props.pic ? URL = `http://localhost:3001/${props.pic}` : URL = 'http://localhost:3001/user.png' 
   return(
      <div className={`card--list ${(props.id)%2 ?'--n':'--p'}`}>
         <PhotoList
            src = {URL}
            alt = "..."
         />
         <h1>{props.name}</h1>
         <p>{props.phone}</p>
         <p>{props.email}</p>
      </div>
   )
};

export function Card(props){
   props.pic ? URL = `http://localhost:3001/${props.pic}` : URL = 'http://localhost:3001/user.png'
   return(
      <div className="card--contact">
         <PhotoCard 
            src = {URL}  
         />
         <h1>{props.name}</h1>
         <p>{props.phone}</p>
         <p>{props.email}</p>
         <p>{props.adress}</p>
         {/* <p>{props.pic}</p> */}
         <p>{props.id_cont_social}</p>
         <p>{props.id_contact_group}</p>
         <p>{props.id_work}</p>
      </div>
   )
}

export function GrupoCard(props){
   props.img ? URL = `http://localhost:3001/${props.img}` : URL = 'http://localhost:3001/user.png'
   return(
      <div className="card--contact">
         <PhotoCard 
            src = {URL}  
            alt = "..."
         />
         <h1>{props.name}</h1>
         <p>{props.descrisption}</p>
         <p>{props.img}</p>
      </div>
   )
};

export function Grupo(props){
   props.img ? URL = `http://localhost:3001/${props.img}` : URL = 'http://localhost:3001/user.png'
   return(
      <div className="card--group">
         <PhotoCard 
            src = {URL}  
            alt = "..."
         />
         <h1>{props.name}</h1>
         <p>{props.descrisption}</p>
         {/* <p>{props.img}</p> */}
      </div>
   )
}

export function ListContactGroup(props){
   props.pic ? URL = `http://localhost:3001/${props.pic}` : URL = 'http://localhost:3001/user.png' 
   return(
      <div className={`card--list--contact--group`}>
         <PhotoList
            src = {URL}
            alt = "..."
         />
         <h1>{props.name}</h1>
      </div>
   )
};