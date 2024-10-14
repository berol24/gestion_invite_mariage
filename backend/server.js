const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const Invite = require('./models/Invite');

// Initialiser l'application Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Route de la page d'accueil
app.get('/', (req, res) => {
    res.json({ message: "Bienvenue sur la page d'accueil!" });
});



// image upload

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  },
});

var upload = multer({
  storage: storage,
}).single("image"); //image ici c'est le name du input image


// Route pour enregistrer un nouvel invité
app.post('/addInvites',upload, async (req, res) => {
  try {
    const { nomPrenom, telephone, table, status, image } = req.body;

    // Créer un nouvel invité avec les données du formulaire
    const newInvite = new Invite({
      nomPrenom,
      telephone,
      table,
      status,
      image, // L'image sera un chemin ou une URL, à traiter lors du chargement du fichier
    });

    // Enregistrer l'invité dans la base de données
    await newInvite.save();

    res.status(201).json({ message: 'Invité enregistré avec succès!' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement de l\'invité', error });
  }
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
