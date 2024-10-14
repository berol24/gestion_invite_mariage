import React, { useState } from "react";
import "../../styles/CreateInvites_css/CreateInvites.css";
import Header from "../Header/Header";
function CreateInvites() {
  const [formData, setFormData] = useState({
    nomPrenom: "",
    telephone: "",
    table: "",
    status: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      // Si le champ est un fichier, on stocke le fichier directement
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nomPrenom", formData.nomPrenom);
    data.append("telephone", formData.telephone);
    data.append("table", formData.table);
    data.append("status", formData.status);
    data.append("image", formData.image); // Ajouter l'image à la requête

    try {
      const response = await fetch("http://localhost:5000/addInvites", {
        method: "POST",
        body: data,
      });

      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire", error);
    }
  };

  return (
    <div>
      <Header />
      <h1>Enregistrement de l’invité</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-create">
          <div className="form-text">
            <input 
              onChange={handleChange}
              type="text"
              className="form-control-create nom-prenom"
              name="nomPrenom"
              placeholder={"Alexia Daniel"}
            />
          </div>
          <div className="form-text">
            <input 
             onChange={handleChange}
              type="number"
              className="form-control-create telephone"
              name="telephone"
              placeholder={"123456789"}
            />
          </div>
          <div className="form-text">
            <input 
             onChange={handleChange}
              type="text"
              className="form-control-create table"
              name="table"
              placeholder={"Marc"}
            />
          </div>
          <div className="form-text">
            <input 
             onChange={handleChange}
              type="text"
              className="form-control-create status"
              name="status"
              placeholder={"P"}
            />
          </div>

          <div className="form-text">
            <input 
             onChange={handleChange}
              type="file"
              className="form-control-create image_invite"
              name="image"
            />
          </div>

          <button type="submit" className="form-control-create  btn-create">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateInvites;
