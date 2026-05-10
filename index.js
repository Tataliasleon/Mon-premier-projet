const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000;

// 1. CONFIGURATION DES DOSSIERS
// Cette ligne dit à Express où trouver ton index.html
app.use(express.static(path.join(__dirname, 'public')));

// 2. CONNEXION BDD ET LANCEMENT
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
  .then(() => {
    console.log("✅ Connexion MongoDB OK");
    app.listen(port, () => {
      console.log(`🚀 Serveur actif sur le port ${port}`);
    });
  })
  .catch((err) => console.log("❌ Erreur :", err));

// 3. ROUTE DE SECOURS (Si le static ne suffit pas)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});