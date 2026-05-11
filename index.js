const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Middleware pour lire le JSON envoyé par le site
app.use(express.json());
app.use(express.static('public'));

// Connexion à MongoDB (Utilise ta variable d'environnement Render ou ton lien Atlas)
const mongoURI = process.env.MONGO_URI || "TON_LIEN_MONGODB_ATLAS_ICI";
mongoose.connect(mongoURI)
    .then(() => console.log("✅ Connecté à MongoDB Atlas"))
    .catch(err => console.error("❌ Erreur de connexion:", err));

// SCHÉMA POUR LES ENTREPRISES
const StartupSchema = new mongoose.Schema({
    name: String,
    age: Number,
    sector: String,
    description: String,
    createdAt: { type: Date, default: Date.now }
});
const Startup = mongoose.model('Startup', StartupSchema);

// ROUTE : Récupérer toutes les entreprises (pour l'annuaire)
app.get('/api/startups', async (req, res) => {
    try {
        const startups = await Startup.find().sort({ createdAt: -1 });
        res.json(startups);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération" });
    }
});

// ROUTE : Ajouter une nouvelle entreprise
app.post('/api/add-startup', async (req, res) => {
    try {
        const newStartup = new Startup(req.body);
        await newStartup.save();
        res.status(201).json({ message: "Startup ajoutée !" });
    } catch (err) {
        res.status(400).json({ error: "Erreur lors de l'ajout" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));