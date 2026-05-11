const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// CONNEXION MONGODB
// Remplace "TON_LIEN_MONGODB_ATLAS" par ton vrai lien si tu n'utilises pas de variable d'environnement
const mongoURI = process.env.MONGO_URI || "TON_LIEN_MONGODB_ATLAS";
mongoose.connect(mongoURI)
    .then(() => console.log("✅ Connecté à MongoDB Atlas"))
    .catch(err => console.error("❌ Erreur de connexion:", err));

// MODÈLE DE DONNÉES (STARTUP)
const StartupSchema = new mongoose.Schema({
    name: String,
    age: Number,
    sector: String,
    description: String,
    createdAt: { type: Date, default: Date.now }
});
const Startup = mongoose.model('Startup', StartupSchema);

// --- ROUTES API ---

// 1. Récupérer toutes les entreprises
app.get('/api/startups', async (req, res) => {
    try {
        const startups = await Startup.find().sort({ createdAt: -1 });
        res.json(startups);
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la récupération" });
    }
});

// 2. Ajouter une entreprise
app.post('/api/add-startup', async (req, res) => {
    try {
        const newStartup = new Startup(req.body);
        await newStartup.save();
        res.status(201).json({ message: "Startup ajoutée !" });
    } catch (err) {
        res.status(400).json({ error: "Données invalides" });
    }
});

// 3. Supprimer une entreprise par ID
app.delete('/api/delete-startup/:id', async (req, res) => {
    try {
        await Startup.findByIdAndDelete(req.params.id);
        res.json({ message: "Supprimée avec succès" });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la suppression" });
    }
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 M3 Pro Server running on port ${PORT}`));