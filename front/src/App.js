// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import ProductList from './components/ProductList';
import UserList from './components/UserList';
import './App.css'; // Assurez-vous d'importer le fichier CSS

function App() {
    return (
        <Router>
            <div className="admin-panel">
                <h1>Bienvenue dans le panel admin</h1>
                <h2>Ici, les admins peuvent :</h2>
                <div className="admin-buttons">
                    <Link to="/products">
                        <button>Gestion des Produits</button>
                    </Link>
                    <Link to="/users">
                        <button>Gestion des Utilisateurs</button>
                    </Link>
                </div>
                <Routes>
                    <Route path="/" element={
                        <div>
                            <h2>Veuillez sélectionner une section.</h2>
                        </div>
                    } />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/users" element={<UserList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
