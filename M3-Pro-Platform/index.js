const path = require('path');

// 1. CONFIGURATION DU MOTEUR DE RENDU (Si tu utilises EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 2. PRIORITÉ : Servir les fichiers du dossier public
app.use(express.static(path.join(__dirname, 'public')));

// 3. FORCE L'AFFICHAGE DE TON INDEX.HTML SUR LA PAGE D'ACCUEIL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});