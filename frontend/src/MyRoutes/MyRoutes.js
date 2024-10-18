import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Accueil from "../components/Accueil/Accueil";
import MesInvites from "../components/MesInvites/MesInvites";
import GestionInvites from "../components/GestionInvites/GestionInvites";
import CreateInvites from "../components/CreateInvites/CreateInvites";
import UpdateModalComponent from "../components/UpdateModalComponent/UpdateModalComponent";
import DetailsInvites from "../components/DetailsInvites/DetailsInvites";



function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />}/>
        <Route path="/createInvites" element={<CreateInvites />}/>
        <Route path="/mesInvites" element={ <MesInvites /> } />
        <Route path="/gestionInvites" element={< GestionInvites />}/>
        <Route path="/updateInvites" element={<UpdateModalComponent />}/>
        <Route path="/detailsInvites/:id" element={<DetailsInvites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default MyRoutes;
