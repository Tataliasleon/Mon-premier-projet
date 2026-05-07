const dbURI = process.env.MONGO_URI; 
const port = process.env.PORT || 10000; // Render utilise souvent le port 10000

mongoose.connect(dbURI)
  .then(() => {
    console.log("Connecté à MongoDB avec succès !");
    app.listen(port, () => {
      console.log(`Serveur prêt sur le port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Erreur fatale de connexion :", err.message);
  });