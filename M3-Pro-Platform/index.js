app.get('/', async (req, res) => {
    try {
        // Récupère toutes les entreprises classées par date (la plus récente d'abord)
        const entreprises = await Entreprise.find().sort({ dateCreation: -1 });
        res.render('index', { entreprises: entreprises });
    } catch (err) {
        res.status(500).send("Erreur lors de la lecture des données.");
    }
});