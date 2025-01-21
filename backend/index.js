// const express = require("express")
// const dotenv = require('dotenv')
// const app = express()
// const cors = require('cors')
// const mongoose =  require('mongoose')



// app.use(cors({}));



// // connexion à la base de données
// dotenv.config({ path: './.env' });

// const PORT = process.env.PORT || 8000

// const MONGODB_URL = process.env.MONGO_URL

// mongoose.connect(MONGODB_URL , {
//   useNewUrlParser: true,  // Options pour éviter les avertissements
//   useUnifiedTopology: true
// })
// .then(() => {
//     console.log("connection avec mongoDB effectué avec succès");
//   })
//   .catch((error) => {
//     console.log(`erreur lors de la connection à la base de données${error}`);
//   });



// const post_route = require('./routes/postRoute')

// app.use("/api" ,post_route)

// app.listen(PORT , function () {
//     console.log(`Server is running au port ${PORT}`);
// })






const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path'); // Pour gérer les chemins

const app = express();

// Charger les variables d'environnement
dotenv.config({ path: './.env' });

// Middleware CORS
app.use(cors({}));

// Connexion à la base de données MongoDB
const MONGODB_URL = process.env.MONGO_URL;

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,  // Options pour éviter les avertissements
  useUnifiedTopology: true
})
.then(() => {
    console.log("Connection avec MongoDB effectuée avec succès");
})
.catch((error) => {
    console.log(`Erreur lors de la connexion à la base de données : ${error}`);
});

// Middleware pour servir les images statiques
app.use('/api/postImages', express.static(path.join(__dirname, 'public/postImages')));

// Routes de l'application
const post_route = require('./routes/postRoute');
app.use("/api", post_route);

// Démarrage du serveur
const PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
    console.log(`Server is running au port ${PORT}`);
});
