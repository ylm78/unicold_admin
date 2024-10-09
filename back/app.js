// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes'); // Routes des produits
const userRoutes = require('./routes/userRoutes'); // Routes des utilisateurs

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/products', productRoutes); // Utilisation des routes produits
app.use('/api/users', userRoutes); // Utilisation des routes utilisateurs

// Gestion des erreurs 404
app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

// Démarrer le serveur
const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
