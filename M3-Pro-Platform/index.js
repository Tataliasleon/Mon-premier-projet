const Entreprise = mongoose.model('Entreprise', {
    nom: String,
    secteur: String,
    chiffre: Number,
    cote: { type: Number, default: 1.5 }
});