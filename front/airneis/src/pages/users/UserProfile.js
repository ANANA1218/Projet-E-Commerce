import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ParametresPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Faites une requête HTTP GET pour récupérer les informations de l'utilisateur connecté
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/utilisateur/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Récupérez le token du local storage après le login
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des informations de l\'utilisateur :', error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) {
    return <div>Chargement...</div>;
  }


  
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

export default ParametresPage;
