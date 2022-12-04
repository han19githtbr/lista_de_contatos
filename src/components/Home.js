import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
   return(
      <div className="principal">
         <div className="select">
            <Link to={"/contact"} >
               <p>Contactos</p>
            </Link>
         </div>
         <div className="select">
            <Link to={"/group"}>
               <p>Grupos</p>
            </Link>
         </div>
      </div>
   )
}