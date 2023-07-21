import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const ParametresPage = () => {
  const [user, setUser] = useState(null);
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


  const handleEditAddress = (addressId) => {
    // Implement logic to handle editing the address with the given ID
    // You may need to display a form or a modal to edit the address details
  };

  // Function to handle adding a new address
  const handleAddAddress = () => {
    // Implement logic to handle adding a new address
    // You may need to display a form or a modal to enter the new address details
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
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Rue</th>
            <th>Complément d'adresse</th>
            <th>Code postal</th>
            <th>Ville</th>
            <th>Région</th>
            <th>Pays</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {livraisonAddresses.map((adresse) => (
            <tr key={adresse.id_adresse_livraison}>
              <td>{adresse.rue}</td>
              <td>{adresse.complement_adresse}</td>
              <td>{adresse.code_postal}</td>
              <td>{adresse.ville}</td>
              <td>{adresse.region}</td>
              <td>{adresse.pays}</td>
              <td>
                <Button variant="primary" onClick={() => handleEditAddress(adresse.id_adresse_livraison)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="success" onClick={handleAddAddress}>
        Add Address
      </Button>

      <br />
      <hr />

      <h4>Adresses de Facturation</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Rue</th>
            <th>Complément d'adresse</th>
            <th>Code postal</th>
            <th>Ville</th>
            <th>Région</th>
            <th>Pays</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {facturationAddresses.map((adresse) => (
            <tr key={adresse.id_adresse_facturation}>
              <td>{adresse.rue}</td>
              <td>{adresse.complement_adresse}</td>
              <td>{adresse.code_postal}</td>
              <td>{adresse.ville}</td>
              <td>{adresse.region}</td>
              <td>{adresse.pays}</td>
              <td>
                <Button variant="primary" onClick={() => handleEditAddress(adresse.id_adresse_facturation)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="success" onClick={handleAddAddress}>
        Add Address
      </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ParametresPage;
