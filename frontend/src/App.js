import { useEffect, useState } from "react";
import "./App.css";
import MyRoutes from "./MyRoutes/MyRoutes";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
     fetch("http://localhost:5000/")
   
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
  }, []);

  return (
    <div className="app">
      <MyRoutes />
      <div> {message} </div>
    </div>
  );
}

export default App;
