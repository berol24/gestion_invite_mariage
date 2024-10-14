import React from "react";
import Header from "../Header/Header";
import "../../styles/UpdateInvites_css/UpdateInvites.css";

function UpdateInvites() {
  return (
    <div>
      <Header />
      <h1>Modification de l’invité</h1>
      <form>
        <div className="form-update">
          <div className="form-text">
            <input type="text" className="form-control-update nom-prenom" value={"Alexia Daniel"}/>
          </div>
          <div className="form-text">
            <input type="number" className="form-control-update telephone" value={"123456789"} />
          </div>
          <div className="form-text">
            <input type="text" className="form-control-update table" value={"Marc"}/>
          </div>
          <div className="form-text">
            <input type="text" className="form-control-update status" value={"P"}/>
          </div>

          <div className="form-text">
            <input type="file" className="form-control-update image_invite" />
          </div>

          <button type="submit" className="form-control-update  btn-update">
            UPDATE
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateInvites;
