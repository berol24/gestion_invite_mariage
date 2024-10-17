import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "../../styles/GestionInvites_css/GestionInvites.css";
import "../../styles/MesInvites_css/MesInvites.css";
import postService from "../../services/postService";

function GestionInvites() {

  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    setPosts(await postService.getPosts());
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(posts.data);



  return (
    <div>
      <Header />

      <div className="search">
        <form>
          <input
            type="text"
            className="input_search"

            // onChange={(e) => setName(e.target.value)}
            // onKeyDown={handleKeyDown}
          />
          <button type="submit">
            <img src="../../images/icon_search.svg" alt="icon_search" />
          </button>
        </form>
      </div>


      {posts.data !== undefined  && posts.data.data.length > 0  && (
      <table>
        <tr>
          <th>PHOTO</th>
          <th>ID INVITE</th>
          <th>NOMS ET PRENOMS</th>
          <th>TELEPHONE</th>
          <th>TABLE</th>
          <th>STATUS</th>
        </tr>
        <br />
 <tbody>

 {posts.data.data.map((post) => (

        <tr>
          <td style={{ width: "50px", height: "50px" }}>
            <img
              src={"http://localhost:8000/api/postImages/"+ post.image}
              className="logoApp"
              alt={"photo_" + post.nomPrenom}
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
        </tr>


))}
</tbody>
       


      </table>)}
    </div>
  );
}

export default GestionInvites;
