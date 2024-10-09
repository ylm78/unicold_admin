// src/components/OrderHistory.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderHistory.css'; // Assurez-vous d'importer le fichier CSS

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const response = await axios.get('http://localhost:5010/api/orders');
        setOrders(response.data);
    };

    return (
        <div className="order-history">
            <h2>Historique des Commandes</h2>
            <ul className="order-list">
                {orders.map(order => (
                    <li key={order._id} className="order-item">
                        <span className="order-id">Commande ID: {order._id}</span>
                        <span className="order-user">Utilisateur: {order.userName}</span>
                        <span className="order-date">Date: {new Date(order.date).toLocaleDateString()}</span>
                        <span className="order-total">Total: {order.total} €</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderHistory;
