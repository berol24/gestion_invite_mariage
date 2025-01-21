import React, { useState } from "react";

// import "../../styles/UpdateInvites_css/UpdateInvites.css";
import { Modal, Button } from "react-bootstrap";
import postService from "../../services/postService";

function UpdateModalComponent(props) {
  const [isShow, invokeModal] = useState(false);

  const initModal = () => {
    return invokeModal(!isShow);
  };

  // form updation data
  const [id, setId] = useState(props.id);
  const [nomPrenom, setNomPrenom] = useState(props.nomPrenom);
  const [telephone, setTelephone] = useState(props.telephone);
  const [table, setTable] = useState(props.table);
  const [status, setStatus] = useState(props.status);
  const [selectedFile, setSelectedFile] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("id", id);
    formData.append("nomPrenom", nomPrenom);
    formData.append("telephone", telephone);
    formData.append("table", table);
    formData.append("status", status);

    if (selectedFile !== "" && selectedFile.length !== 0) {
      formData.append("image", selectedFile);
    }

    const response = await postService.update(formData);

    if (response.data.success === true) {
      alert(response.data.msg);
      console.log(response);

      window.location.reload();
    } else {
      alert(response.data.msg);
    }

    initModal();
  };

  return (
    <div>
  
      <Button variant="success" onClick={initModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-pencil-square"
          viewBox="0 0 16 16"
        >
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </svg>
      </Button>

      <Modal show={isShow}>
        <Modal.Header closeButton onClick={initModal}>
          <Modal.Title>Modification de l’invité</Modal.Title>
        </Modal.Header>

        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <div className="form-update">
              <div className="form-text">
                <input
                  type="text"
                  name="nomPrenom"
                  className="form-control-update nom-prenom"
                  value={nomPrenom}
                  onChange={(e) => setNomPrenom(e.target.value)}
                />
              </div>{" "}
              <br />
              <br />
              <div className="form-text">
                <input
                  type="number"
                  name="telephone"
                  className="form-control-update telephone"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                />
              </div>{" "}
              <br />
              <br />
              <div className="form-text">
                <input
                  type="text"
                  name="table"
                  className="form-control-update table"
                  value={table}
                  onChange={(e) => setTable(e.target.value)}
                />
              </div>{" "}
              <br />
              <br />
              <div className="form-text">
                <input
                  type="text"
                  name="status"
                  className="form-control-update status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
              <br />
              <br />
              <div className="form-text">
                <input
                  type="file"
                  name="file"
                  className="form-control-update image_invite"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>
            </div>
            <br />
            <br />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={initModal}>
              Close
            </Button>
            <Button type="submit" variant="dark">
              Update
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* <form>
        <div className="form-update">
          // <div className="form-text">
            <input type="text" className="form-control-update nom-prenom" value={props.nomPrenom}/>
          </div>
          <div className="form-text">
            <input type="number" className="form-control-update telephone" value={props.telephone} />
          </div>
          <div className="form-text">
            <input type="text" className="form-control-update table" value={props.table}/>
          </div>
          <div className="form-text">
            <input type="text" className="form-control-update status" value={props.status}/>
          </div>

          <div className="form-text">
            <input type="file" className="form-control-update image_invite" />
          </div>

          <button type="submit" className="form-control-update  btn-update">
            UPDATE
          </button>
        </div>
      </form> */}
    </div>
  );
}

export default UpdateModalComponent;
