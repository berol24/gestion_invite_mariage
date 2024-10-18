import React, { useEffect, useState } from "react";
import "../../styles/Identification_css/Identification.css";
import postService from "../../services/postService";
import { useNavigate } from "react-router-dom";

function Identification() {
  const [posts, setPosts] = useState([]);
  const [idInvite, setIdInvite] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Pour gérer les erreurs
  const navigate = useNavigate(); // Hook pour la navigation

  // Fonction pour récupérer les posts
  const fetchPosts = async () => {
    try {
      const response = await postService.getPosts();
      setPosts(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Gestion de l'identification
  const handleIdentification = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    // Cherche l'invité par son numéro de téléphone
    const foundPost = posts.find((post) =>
      post.telephone.toString().toLowerCase() === idInvite.toLowerCase()
    );

    if (foundPost) {
      console.log("Invité trouvé:", foundPost);
      setErrorMessage(''); // Réinitialise le message d'erreur si l'invité est trouvé
      // Redirection vers la page de détails de l'invité avec son ID
      navigate(`/detailsInvites/${foundPost._id}`);
    } else {
      setErrorMessage("Cet invité n'existe pas.");
    }
  };

  setTimeout(() => {
    setErrorMessage(''); // Réinitialise le message d'erreur après 5 secondes
  }, 5000);


  return (
    <div className="Identification">
          {/* Affichage du message d'erreur si le numéro n'est pas trouvé */}
          {errorMessage && (
        <div class="alert alert-danger fw-bold" role="alert">
        {errorMessage}
      </div>
      )}

       <br/> <br/>
      <form onSubmit={handleIdentification}>
        <div className="input_identification">
          <label htmlFor="identification" className="form-label">
            Entrer l’identifiant de l’invité
          </label>
          
          <input
            type="text"
            className="form-control"
            name="id_invite"
            placeholder="ID invité"
            value={idInvite}
            onChange={(e) => setIdInvite(e.target.value)}
          />

          <button type="submit" className="btn-search">
            CHERCHER
          </button>
        </div>
      </form>

  
    </div>
  );
}

export default Identification;
