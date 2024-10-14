import React from "react";
import "../../styles/Header_css/header.css";

function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img src="../../images/logo_factory.png" className="logoApp" alt="image_marié" />
      </div>

      <div className="nav">
        <ul class="navbar">
          <li class="nav-item">
            <a class="nav-link active" href="/" rel="noopener noreferrer">
              Accueil
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/mesInvites" rel="noopener noreferrer" >
              Mes invités
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/gestionInvites" rel="noopener noreferrer">
              Gestion des invités
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/updateInvites" rel="noopener noreferrer">
            updateInvites
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
