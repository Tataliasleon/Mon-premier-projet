const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000;

// On lie le dossier "public" pour ton design
app.use(express.static(path.join(__dirname, 'public')));

// Connexion MongoDB
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
  .then(() => {
    console.log("✅ MongoDB Connecté");
    app.listen(port, () => console.log(`🚀 Serveur actif sur le port ${port}`));
  })
  .catch(err => console.log("❌ Erreur :", err));

// Route pour afficher ton design
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});