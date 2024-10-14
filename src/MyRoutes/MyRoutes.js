import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Accueil from "../components/Accueil/Accueil";
import MesInvites from "../components/MesInvites/MesInvites";
import GestionInvites from "../components/GestionInvites/GestionInvites";
import UpdateInvites from "../components/UpdateInvites/UpdateInvites";



function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />}/>
        <Route path="/mesInvites" element={ <MesInvites/> } />
        <Route path="/gestionInvites" element={< GestionInvites />}/>
        <Route path="/updateInvites" element={<UpdateInvites />}/>
        
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
