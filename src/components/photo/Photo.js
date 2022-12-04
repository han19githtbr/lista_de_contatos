import React from "react";
import Avatar from "./avatar";

export default function PhotoList(props){
   return(
      <>
         <div className="foto--list">
            <Avatar src = {props.src} />
         </div>
      </>
   )
}

export function PhotoCard(props){
   return(
      <>
         <div className="foto--card">
            <Avatar src = {props.src} />
         </div>
      </>
   )
}