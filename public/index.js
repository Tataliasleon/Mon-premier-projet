const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000;

// On lie le dossier "public" pour le design
app.use(express.static(path.join(__dirname, 'public')));

// Connexion à ta base de données MongoDB
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
  .then(() => {
    console.log("✅ Connexion MongoDB OK");
    app.listen(port, () => console.log(`🚀 Serveur actif sur le port ${port}`));
  })
  .catch(err => console.log("❌ Erreur :", err));

// Route pour afficher ton site
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});