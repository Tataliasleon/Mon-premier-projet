const express = require('express');
const mongoose = require('mongoose'); // CETTE LIGNE EST CELLE QUI MANQUE !
const app = express();

const dbURI = process.env.MONGO_URI;
const port = process.env.PORT || 10000;

// Bloc de connexion
mongoose.connect(dbURI)
  .then(() => {
    console.log("✅ Connexion MongoDB OK"); app.get('/', (req, res) => {
  res.send('Bienvenue sur mon API ! Le serveur est en ligne.');
});
    app.listen(port, () => {
      console.log(`🚀 Serveur actif sur le port ${port}`);
    });
  })
  .catch(err => {
    console.error("❌ Erreur de connexion :", err.message);
  });