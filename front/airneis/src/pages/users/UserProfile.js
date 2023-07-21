import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ParametresPage = () => {
  const [user, setUser] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [livraisonAddresses, setLivraisonAddresses] = useState([]);
  const [facturationAddresses, setFacturationAddresses] = useState([]);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/utilisateur/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('An error occurred while fetching user information:', error);
      }
    };

    const fetchAddresses = async () => {
      try {
        const [livraisonResponse, facturationResponse] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/adresses_livraisonUser', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
          axios.get('http://127.0.0.1:8000/api/adresses_facturationUser', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }),
        ]);

        setLivraisonAddresses(livraisonResponse.data.adressesLivraison);
        setFacturationAddresses(facturationResponse.data.adressesFacturation);
      } catch (error) {
        console.error('An error occurred while fetching addresses:', error);
      }
    };

    fetchUserData();
    fetchAddresses();
  }, []);

  const handlePasswordChange = () => {
    // Implement password change logic and API call here
    // You may need to add form inputs for old password and new password
  };

  

  return (
    <Container>
      <Row>
        <Col>
          <h1>Paramètres du compte</h1>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" value={user?.nom} disabled />
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
              <Form.Label>Prénom</Form.Label>
              <Form.Control type="text" value={user?.prenom} disabled />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={user?.email} disabled />
            </Form.Group>

            <hr />

            <h4>Mot de passe</h4>
            <Form.Group controlId="formBasicOldPassword">
              <Form.Label>Ancien mot de passe</Form.Label>
              <Form.Control type="password" />
            </Form.Group>

            <Form.Group controlId="formBasicNewPassword">
              <Form.Label>Nouveau mot de passe</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <br />
            <Button variant="primary" onClick={handlePasswordChange}>
              Modifier le mot de passe
            </Button>

            <br />
            <hr />

            <h4>Adresses de livraison</h4>
      {livraisonAddresses.map((adresse) => (
        <div key={adresse.id_adresse_livraison}>
          <p>{adresse.rue}</p>
          <p>{adresse.complement_adresse}</p>
          <p>{adresse.code_postal} {adresse.ville}</p>
          <p>{adresse.region}</p>
          <p>{adresse.pays}</p>
        </div>
      ))}

      <h4>Adresses de Facturation</h4>
      {facturationAddresses.map((adresse) => (
        <div key={adresse.id_adresse_facturation}>
          <p>{adresse.rue}</p>
          <p>{adresse.complement_adresse}</p>
          <p>{adresse.code_postal} {adresse.ville}</p>
          <p>{adresse.region}</p>
          <p>{adresse.pays}</p>
        </div>
      ))}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ParametresPage;
