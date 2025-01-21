import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postService from "../../services/postService";
import "../../styles/DetailsInvites_css/DetailsInvites.css";
import Header from "../Header/Header";
function DetailsInvites() {
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
  const [invite, setInvite] = useState(null);
  // const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
   const API_URL = "http://localhost:8000";


  useEffect(() => {
    const fetchInviteDetails = async () => {
      try {
        const response = await postService.getPosts();
        // On compare l'ID directement, sans utiliser parseInt (car _id est probablement une chaîne de caractères)
        const foundInvite = response.data.data.find((post) => post._id === id);

        if (foundInvite) {
          setInvite(foundInvite);
          console.log(foundInvite);
        } else {
          console.log("Aucun invité trouvé avec cet ID");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de l'invité",
          error
        );
      }
    };

    fetchInviteDetails();
  }, [id]);

  if (!invite) {
    return <div>Chargement des détails de l'invité...</div>;
  }

  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg">
              <div className="card-header text-center bg-dark text-white py-4">
                <h2 className="mb-0">Bienvenue au mariage</h2>
                <h2 className="mb-0">de</h2>
                <h2 className="mb-0">Steph et Alexia</h2>
              </div>

              <div className="card-body text-center py-4">
                <div className="mb-4">
                  <img
                    src={`${API_URL}/api/postImages/` + invite.image}
                    alt={`${invite.nomPrenom}`}
                    className="img-thumbnail rounded-circle"
                    style={{ width: "150px", height: "150px" }}
                  />
                </div>

                <div className="invite-details">
                  <p className="lead">
                    <strong>ID :</strong> {invite._id}
                  </p>
                  <p className="lead">
                    <strong>Nom et Prénom :</strong> {invite.nomPrenom}
                  </p>
                  <p className="lead">
                    <strong>Téléphone :</strong> {invite.telephone}
                  </p>
                  <p className="lead">
                    <strong>Table :</strong> {invite.table}
                  </p>
                </div>
              </div>

              <div className="card-footer text-center bg-light py-3">
                <p className="text-muted mb-0">
                  Nous sommes heureux de vous accueillir !
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsInvites;
