// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductList.css'; // Assurez-vous d'importer le fichier CSS

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        volume_int_m3: '',
        modele: '',
        largeur: '',
        profondeur: '',
        prix: '',
        epaisseur: '',
        hauteur_interieur: '',
        hauteur_exterieur: '',
        type: '',
    });
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20; // Nombre de produits à afficher par page

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:5010/api/products');
        setProducts(response.data);
    };

    const addProduct = async () => {
        await axios.post('http://localhost:5010/api/products', newProduct);
        fetchProducts();
        setNewProduct({
            volume_int_m3: '',
            modele: '',
            largeur: '',
            profondeur: '',
            prix: '',
            epaisseur: '',
            hauteur_interieur: '',
            hauteur_exterieur: '',
            type: '',
        });
    };

    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:5010/api/products/${id}`);
        fetchProducts();
    };

    // Calculer les indices des produits à afficher
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Changer de page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Nombre total de pages
    const totalPages = Math.ceil(products.length / productsPerPage);

    return (
        <div className="product-list">
            <h2>Gestion des Produits</h2>
            <form className="product-form" onSubmit={(e) => { e.preventDefault(); addProduct(); }}>
                {/* Formulaire pour ajouter un produit */}
                <input type="number" placeholder="Volume (m³)" value={newProduct.volume_int_m3} onChange={e => setNewProduct({ ...newProduct, volume_int_m3: e.target.value })} required />
                <input type="text" placeholder="Modèle" value={newProduct.modele} onChange={e => setNewProduct({ ...newProduct, modele: e.target.value })} required />
                <input type="number" placeholder="Largeur (mm)" value={newProduct.largeur} onChange={e => setNewProduct({ ...newProduct, largeur: e.target.value })} required />
                <input type="number" placeholder="Profondeur (mm)" value={newProduct.profondeur} onChange={e => setNewProduct({ ...newProduct, profondeur: e.target.value })} required />
                <input type="number" placeholder="Prix (€)" value={newProduct.prix} onChange={e => setNewProduct({ ...newProduct, prix: e.target.value })} required />
                <input type="number" placeholder="Épaisseur (mm)" value={newProduct.epaisseur} onChange={e => setNewProduct({ ...newProduct, epaisseur: e.target.value })} required />
                <input type="number" placeholder="Hauteur Intérieure (mm)" value={newProduct.hauteur_interieur} onChange={e => setNewProduct({ ...newProduct, hauteur_interieur: e.target.value })} required />
                <input type="number" placeholder="Hauteur Extérieure (mm)" value={newProduct.hauteur_exterieur} onChange={e => setNewProduct({ ...newProduct, hauteur_exterieur: e.target.value })} required />
                <input type="text" placeholder="Type" value={newProduct.type} onChange={e => setNewProduct({ ...newProduct, type: e.target.value })} required />
                <button type="submit">Ajouter Produit</button>
            </form>
            <ul className="product-list-items">
                {currentProducts.map(product => (
                    <li key={product._id} className="product-item">
                        <span className="product-model">{product.modele}</span>
                        <span className="product-price">{product.prix} €</span>
                        <span className="product-id">ID: {product._id}</span>
                        <button className="delete-button" onClick={() => deleteProduct(product._id)}>Supprimer</button>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => paginate(index + 1)} className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
