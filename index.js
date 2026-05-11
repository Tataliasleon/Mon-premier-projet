const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// CONNEXION MONGODB
const mongoURI = process.env.MONGO_URI || "TON_LIEN_MONGODB_ATLAS";
mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connecté"))
    .catch(err => console.error("❌ Erreur MongoDB:", err));

// --- MODÈLES ---
const Startup = mongoose.model('Startup', new mongoose.Schema({
    name: String, age: Number, sector: String, description: String, createdAt: { type: Date, default: Date.now }
}));

const User = mongoose.model('User', new mongoose.Schema({
    username: String, balance: { type: Number, default: 2500 }, createdAt: { type: Date, default: Date.now }
}));

// --- ROUTES API ---

// Startups : Récupérer, Ajouter, Supprimer
app.get('/api/startups', async (req, res) => res.json(await Startup.find().sort({createdAt: -1})));
app.post('/api/add-startup', async (req, res) => {
    const s = new Startup(req.body); await s.save(); res.status(201).json(s);
});
app.delete('/api/delete-startup/:id', async (req, res) => {
    await Startup.findByIdAndDelete(req.params.id); res.json({message: "OK"});
});

// Utilisateurs : Inscription
app.post('/api/register', async (req, res) => {
    try {
        const u = new User({ username: req.body.username });
        await u.save(); res.status(201).json(u);
    } catch (err) { res.status(400).json({error: "Erreur"}); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur M3 Pro sur port ${PORT}`));