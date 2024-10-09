// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nom de l'utilisateur
    email: { type: String, required: true, unique: true }, // Email de l'utilisateur
    password: { type: String, required: true }, // Mot de passe
    createdAt: { type: Date, default: Date.now }, // Date de création
});

module.exports = mongoose.model('User', UserSchema);
