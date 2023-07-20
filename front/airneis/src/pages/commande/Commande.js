import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col, Container, Form, Modal } from "react-bootstrap";
import OrderSteps from "./OrderSteps";
import { Link } from "react-router-dom";
import axios from "axios"; // Importez axios pour effectuer des appels API

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [addressOption, setAddressOption] = useState("");
  const [savedDeliveryAddresses, setSavedDeliveryAddresses] = useState([]);
  const [savedFacturationAddresses, setSavedFacturationAddresses] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [userId, setUserId] = useState(null);

  const [newAddressLivraison, setNewAddressLivraison] = useState({
    rue: "",
   // complement_adresse: "",
    region: "",
    ville: "",
    code_postal: "",
    pays: "",
   
  });



  const getTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      item.quantity -= 1;
      updateCart([...cartItems]);
    }
  };

  const increaseQuantity = (item) => {
    item.quantity += 1;
    updateCart([...cartItems]);
  };

  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    updateCart(updatedCartItems);
  };

  const updateCart = (updatedCartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
    
    const storedCurrentStep = localStorage.getItem("currentStep");
    if (storedCurrentStep) {
      setCurrentStep(Number(storedCurrentStep));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("currentStep", currentStep);
  }, [cartItems, currentStep]);

  const handleProceedToDelivery = () => {
    setCurrentStep(2);
  };

  const handleProceedToDeliveryFacturation = () => {
    setCurrentStep(3);
  };

  const handleProceedToPayment = () => {
    setCurrentStep(4);
  };

  const handleAddressOptionChange = (e) => {
    setAddressOption(e.target.value);
  };

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem("token");
    const isLogged = !!token;
    setIsLogged(isLogged);
  
    // Si l'utilisateur est connecté, récupérer les adresses de livraison et de facturation
    if (isLogged) {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
  
      const fetchSavedAddresses = async () => {
        try {
          const deliveryResponse = await axios.get("http://127.0.0.1:8000/api/adresses_livraisonUser", config);
          const deliveryData = deliveryResponse.data;
          setSavedDeliveryAddresses(deliveryData.adressesLivraison);
  
          const facturationResponse = await axios.get("http://127.0.0.1:8000/api/adresses_facturationUser", config);
          const facturationData = facturationResponse.data;
          setSavedFacturationAddresses(facturationData.adressesFacturation);
        } catch (error) {
          console.log("Error fetching saved addresses:", error);
        }
      };
  
      fetchSavedAddresses();
    }
  }, [isLogged]);
  
  /*
  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem("token");
    const isLogged = !!token;
    setIsLogged(isLogged);

    // Si l'utilisateur est connecté, récupérer les adresses de livraison et de facturation
    if (isLogged) {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const fetchSavedAddresses = async () => {
        try {
          const deliveryResponse = await axios.get("http://127.0.0.1:8000/api/adresses_livraison", config);
          const deliveryData = deliveryResponse.data;
          setSavedDeliveryAddresses(deliveryData);

          const facturationResponse = await axios.get("http://127.0.0.1:8000/api/adresses_facturationUser", config);
          const facturationData = facturationResponse.data;
          setSavedFacturationAddresses(facturationData.adressesFacturation);
        } catch (error) {
          console.log("Error fetching saved addresses:", error);
        }
      };

      fetchSavedAddresses();
    }
  }, [isLogged]);

*/

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePaymentSubmit = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

 /* const handleAddNewAddress = async () => {
    // Create an API call to add the new address to the backend
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      await axios.post("http://127.0.0.1:8000/api/adresses_livraison", newAddressLivraison, config);
      console.log("Error adding new address:", newAddressLivraison);


    } catch (error) {
      // Handle errors if needed
      console.log("Error adding new address:", error);
    }
  };
  */

  const handleAddNewAddress = () => {
    // Créez un objet JSON pour envoyer les données au backend
    const data = {
      rue: newAddressLivraison.rue,
    // complement_adresse: newAddressLivraison.complement_adresse,
      region: newAddressLivraison.region,
      ville: newAddressLivraison.ville,
      code_postal: newAddressLivraison.code_postal,
      pays: newAddressLivraison.pays,
      id_utilisateur: localStorage.getItem('id_utilisateur'), // Récupérer l'id de l'utilisateur connecté depuis le token en local
    };
  
    // Faites une requête POST à l'API pour ajouter l'adresse
    axios.post("http://127.0.0.1:8000/api/adresses_livraison", data)
      .then((response) => {
        console.log("Adresse ajoutée avec succès :", response.data);
        // Vous pouvez ajouter ici une logique pour mettre à jour la liste des adresses de livraison si nécessaire
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de l'adresse :", error);
      });
  };
  
  
  
  


  return (
    <div className="container">
      <h5>Panier</h5>
      <OrderSteps currentStep={currentStep} />

      {currentStep === 1 && (
        <Row>
          <Col lg={8}>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <Card key={item.id} className="mb-3">
                    <Card.Body>
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>Price: {item.price.toFixed(2)}</Card.Text>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          Quantity: {item.quantity} <br/>
                          <Button variant="outline-primary" size="sm" onClick={() => decreaseQuantity(item)}>
                            -
                          </Button>{" "}
                          <Button variant="outline-primary" size="sm" onClick={() => increaseQuantity(item)}>
                            +
                          </Button>
                        </div>
                        <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item)}>
                          Remove
                        </Button>
                        
                      </div>
                      <Card.Text>Total: {(item.quantity * item.price).toFixed(2)}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </>
            )}
          </Col>
          <Col lg={4}>
            <Card>
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <Card.Text>Total: {getTotal().toFixed(2)}</Card.Text>
              </Card.Body>
            </Card>
            <Button variant="outline-primary" onClick={handleProceedToDelivery}>
              Proceed to Delivery
            </Button>
          </Col>
        </Row>
      )}

      {currentStep === 2 && (
        <Row>
          <Col lg={20}>
            <br />
            <Container>
              <Row className="justify-content-center align-items-center">
                <Col xs={10} md={10}>
                  <Form>
                    <Form.Group>
                      <Form.Label>Select Address Livraison Option:</Form.Label>
                      <Form.Check
                        type="radio"
                        name="addressOption"
                        id="newAddressOption"
                        label="Add New Address"
                        value="newAddress"
                        checked={addressOption === "newAddress"}
                        onChange={handleAddressOptionChange}
                      />
                      <Form.Check
                        type="radio"
                        name="addressOption"
                        id="savedAddressOption"
                        label="Use Saved Address"
                        value="savedAddress"
                        checked={addressOption === "savedAddress"}
                        onChange={handleAddressOptionChange}
                      />
                    </Form.Group>

                    {addressOption === "newAddress" && (
                    <>
                      <Form.Group controlId="rue">
                        <Form.Label>Rue</Form.Label>
                        <Form.Control
                          type="text"
                          value={newAddressLivraison.rue}
                          onChange={(e) => setNewAddressLivraison({ ...newAddressLivraison, rue: e.target.value })}
                        />
                      </Form.Group>
                      <br />
                      
                  
                      <Form.Group controlId="region">
                        <Form.Label>Region</Form.Label>
                        <Form.Control
                          type="text"
                          value={newAddressLivraison.region}
                          onChange={(e) => setNewAddressLivraison({ ...newAddressLivraison, region: e.target.value })}
                        />
                      </Form.Group>
                      <br />
                      <Form.Group controlId="ville">
                        <Form.Label>Ville</Form.Label>
                        <Form.Control
                          type="text"
                          value={newAddressLivraison.ville}
                          onChange={(e) => setNewAddressLivraison({ ...newAddressLivraison, ville: e.target.value })}
                        />
                      </Form.Group>
                      <br />
                      <Form.Group controlId="code_postal">
                        <Form.Label>Code postal</Form.Label>
                        <Form.Control
                          type="text"
                          value={newAddressLivraison.code_postal}
                          onChange={(e) => setNewAddressLivraison({ ...newAddressLivraison, code_postal: e.target.value })}
                        />
                      </Form.Group>
                      <br />
                      <Form.Group controlId="country">
                        <Form.Label>Pays</Form.Label>
                        <Form.Control
                        type="text"
                        value={newAddressLivraison.pays}
                        onChange={(e) => setNewAddressLivraison({ ...newAddressLivraison, pays: e.target.value })}
                        >
                          
                        </Form.Control>
                      </Form.Group>
                      <br />
                     
                    <br />
                      <Button variant="outline-primary" onClick={handleAddNewAddress}>
                        Add New Address
                      </Button>
                      <br />
                    </>
                  )}


                    {addressOption === "savedAddress" && (
                      <Form.Group controlId="savedAddress">
                        <Form.Label>List of Saved Addresses</Form.Label>
                        {savedDeliveryAddresses.map((address) => (
                          <Form.Check
                            key={address.id_adresse_livraison}
                            type="radio"
                            name="savedDeliveryAddress"
                            id={`savedDeliveryAddress-${address.id_adresse_livraison}`}
                            label={address.rue}
                            value={address.id_adresse_livraison}
                          />
                        ))}
                      </Form.Group>
                    )}

                    <br />
                    <Button variant="outline-primary" onClick={handleProceedToDeliveryFacturation}>
                      Proceed to Facturation
                    </Button>
                    <Button variant="outline-secondary" onClick={handleBack}>
                     Retour
                   </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      )}

      {currentStep === 3 && (
        <Row>
          <Col lg={20}>
            <br />
            <Container>
              <Row className="justify-content-center align-items-center">
                <Col xs={10} md={10}>
                  <Form>
                    <Form.Group>
                      <Form.Label>Select Address Facturation Option:</Form.Label>
                      <Form.Check
                        type="radio"
                        name="addressOption"
                        id="newAddressOption"
                        label="Add New Address"
                        value="newAddress"
                        checked={addressOption === "newAddress"}
                        onChange={handleAddressOptionChange}
                      />
                      <Form.Check
                        type="radio"
                        name="addressOption"
                        id="savedAddressOption"
                        label="Use Saved Address"
                        value="savedAddress"
                        checked={addressOption === "savedAddress"}
                        onChange={handleAddressOptionChange}
                      />
                    </Form.Group>

                    {addressOption === "newAddress" && (
                      <>
                        <Form.Group controlId="rue">
                          <Form.Label>Rue</Form.Label>
                          <Form.Control type="text" />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="complement_adresse">
                          <Form.Label>Complement d'adresse</Form.Label>
                          <Form.Control type="text" />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="region">
                          <Form.Label>Region</Form.Label>
                          <Form.Control type="text" />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="ville">
                          <Form.Label>Ville</Form.Label>
                          <Form.Control type="text" />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="code_postal">
                          <Form.Label>Code postal</Form.Label>
                          <Form.Control type="text" />
                        </Form.Group>
                        <br />
                        <Form.Group controlId="country">
                          <Form.Label>Pays</Form.Label>
                          <Form.Select>
                            <option value="France">France</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Switzerland">Switzerland</option>
                          </Form.Select>
                        </Form.Group>
                      </>
                    )}

                    {addressOption === "savedAddress" && (
                      <Form.Group controlId="savedAddress">                    
                        <Form.Label>List of Saved Addresses</Form.Label>
                        {savedFacturationAddresses.map((address) => (
                          <Form.Check
                            key={address.id_adresse_facturation}
                            type="radio"
                            name="savedFacturationAddress"
                            id={`savedFacturationAddress-${address.id_adresse_facturation}`}
                            label={address.rue}
                            value={address.id_adresse_facturation}
                          />
                        ))}
                      </Form.Group>
                    )}

                    <br />
                    <Button variant="outline-primary" onClick={handleProceedToPayment}>
                      Proceed to Payment
                    </Button>
                    <Button variant="outline-secondary" onClick={handleBack}>
                     Retour
                   </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      )}

      {currentStep === 4 && (
        <Row>
          <Col lg={8}>
          
          <Container className="d-flex justify-content-center align-items-center">
      <div className="p-4 border rounded" style={{ width: "50%", border: "1px solid #ccc" }}>
        <h6 className="mb-2 d-flex justify-content-center align-items-center">
          Payment Details
        </h6>
        <Modal show={isModalOpen} onHide={handleModalClose} centered backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Your payment has been successful.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Thank you for your purchase!
              <br />
              Your order has been successfully recorded under the number XXXXXXX.
              You can track its status from your customer account.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-primary" onClick={handleModalClose} as={Link} to="/products">
              Continue Shopping
            </Button>
            <Button variant="outline-primary" onClick={handleModalClose} as={Link} to="/orders">
              View My Orders
            </Button>
          </Modal.Footer>
        </Modal>

        <Row className="d-flex justify-content-center align-items-center">
          <Col xs={12} md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control as="select" value={paymentMethod} onChange={handlePaymentMethodChange}>
                <option value="card">Credit or Debit Card</option>
                <option value="paypal">PayPal</option>
              </Form.Control>
            </Form.Group>

            {paymentMethod === "card" && (
              <div className="mt-2">
                <div className="mt-2">
                  <p className="mb-1">Card Details</p>
                  <Form.Group className="mb-3">
                    <Form.Label>Cardholder Name</Form.Label>
                    <Form.Control type="text" required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control type="text" required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Expiration Date</Form.Label>
                    <Form.Control type="text" required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>CVV</Form.Label>
                    <Form.Control type="text" required />
                  </Form.Group>
                  <div className="mt-2">
                    <Button variant="outline-primary" onClick={handlePaymentSubmit}>
                      Pay
                    </Button>
                    <Button variant="outline-secondary" onClick={handleBack}>
                     Retour
                   </Button>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="mt-2">
                <div className="mt-2">
                  <Button variant="outline-primary" as={Link} to="https://www.paypal.com/fr/signin">
                    Pay
                  </Button>
                  <Button variant="outline-secondary" onClick={handleBack}>
                     Retour
                   </Button>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </Container>

          </Col>
        </Row>
      )}
    </div>
  );
}

export default Cart;
