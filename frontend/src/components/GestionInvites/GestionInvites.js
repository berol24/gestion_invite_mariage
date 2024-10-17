import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "../../styles/GestionInvites_css/GestionInvites.css";
import "../../styles/MesInvites_css/MesInvites.css";
import postService from "../../services/postService";
import UpdateModalComponent from "../UpdateInvites/UpdateInvites";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"; // css boostrap
import { Button } from "react-bootstrap";

function GestionInvites() {
  const [posts, setPosts] = useState({});
  const [name, setName] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const fetchPosts = async () => {
    setPosts(await postService.getPosts());
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  /// delete post
  const deletePost = async (id, e) => {
    var response = await postService.deletePost(id);
    if (response.data.success === true) {
      alert(response.data.msg);
      document.getElementById(id).parentElement.parentElement.remove();
    } else {
      alert(response.data.msg);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!posts.data?.data) return; // Si les données ne sont pas encore chargées, ne rien faire

    const isNumeric = (str) => /^\d+$/.test(str);

    const filter = posts.data.data.filter((item) => {
      if (isNumeric(name)) {
        return item.telephone.toString().includes(name);
      } else {
        return item.nomPrenom.toLowerCase().includes(name.toLowerCase());
      }
    });

    setFilteredData(filter); // Met à jour l'état avec les résultats filtrés
  };

  // Fonction pour afficher toutes les données ou les résultats filtrés
  const getDisplayedData = () => {
    // Si aucune recherche n'est en cours (name est vide), afficher toutes les données
    if (name === "") {
      return posts.data?.data || []; // Retourner toutes les données si chargées
    }

    // Si recherche faite mais aucun résultat trouvé
    if (filteredData.length === 0) {
      return [];
    }

    return filteredData; // Sinon retourner les résultats filtrés
  };

  const displayedData = getDisplayedData();



  // Fonction pour gérer la touche "Enter" pour déclencher la recherche
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(event); // Lancer la recherche avec "Enter"
    }
  };

  return (
    <div>
      <Header />

      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input_search"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Rechercher par nom ou téléphone"
          />
          <button type="submit">
            <img src="../../images/icon_search.svg" alt="icon_search" />
          </button>
        </form>
      </div>

      {displayedData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>PHOTO</th>
              <th>ID INVITE</th>
              <th>NOMS ET PRENOMS</th>
              <th>TELEPHONE</th>
              <th>TABLE</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((post) => (
              <tr key={post._id}>
                <td style={{ width: "50px", height: "50px" }}>
                  <img
                    src={`http://localhost:8000/api/postImages/${post.image}`}
                    className="logoApp"
                    alt={`photo_${post.nomPrenom}`}
                    style={{
                      borderRadius: "50px",
                      border: "1px solid red",
                      width: "100%",
                    }}
                  />
                </td>
                <td>983562816</td>
                <td>{post.nomPrenom}</td>
                <td>{post.telephone}</td>
                <td>{post.table}</td>
                <td>{post.status}</td>
                <td style={{ display: "flex", textAlign: "center" }}>
                  <UpdateModalComponent
                    id={post._id}
                    nomPrenom={post.nomPrenom}
                    telephone={post.telephone}
                    table={post.table}
                    status={post.status}
                  />
                  <Button
                    id={post._id}
                    onClick={(e) => deletePost(post._id, e)}
                    style={{
                      color: "red",
                      background: "white",
                      border: "none",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="bi bi-trash3-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{textAlign: "center"}}>Pas de résultat</div>
      )}

      <br />
      <br />
      <br />
      <hr />
    </div>
  );
}

export default GestionInvites;
