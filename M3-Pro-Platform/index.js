// Afficher la page du pari
app.get('/parier/:id', async (req, res) => {
    const entreprise = await Entreprise.findById(req.params.id);
    res.render('parier', { entreprise: entreprise });
});

// Traiter le pari (Logique simplifiée pour l'instant)
app.post('/parier/:id', async (req, res) => {
    const entreprise = await Entreprise.findById(req.params.id);
    const mise = req.body.montant;
    const gainPotentiel = (mise * entreprise.cote).toFixed(2);
    
    res.send(`
        <div style="font-family:sans-serif; text-align:center; padding-top:50px; color:white; background:#0f172a; height:100vh;">
            <h2 style="color:#10b981;">Pari enregistré !</h2>
            <p>Tu as misé ${mise}$ sur ${entreprise.nom}.</p>
            <h1 style="font-size:48px;">Gain potentiel : ${gainPotentiel}$</h1>
            <a href="/" style="color:#38bdf8;">Retour à l'Index</a>
        </div>
    `);
});