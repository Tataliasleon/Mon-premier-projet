const Entreprise = mongoose.model('Entreprise', {
    nom: String,
    secteur: String,
    chiffre: Number,
    cote: { type: Number, default: 1.5 }
});const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
  .then(() => {
    console.log("Connecté à MongoDB !");
    app.listen(port, () => {
      console.log(`Serveur lancé sur le port ${port}`);
    });
  })
  .catch((err) => console.log("Erreur de connexion :", err));