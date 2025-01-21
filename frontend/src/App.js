import { useEffect, useState } from "react";
import "./App.css";
import MyRoutes from "./MyRoutes/MyRoutes";

function App() {
  const [message, setMessage] = useState("");
  // const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
  const API_URL ="http://localhost:8000";

  useEffect(() => {
     fetch(API_URL)
   
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur de réseau");
        }
        return response.json(); // Récupérer les données au format JSON
      })
      .then((data) => {
        setMessage(data.message); // Mettre à jour l'état avec le message du backend
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des données :", error);
      });
  }, [API_URL]);

  return (
    <div className="app">
      <MyRoutes />
      <div> {message} </div>
    </div>
  );
}

export default App;



// import { useEffect, useState } from "react";
// import "./App.css";
// import MyRoutes from "./MyRoutes/MyRoutes";

// function App() {
//   const [message, setMessage] = useState("");
//   const API_URL = "http://localhost:8000";
//   // const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"; // URL de l'API

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(API_URL); // Appel au backend

//         if (!response.ok) {
//           throw new Error("Erreur de réseau");
//         }

//         const data = await response.json(); // Convertir la réponse en JSON
//         setMessage(data.message); // Mettre à jour le message depuis l'API
//       } catch (error) {
//         console.error("Erreur lors de la récupération des données :", error);
//         setMessage("Impossible de récupérer le message du backend.");
//       }
//     };

//     fetchData(); // Appeler la fonction pour récupérer les données
//   }, [API_URL]); // Dépendance pour exécuter l'effet à chaque modification de l'URL

//   return (
//     <div className="app">
//       <MyRoutes />
//       <div className="backend-message">
//         {message ? message : "Chargement..."} {/* Affichage dynamique */}
//       </div>
//     </div>
//   );
// }

// export default App;
