import axios from "axios";

class Post {



  create(formData) {
    // const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
     const API_URL = "http://localhost:8000";

    const url = `${API_URL}/api/create-post`;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    return axios.post(url, formData, config);
  }


  getPosts(){

    // const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
 const API_URL = "http://localhost:8000";
    const url = `${API_URL}/api/get-posts`;

    return axios.get(url);

  }


  deletePost(id){
    // const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
    const API_URL = "http://localhost:8000";
    const url = `${API_URL}/api/delete-post/${id}`; /// https://formation-node-mongodb-api.vercel.app est remplacé par localhost:8000 pour lire en local

    return axios.get(url);

  }


  update(formData) {
    // const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
    const API_URL = "http://localhost:8000";
    const url = `${API_URL}/api/update-post`;
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    return axios.post(url, formData, config);
  }


}



export default new Post();








