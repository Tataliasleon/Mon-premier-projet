const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Configuration pour servir le dossier 'public' et lire le JSON
app.use(express.static('public')); 
app.use(express.json());

// CONNEXION MONGODB (À remplacer par ton lien Atlas)
const mongoURI = process.env.MONGO_URI || "TON_LIEN_MONGODB_ATLAS_ICI";

mongoose.connect(mongoURI)
    .then(() => console.log("✅ Connexion MongoDB réussie"))
    .catch(err => console.error("❌ Erreur de connexion MongoDB:", err));

// SCHÉMAS DE DONNÉES
const Startup = mongoose.model('Startup', new mongoose.Schema({
    name: String, sector: String, createdAt: { type: Date, default: Date.now }
}));

const User = mongoose.model('User', new mongoose.Schema({
    username: String, 
    balance: { type: Number, default: 2500 },
    createdAt: { type: Date, default: Date.now }
}));

// ROUTES API
app.post('/api/register', async (req, res) => {
    try {
        const user = new User({ username: req.body.username });
        await user.save(); res.json(user);
    } catch (e) { res.status(500).json({ error: "Erreur inscription" }); }
});

app.get('/api/users', async (req, res) => res.json(await User.find().sort({createdAt: -1})));
app.get('/api/startups', async (req, res) => res.json(await Startup.find().sort({createdAt: -1})));

app.post('/api/add-startup', async (req, res) => {
    try {
        const s = new Startup(req.body); 
        await s.save(); res.json(s);
    } catch (e) { res.status(500).json({ error: "Erreur ajout startup" }); }
});

app.post('/api/place-bet', async (req, res) => {
    const { userId, amount } = req.body;
    const user = await User.findById(userId);
    if (user && user.balance >= amount) {
        user.balance -= amount;
        await user.save();
        res.json({ success: true, newBalance: user.balance });
    } else {
        res.status(400).json({ error: "Solde insuffisant ou compte introuvable" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 M3 Pro Opérationnel sur le port ${PORT}`));