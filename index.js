const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const mongoURI = process.env.MONGO_URI || "TON_LIEN_MONGODB_ATLAS";
mongoose.connect(mongoURI).then(() => console.log("✅ MongoDB Connecté"));

// --- MODÈLES ---
const Startup = mongoose.model('Startup', new mongoose.Schema({
    name: String, age: Number, sector: String, description: String
}));

// Nouveau modèle Utilisateur
const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    balance: { type: Number, default: 2500 }, // Solde de départ par défaut
    createdAt: { type: Date, default: Date.now }
}));

// --- ROUTES STARTUPS ---
app.get('/api/startups', async (req, res) => res.json(await Startup.find().sort({createdAt: -1})));
app.post('/api/add-startup', async (req, res) => {
    await new Startup(req.body).save();
    res.status(201).json({ message: "OK" });
});
app.delete('/api/delete-startup/:id', async (req, res) => {
    await Startup.findByIdAndDelete(req.params.id);
    res.json({ message: "Supprimé" });
});

// --- ROUTES UTILISATEURS ---
app.post('/api/register', async (req, res) => {
    try {
        const newUser = new User({ username: req.body.username });
        await newUser.save();
        res.status(201).json(newUser); // Renvoie l'utilisateur créé
    } catch (err) {
        res.status(400).json({ error: "Erreur inscription" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur actif sur port ${PORT}`));