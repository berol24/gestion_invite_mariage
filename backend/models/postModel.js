const mongoose = require('mongoose');

// Définir le schéma pour l'invité
const inviteSchema = new mongoose.Schema({
  nomPrenom: {
    type: String,
    required: true,
  },
  telephone: {
    type: Number,
    required: true,
  },
  table: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL ou chemin de l'image
    required: true, // Optionnel, car l'image pourrait ne pas être obligatoire
  }
});

// Modèle basé sur le schéma
 
module.exports = mongoose.model('Post', inviteSchema)
