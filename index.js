const express = require('express');
const bodyParser = require('body-parser'); // Pour le formulaire
const app = express();

// TRÈS IMPORTANT : Cette ligne permet à Render de choisir son port
const port = process.env.PORT || 3000; 

app.use(bodyParser.urlencoded({ extended: true }));

let m3Index = [
    { nom: "M3 Index", secteur: "Finance", score: 92 },
    { nom: "Studio CapeTown", secteur: "Media", score: 78 }
];

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: sans-serif; background: #0f172a; color: white; padding: 40px; display: flex; flex-direction: column; align-items: center; }
                .card { background: #1e293b; margin: 10px 0; padding: 20px; border-radius: 12px; width: 100%; max-width: 400px; border-left: 5px solid #38bdf8; }
            </style>
        </head>
        <body>
            <h1>🚀 M3 Index Live</h1>
            ${m3Index.map(e => `<div class="card"><strong>${e.nom}</strong> - ${e.score}%</div>`).join('')}
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log("Serveur en ligne sur le port " + port);
});