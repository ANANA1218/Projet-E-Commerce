import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailCommande = () => {
  const { id } = useParams();
  const [commande, setCommande] = useState(null);

  useEffect(() => {
    const fetchCommande = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/detail-commandes/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCommande(response.data);
      } catch (error) {
        console.error('An error occurred while fetching the command details:', error);
      }
    };

    fetchCommande();
  }, [id]);

  if (!commande) {
    return <div className="container mt-4">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Détails de la commande {commande.id_commande}</h2>
      <p>Date: {commande.date_commande}</p>
      <p>Prix Total: {commande.prix_total}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default DetailCommande;
