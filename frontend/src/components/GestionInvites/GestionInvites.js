import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "../../styles/GestionInvites_css/GestionInvites.css";
import "../../styles/MesInvites_css/MesInvites.css";
import postService from "../../services/postService";
import UpdateModalComponent from "../UpdateModalComponent/UpdateModalComponent";
import { Button } from "react-bootstrap";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function GestionInvites() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
  const API_URL =  "http://localhost:8000";

  const fetchPosts = async () => {
    const response = await postService.getPosts();
    setPosts(response.data.data); // Charger tous les posts
    setFilteredPosts(response.data.data); // Initialement, tous les posts sont affichés
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const isNumeric = (str) => /^\d+$/.test(str);

    // Filtrer les posts en fonction du nom ou prénom qui correspond à searchTerm
    const filtered = posts.filter((post) => {
      if (isNumeric(searchTerm)) {
        return post.telephone.toString().includes(searchTerm);
      } else {
        return post.nomPrenom.toLowerCase().includes(searchTerm.toLowerCase());
      }
    });
    setFilteredPosts(filtered);
  };



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

  return (
    <div>
      <Header />

      <div className="search">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            className="input_search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Mettre à jour searchTerm lors de la saisie
          />
          <button type="submit">
            <img src="../../images/icon_search.svg" alt="icon_search" />
          </button>
        </form>
      </div>

      {filteredPosts.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>PHOTO</th>
              <th>ID INVITE</th>
              <th>NOMS ET PRÉNOMS</th>
              <th>TÉLÉPHONE</th>
              <th>TABLE</th>
              <th>STATUT</th>
              <th style={{textAlign: "center"}}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              
              <tr key={post.id}>
                <td style={{ width: "50px", height: "50px" }}>
                  <img 
                    src={`${API_URL}/api/postImages/` + post.image}
                    // onError={(e) =>
                    //   (e.target.src = "/path/to/default/image.jpg")
                    // } // Gérer une image par défaut si l'image est manquante
                    className="logoApp"
                    alt={"photo_" + post.nomPrenom}
                    style={{
                      borderRadius: "50px",
                      border: "1px solid red",
                      width: "100%",
                    }}
                  />
                </td>
                <td>{post.id}</td>
                <td>{post.nomPrenom}</td>
                <td>{post.telephone}</td>
                <td>{post.table}</td>
                <td>{post.status}</td>
                <td style={{ display: "flex", justifyContent: 'center' , textAlign: "center" }}>
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
        <div
          className="invite_non_trouve"
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          <div>Aucun invité trouvé.</div>
        </div>
      )}
    </div>
  );
}

export default GestionInvites;
