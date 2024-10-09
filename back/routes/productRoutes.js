// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Définition des routes
router.get('/', productController.getAllProducts);      // Récupérer tous les produits
router.post('/', productController.addProduct);          // Ajouter un produit
router.delete('/:id', productController.deleteProduct);  // Supprimer un produit par ID

// Exportation du routeur
module.exports = router;
