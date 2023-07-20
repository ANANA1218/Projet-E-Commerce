import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CommandesList = () => {
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/commandes', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCommands(response.data);
      } catch (error) {
        console.error('An error occurred while fetching commands:', error);
      }
    };

    fetchCommands();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Liste des commandes</h2>
      {commands.map((commande) => (
        <div key={commande.id_commande} className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">ID Commande: {commande.id_commande}</h5>
            <p className="card-text">Date: {commande.date_commande}</p>
            <p className="card-text">Prix Total: {commande.prix_total}</p>
            <p className="card-text">Produit: {commande.nom_produit}</p>
            <p className="card-text">Description: {commande.description}</p>
            <p className="card-text">Prix du produit: {commande.prix}</p>
            <Link to={`/detail-commande/${commande.id_commande}`} className="btn btn-primary">
              Voir les détails
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommandesList;
