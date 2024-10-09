const User = require('../models/User'); // Assure-toi que le chemin est correct

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Ajouter un nouvel utilisateur
exports.createUser = async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        console.log(`Deleting user with ID: ${req.params.id}`); // Pour le débogage
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

        await user.remove();
        res.json({ message: 'Utilisateur supprimé' });
    } catch (error) {
        console.error(error); // Pour le débogage
        res.status(500).json({ message: error.message });
    }
};
