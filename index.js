const express = require('express');
const mongoose = require('mongoose');
const app = express();

// --- CETTE LIGNE EST CRUCIALE ---
// Elle permet de montrer ton fichier index.html qui est dans le dossier 'public'
app.use(express.static('public')); 
app.use(express.json());

// CONNEXION MONGODB
// REMPLACE BIEN LE LIEN CI-DESSOUS PAR TON VRAI LIEN MONGODB ATLAS
const mongoURI = process.env.MONGO_URI || "TON_LIEN_MONGODB_ATLAS_ICI";

mongoose.connect(mongoURI)
    .then(() => console.log("✅ Serveur lié à la DB"))
    .catch(err => console.error("❌ Erreur de connexion DB:", err));

// SCHÉMAS
const Startup = mongoose.model('Startup', new mongoose.Schema({
    name: String, sector: String
}));

const User = mongoose.model('User', new mongoose.Schema({
    username: String, balance: { type: Number, default: 2500 }
}));

// --- ROUTES ---

// Inscription
app.post('/api/register', async (req, res) => {
    try {
        const user = new User({ username: req.body.username });
        await user.save(); res.json(user);
    } catch (e) { res.status(500).send(e); }
});

// Liste des utilisateurs (Admin)
app.get('/api/users', async (req, res) => res.json(await User.find()));

// Startups
app.get('/api/startups', async (req, res) => res.json(await Startup.find()));
app.post('/api/add-startup', async (req, res) => {
    const s = new Startup(req.body); await s.save(); res.json(s);
});

// Parier
app.post('/api/place-bet', async (req, res) => {
    const { userId, amount } = req.body;
    const user = await User.findById(userId);
    if (user && user.balance >= amount) {
        user.balance -= amount;
        await user.save();
        res.json({ success: true, newBalance: user.balance });
    } else {
        res.status(400).json({ error: "Solde insuffisant" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 M3 Pro prêt sur le port ${PORT}`));