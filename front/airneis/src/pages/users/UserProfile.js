import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const ParametresPage = () => {
  const [user, setUser] = useState(null);
  const [livraisonAddresses, setLivraisonAddresses] = useState([]);
  const [facturationAddresses, setFacturationAddresses] = useState([]);
  const [showAddAddressFormFacturation, setShowAddAddressFormFacturation] = useState(false);
  const [newAddress, setNewAddress] = useState({
    rue: '',
    complement_adresse: '',
    code_postal: '',
    ville: '',
    region: '',
    pays: '',
    carnet_adresse: '', 
  });
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [newAddressFacturation, setNewAddressFacturation] = useState({
    rue: '',
    complement_adresse: '',
    code_postal: '',
    ville: '',
    region: '',
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


 
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevState) => ({ ...prevState, [name]: value }));
  };

 
  const handleAddAddress = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/adresses_livraison',
        newAddress,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

     
      setLivraisonAddresses((prevAddresses) => [...prevAddresses, response.data]);

      setNewAddress({
        rue: '',
        complement_adresse: '',
        code_postal: '',
        ville: '',
        region: '',
        pays: '',
        carnet_adresse: '',
      });

      
      alert('Adresse de livraison ajoutée avec succès');
    } catch (error) {
      console.error('An error occurred while adding the address:', error);
      
      alert('Une erreur s\'est produite lors de l\'ajout de l\'adresse.');
    }
  };


  const toggleAddAddressForm = () => {
    setShowAddAddressForm((prevState) => !prevState);
  };

  const handleAddressChangeFacturation = (e) => {
    const { name, value } = e.target;
    setNewAddressFacturation((prevState) => ({ ...prevState, [name]: value }));
  };

  const toggleAddAddressFormFacturation = () => {
    setShowAddAddressFormFacturation((prevState) => !prevState);
  };

   
    const handleAddAddressFacturation = async () => {
      try {
       
        const response = await axios.post(
          'http://127.0.0.1:8000/api/adresses_facturation',
          newAddressFacturation,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
  
       
        setLivraisonAddresses((prevAddresses) => [...prevAddresses, response.data]);
  
        
        setNewAddressFacturation({
          rue: '',
          complement_adresse: '',
          code_postal: '',
          ville: '',
          region: '',
          pays: '',
          carnet_adresse: '',
        });
  
      
        alert('Adresse de Facturation ajoutée avec succès');
      } catch (error) {
        console.error('An error occurred while adding the address:', error);
        
        alert('Une erreur s\'est produite lors de l\'ajout de l\'adresse.');
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
           {/* Display the "Add Address" form if showAddAddressForm is true */}
           {showAddAddressForm && (
                  <tr>
                    <td>
                      <Form.Control
                        type="text"
                        name="rue"
                        value={newAddress.rue}
                        onChange={handleAddressChange}
                        placeholder="Rue"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="complement_adresse"
                        value={newAddress.complement_adresse}
                        onChange={handleAddressChange}
                        placeholder="Complément d'adresse"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="code_postal"
                        value={newAddress.code_postal}
                        onChange={handleAddressChange}
                        placeholder="Code postal"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="ville"
                        value={newAddress.ville}
                        onChange={handleAddressChange}
                        placeholder="Ville"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="region"
                        value={newAddress.region}
                        onChange={handleAddressChange}
                        placeholder="Région"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="pays"
                        value={newAddress.pays}
                        onChange={handleAddressChange}
                        placeholder="Pays"
                      />
                    </td>
                    <td>
                      <Button variant="primary" onClick={handleAddAddress}>
                        Save
                      </Button>
                    </td>
                  </tr>
                )}
        </tbody>
      </Table>

      <Button variant="success" onClick={toggleAddAddressForm}>
              {showAddAddressForm ? 'Cancel' : 'Add Address'}
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
          {showAddAddressFormFacturation && (
                  <tr>
                    <td>
                      <Form.Control
                        type="text"
                        name="rue"
                        value={newAddressFacturation.rue}
                        onChange={handleAddressChangeFacturation}
                        placeholder="Rue"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="complement_adresse"
                        value={newAddressFacturation.complement_adresse}
                        onChange={handleAddressChangeFacturation}
                        placeholder="Complément d'adresse"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="code_postal"
                        value={newAddressFacturation.code_postal}
                        onChange={handleAddressChangeFacturation}
                        placeholder="Code postal"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="ville"
                        value={newAddressFacturation.ville}
                        onChange={handleAddressChangeFacturation}
                        placeholder="Ville"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="region"
                        value={newAddressFacturation.region}
                        onChange={handleAddressChangeFacturation}
                        placeholder="Région"
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        name="pays"
                        value={newAddressFacturation.pays}
                        onChange={handleAddressChangeFacturation}
                        placeholder="Pays"
                      />
                    </td>
                    <td>
                      <Button variant="primary" onClick={handleAddAddressFacturation}>
                        Save
                      </Button>
                    </td>
                  </tr>
                )}
        </tbody>
      </Table>

      <Button variant="success" onClick={toggleAddAddressFormFacturation}>
              {showAddAddressFormFacturation ? 'Cancel' : 'Add Address'}
      </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ParametresPage;
