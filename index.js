const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// 1. CONNEXION À LA BASE DE DONNÉES
// Remplace bien par ton lien MongoDB Atlas avec ton mot de passe
const dbURI = "TON_LIEN_MONGODB_ICI";

mongoose.connect(dbURI)
    .then(() => console.log('🔥 SYSTÈME M3 : Connecté à la base de données !'))
    .catch(err => console.log('❌ ERREUR CRITIQUE DATABASE :', err));

// 2. MODÈLE DE DONNÉES (L'ADN de tes entreprises)
const Entreprise = mongoose.model('Entreprise', {
    nom: String,
    secteur: String,
    chiffreAffaire: Number,
    cote: Number,
    statut: { type: String, default: "En attente" },
    dateCreation: { type: Date, default: Date.now }
});

// 3. CONFIGURATION DU SERVEUR
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// 4. ROUTES DE TEST
app.get('/', async (req, res) => {
    try {
        const entreprises = await Entreprise.find();
        res.send(`<h1>🚀 Plateforme M3 Pro Lancée</h1>
                  <p>Base de données : Connectée ✅</p>
                  <p>Entreprises en bourse : ${entreprises.length}</p>
                  <a href="/pro/register">Enregistrer une Entreprise</a>`);
    } catch (err) {
        res.send("Le serveur fonctionne, mais la base de données est vide ou inaccessible.");
    }
});

// Route d'affichage du formulaire (on la garde pour tester)
app.get('/pro/register', (req, res) => {
    res.render('enregistrement-pro');
});

app.listen(port, () => {
    console.log(`✅ M3 Pro Engine opérationnel sur le port ${port}`);
});