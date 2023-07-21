import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CommandesList = () => {
  const [commands, setCommands] = useState([]);
  const [activeCommand, setActiveCommand] = useState(null);
  const [commandsDetails, setCommandsDetails] = useState([]);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        const [commandsResponse, commandsDetailsResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/commandes', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
          axios.get('http://127.0.0.1:8000/api/commande-details', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
        ]);

        setCommands(commandsResponse.data);
        setCommandsDetails(commandsDetailsResponse.data);
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
          <div className="card-header" onClick={() => setActiveCommand(commande.id_commande)}>
            <h5 className="mb-0">
              ID Commande: {commande.id_commande}
            </h5>
          </div>
          {activeCommand === commande.id_commande && (
            <div className="card-body">
              <p>Date: {commande.date_commande}</p>
              <p>Prix Total: {commande.prix_total}</p>
              {/* Additional details */}
              {commandsDetails.map((commandeDetail) => {
                if (commandeDetail.id_commande === commande.id_commande) {
                  return (
                    <div key={commandeDetail.id_produit}>
                      <p>Produit: {commandeDetail.nom_produit}</p>
                      <p>Description: {commandeDetail.description}</p>
                      <p>Prix du produit: {commandeDetail.prix}</p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommandesList;
