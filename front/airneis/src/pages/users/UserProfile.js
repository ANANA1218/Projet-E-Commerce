import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const AccountSettings = () => {
  const [user, setUser] = useState({
    id_utilisateur: null,
    nom: '',
    prenom: '',
    email: '',
    id_adresse_facturation: null,
    id_adresse_livraison: null,
    adresses_facturation: [],
    adresses_livraison: [],
  });

  useEffect(() => {
    // Fetch user data from API upon component mount
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Replace 'YOUR_API_URL' with the actual endpoint for user data retrieval
      const response = await axios.get('http://127.0.0.1:8000/api/utilisateur/login');
      setUser(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handlePasswordChange = () => {
    // Implement password change logic and API call here
    // You may need to add form inputs for old password and new password
  };

  const handleAddressChange = () => {
    // Implement address change logic and API call here
    // You may need to add form inputs for address details
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Paramètres du compte</h1>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Nom</Form.Label>
              <Form.Control type="text" value={user.nom} disabled />
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
              <Form.Label>Prénom</Form.Label>
              <Form.Control type="text" value={user.prenom} disabled />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={user.email} disabled />
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
            <br/>
            <Button variant="primary" onClick={handlePasswordChange}>
              Modifier le mot de passe
            </Button>

           <br/>
            <hr />

            <h4>Adresses de livraison</h4>
            {/* Display list of user's delivery addresses */}
            {user.adresses_livraison.map((address, index) => (
              <div key={index}>
                <p>{address.rue}</p>
                {/* Add other address details here */}
              </div>
            ))}

            {/* Form to add new delivery address */}
            {/* Implement the form inputs and logic for adding new address */}

            <Button variant="primary" onClick={handleAddressChange}>
              Enregistrer les modifications d'adresse
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountSettings;
