const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000;

// PRIORITÉ N°1 : Servir le dossier public
app.use(express.static(path.join(__dirname, 'public')));

// PRIORITÉ N°2 : Forcer l'envoi du fichier HTML sur la racine
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// CONNEXION BDD
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
  .then(() => {
    console.log("✅ Connexion MongoDB OK");
    app.listen(port, () => console.log(`🚀 Serveur sur port ${port}`));
  })
  .catch(err => console.log(err));