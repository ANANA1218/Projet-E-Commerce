import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const ParametresPage = () => {
  const [user, setUser] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressDetails, setAddressDetails] = useState({
    rue: '',
    complement_adresse: '',
    region: '',
    ville: '',
    code_postal: '',
    pays: '',
    carnet_adresse: '',
  });

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

    fetchUserData();
  }, []);

  const handlePasswordChange = () => {
    // Implement password change logic and API call here
    // You may need to add form inputs for old password and new password
  };

  const handleAddressChange = async () => {
    try {
      if (!selectedAddress) {
        return; // No address selected, do nothing
      }

      // Implement address change logic and API call here
      const result = await axios.put(
        `http://127.0.0.1:8000/api/adresses_livraison/${selectedAddress.id_adresse_livraison}`,
        addressDetails,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (result.status === 200) {
        // Address updated successfully, update the user data to reflect changes
        const updatedUser = { ...user };
        const addressIndex = updatedUser.adresses_livraison.findIndex(
          (address) => address.id_adresse_livraison === selectedAddress.id_adresse_livraison
        );
        if (addressIndex !== -1) {
          updatedUser.adresses_livraison[addressIndex] = { ...selectedAddress, ...addressDetails };
          setUser(updatedUser);
          setSelectedAddress(null); // Clear the selected address
          setAddressDetails({
            rue: '',
            complement_adresse: '',
            region: '',
            ville: '',
            code_postal: '',
            pays: '',
            carnet_adresse: '',
          });
        }
      }
    } catch (error) {
      console.error('An error occurred while updating the address:', error);
    }
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
            {user?.adresses_livraison.map((address, index) => (
              <div key={index} onClick={() => setSelectedAddress(address)}>
                <p>{address.rue}</p>
                {/* Add other address details here */}
              </div>
            ))}

            {selectedAddress && (
              <>
                <Form.Group controlId="formBasicRue">
                  <Form.Label>Rue</Form.Label>
                  <Form.Control
                    type="text"
                    value={addressDetails.rue}
                    onChange={(e) => setAddressDetails({ ...addressDetails, rue: e.target.value })}
                  />
                </Form.Group>

                {/* Add other address detail inputs here */}

                <Button variant="primary" onClick={handleAddressChange}>
                  Enregistrer les modifications d'adresse
                </Button>
              </>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ParametresPage;
