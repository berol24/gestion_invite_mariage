import React from "react";
import "../../styles/Identification_css/Identification.css";
function Identification() {
  return (
    <div className="Identification">
      <form className="form_identification" action="#" method="#">
        <div className="input_identification">
          <label for="identification" className="form-label">
            Entrer l’identifiant de l’invité
          </label>

          <input type="text" className="form-control" placeholder="ID invité" />

          <button type="submit" className="btn-search">
            CHERCHER
          </button>
        </div>
      </form>
    </div>
  );
}

export default Identification;
