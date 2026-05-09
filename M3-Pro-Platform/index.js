const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 10000;

// 1. PRIORITÉ VISUELLE : On dit au serveur d'utiliser le dossier public
// C'est cette ligne qui va charger ton index.html design
app.use(express.static('public'));

// 2. CONNEXION À LA BASE DE DONNÉES
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
  .then(() => {
    console.log("✅ Connexion MongoDB OK");
    app.listen(port, () => {
      console.log(`🚀 Serveur actif sur le port ${port}`);
    });
  })
  .catch((err) => {
    console.log("❌ Erreur de connexion :", err);
  });