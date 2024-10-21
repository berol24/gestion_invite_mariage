const express = require("express")
const dotenv = require('dotenv')
const app = express()
const cors = require('cors')




app.use(cors({
    // origin: "*",
    origin: "https://gestion-invite-mariage.vercel.app",
    // methods: ['POST' ,"GET"],
    // credentials : true
}));

const mongoose =  require('mongoose')

// connexion à la base de données
dotenv.config({ path: './.env' });

const PORT = process.env.PORT || 4000
const MONGODB_URL = process.env.MONGO_URL

mongoose.connect(MONGODB_URL , {
  useNewUrlParser: true,  // Options pour éviter les avertissements
  useUnifiedTopology: true
})
.then(() => {
    console.log("connection avec mongoDB effectué avec succès");
  })
  .catch((error) => {
    console.log(`erreur lors de la connection à la base de données${error}`);
  });



const post_route = require('./routes/postRoute')

app.use("/api" ,post_route)

app.listen(PORT , function () {
    console.log(`Server is running au port ${PORT}`);
})


