const dbURI = process.env.MONGO_URI;
const port = process.env.PORT || 10000;

mongoose.connect(dbURI)
  .then(() => {
    console.log("✅ Connexion réussie à MongoDB Atlas !");
    app.listen(port, () => {
      console.log(`🚀 Serveur M3 Pro actif sur le port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ ERREUR DE CONNEXION :", err.message);
    process.exit(1); // Force l'arrêt propre pour que Render affiche l'erreur
  });