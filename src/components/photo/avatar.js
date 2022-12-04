import React, { useState } from "react";


export default function Avatar(props) {
   return(
      <img className="avatar" src={props.src} alt="User" />
   )
}

export function IconCamera(props) {
   return(
      <img src={props.src} alt="Selecione uma imagem" id="imgPhoto" /> 
   )
}