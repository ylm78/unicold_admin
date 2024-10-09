// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    volume_int_m3: { type: Number, required: true },
    modele: { type: Number, required: true },
    largeur: { type: Number, required: true },
    profondeur: { type: Number, required: true },
    prix: { type: Number, required: true },
    epaisseur: { type: Number, required: true },
    hauteur_interieur: { type: Number, required: true },
    hauteur_exterieur: { type: Number, required: true },
    type: { type: String, required: true },
});

module.exports = mongoose.model('Product', ProductSchema);
