const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 10000;

// 1. CONFIGURATION DES FICHIERS STATIQUES (Ton dossier public)
// Doit être placé AVANT les routes pour que l'index.html soit prioritaire
app.use(express.static('public'));

// 2. CONNEXION BDD ET LANCEMENT SERVEUR
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
  .then(() => {
    console.log("✅ Connexion MongoDB OK");
    app.listen(port, () => {
      console.log(`🚀 Serveur lancé sur le port ${port}`);
    });
  })
  .catch((err) => {
    console.log("❌ Erreur de connexion :", err);
  });