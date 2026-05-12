const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const mongoURI = process.env.MONGO_URI || "TON_LIEN_MONGODB_ATLAS";
mongoose.connect(mongoURI).then(() => console.log("✅ DB Connectée"));

// MODÈLES
const Startup = mongoose.model('Startup', new mongoose.Schema({
    name: String, sector: String, createdAt: { type: Date, default: Date.now }
}));

const User = mongoose.model('User', new mongoose.Schema({
    username: String, 
    balance: { type: Number, default: 2500 },
    role: { type: String, default: 'player' } // 'admin' ou 'player'
}));

// ROUTES STARTUPS
app.get('/api/startups', async (req, res) => res.json(await Startup.find().sort({createdAt: -1})));
app.post('/api/add-startup', async (req, res) => {
    const s = new Startup(req.body); await s.save(); res.json(s);
});

// ROUTES ADMIN (Liste des comptes)
app.get('/api/admin/users', async (req, res) => res.json(await User.find().sort({createdAt: -1})));

// ROUTES AUTH & PARIS
app.post('/api/register', async (req, res) => {
    const u = new User({ username: req.body.username });
    await u.save(); res.json(u);
});

app.post('/api/place-bet', async (req, res) => {
    const { userId, amount } = req.body;
    const user = await User.findById(userId);
    if (user.balance >= amount) {
        user.balance -= amount;
        await user.save();
        res.json({ success: true, newBalance: user.balance });
    } else {
        res.status(400).json({ error: "Solde insuffisant" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 M3 Pro Live` ));