const express = require('express');
const mongoose = require('mongoose'); // CETTE LIGNE EST CELLE QUI MANQUE !
const app = express();

const dbURI = process.env.MONGO_URI;
const port = process.env.PORT || 10000;

// Bloc de connexion
mongoose.connect(dbURI)
 .then(() => {
    console.log("✅ Connexion MongoDB OK");
    
    // Dis à Express d'utiliser ton dossier public
    app.use(express.static('public'));

    // Lance le serveur
    app.listen(port, () => {
      console.log(`🚀 Serveur actif sur le port ${port}`);
    });
  })