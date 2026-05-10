const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000;

// On définit le chemin du dossier public de façon absolue
const publicPath = path.join(__dirname, 'public');

// On force Express à utiliser ce dossier
app.use(express.static(publicPath));

// Route principale qui ENVOIE de force le fichier
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'), (err) => {
        if (err) {
            res.status(404).send("Le serveur fonctionne, mais il ne trouve pas le fichier index.html dans le dossier public !");
        }
    });
});

const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI)
  .then(() => {
    console.log("✅ MongoDB Connecté");
    app.listen(port, () => console.log(`🚀 Serveur sur le port ${port}`));
  })
  .catch(err => console.log(err));