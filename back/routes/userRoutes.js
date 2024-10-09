const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Assure-toi que le chemin est correct

// Récupérer tous les utilisateurs
router.get('/', userController.getAllUsers);

// Ajouter un nouvel utilisateur
router.post('/', userController.createUser);

// Supprimer un utilisateur
router.delete('/:id', userController.deleteUser);

module.exports = router;
