import React from "react";
import Header from "../Header/Header";
import "../../styles/MesInvites_css/MesInvites.css";

function MesInvites() {
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
        <tr>
          <td style={{ width: "50px", height: "50px" }}>
            <img
              src="../../images/fleur.jpg"
              className="logoApp"
              alt="image_marié"
              style={{
                borderRadius: "50px",
                border: "1px solid red",
                width: "100%",
              }}
            />
          </td>
          <td>983562816</td>
          <td>Alexia Daniella</td>
          <td>123456789</td>
          <td>Marc</td>
          <td>P</td>
        </tr>
        <tr>
          <td style={{ width: "50px", height: "50px" }}>
            <img
              src="../../images/fleur.jpg"
              className="logoApp"
              alt="image_marié"
              style={{
                borderRadius: "50px",
                border: "1px solid red",
                width: "100%",
              }}
            />
          </td>
          <td>68545955</td>
          <td>ALEX DANIEL</td>
          <td>165674626</td>
          <td>Jean</td>
          <td>A</td>
        </tr>
      </table>
    </div>
  );
}

export default MesInvites;
