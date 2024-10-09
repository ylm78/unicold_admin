// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserList.css'; // Assurez-vous d'importer le fichier CSS

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
    const [editingUser, setEditingUser] = useState(null); // État pour l'utilisateur en cours d'édition

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5010/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const addUser = async (e) => {
        e.preventDefault();
        try {
            if (editingUser) {
                await axios.put(`http://localhost:5010/api/users/${editingUser._id}`, newUser);
                setEditingUser(null); // Réinitialiser après la mise à jour
            } else {
                await axios.post('http://localhost:5010/api/users', newUser);
            }
            setNewUser({ name: '', email: '', password: '' });
            fetchUsers(); // Rafraîchir la liste des utilisateurs
        } catch (error) {
            console.error("Error adding or updating user:", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5010/api/users/${id}`);
            fetchUsers(); // Rafraîchir la liste des utilisateurs après suppression
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const startEditing = (user) => {
        setNewUser({ name: user.name, email: user.email, password: '' }); // Remplir le formulaire d'édition
        setEditingUser(user); // Définir l'utilisateur à éditer
    };

    return (
        <div className="user-list">
            <h2>Gestion des Utilisateurs</h2>
            <form className="user-form" onSubmit={addUser}>
                <div>
                    <label htmlFor="name">Nom:</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Nom"
                        value={newUser.name}
                        onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Mot de passe"
                        value={newUser.password}
                        onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                        required
                    />
                </div>
                <button type="submit">{editingUser ? "Modifier Utilisateur" : "Ajouter Utilisateur"}</button>
            </form>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="edit-button" onClick={() => startEditing(user)}>Modifier</button>
                                <button className="delete-button" onClick={() => deleteUser(user._id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
