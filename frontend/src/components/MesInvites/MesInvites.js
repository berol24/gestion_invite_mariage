import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "../../styles/GestionInvites_css/GestionInvites.css";
import "../../styles/MesInvites_css/MesInvites.css";
import postService from "../../services/postService";

function MesInvites() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post.id}>
                <td style={{ width: "50px", height: "50px" }}>
                  <img
                    src={"http://localhost:8000/api/postImages/" + post.image}
                    onError={(e) =>
                      (e.target.src = "/path/to/default/image.jpg")
                    } // Gérer une image par défaut si l'image est manquante
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

export default MesInvites;
