const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.static('public')); 
app.use(express.json());

// CONNEXION MONGODB
const mongoURI = process.env.MONGO_URI || "TON_LIEN_MONGODB_ATLAS_ICI";

mongoose.connect(mongoURI)
    .then(() => console.log("✅ DB Connectée"))
    .catch(err => console.error("❌ Erreur DB:", err));

// SCHÉMAS
const Startup = mongoose.model('Startup', new mongoose.Schema({
    name: String, sector: String, description: String
}));

const User = mongoose.model('User', new mongoose.Schema({
    username: String, balance: { type: Number, default: 2500 }
}));

// ROUTES
app.post('/api/register', async (req, res) => {
    const user = new User({ username: req.body.username });
    await user.save(); res.json(user);
});

app.get('/api/users', async (req, res) => res.json(await User.find()));
app.get('/api/startups', async (req, res) => res.json(await Startup.find()));
app.post('/api/add-startup', async (req, res) => {
    const s = new Startup(req.body); await s.save(); res.json(s);
});

app.post('/api/place-bet', async (req, res) => {
    const { userId, amount } = req.body;
    const user = await User.findById(userId);
    if (user && user.balance >= amount) {
        user.balance -= amount;
        await user.save();
        res.json({ success: true, newBalance: user.balance });
    } else { res.status(400).json({ error: "Solde insuffisant" }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 M3 Pro sur port ${PORT}`));