import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col, Container, Form, Modal } from "react-bootstrap";
import OrderSteps from "./OrderSteps";
import { Link } from "react-router-dom";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [addressOption, setAddressOption] = useState("");
  const [savedDeliveryAddresses, setSavedDeliveryAddresses] = useState([]);
  const [savedBillingAddresses, setSavedBillingAddresses] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [newAddress, setNewAddress] = useState({
    rue: "",
    complement_adresse: "",
    region: "",
    ville: "",
    code_postal: "",
    pays: "",
  });
  const [newBillingAddress, setNewBillingAddress] = useState({
    rue: "",
    complement_adresse: "",
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

  const handleProceedToConfirmation = () => {
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
          Authorization: `Bearer ${token}`,
        },
      };

      const fetchSavedAddresses = async () => {
        try {
          const deliveryResponse = await axios.get("http://127.0.0.1:8000/api/adresses_livraison", config);
          const deliveryData = deliveryResponse.data;
          setSavedDeliveryAddresses(deliveryData);

          const billingResponse = await axios.get("http://127.0.0.1:8000/api/adresses_facturation", config);
          const billingData = billingResponse.data;
          setSavedBillingAddresses(billingData);
        } catch (error) {
          console.log("Error fetching saved addresses:", error);
        }
      };

      fetchSavedAddresses();
    }
  }, [isLogged]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePaymentSubmit = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleAddNewAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post("http://127.0.0.1:8000/api/adresses_livraison", newAddress, config);
      console.log(response.data); // Message de succès du backend

      // Réinitialisez les champs du formulaire après l'ajout
      setNewAddress({
        rue: "",
        complement_adresse: "",
        region: "",
        ville: "",
        code_postal: "",
        pays: "",
      });

      // Mettre à jour la liste des adresses de livraison après l'ajout
      const deliveryResponse = await axios.get("http://127.0.0.1:8000/api/adresses_livraison", config);
      const deliveryData = deliveryResponse.data;
      setSavedDeliveryAddresses(deliveryData);
    } catch (error) {
      console.log("Error adding new delivery address:", error);
    }
  };

  const handleNewBillingAddressChange = (e) => {
    const { name, value } = e.target;
    setNewBillingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleAddNewBillingAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post("http://127.0.0.1:8000/api/adresses_facturation", newBillingAddress, config);
      console.log(response.data); // Message de succès du backend

      // Réinitialisez les champs du formulaire après l'ajout
      setNewBillingAddress({
        rue: "",
        complement_adresse: "",
        region: "",
        ville: "",
        code_postal: "",
        pays: "",
      });

      // Mettre à jour la liste des adresses de facturation après l'ajout
      const billingResponse = await axios.get("http://127.0.0.1:8000/api/adresses_facturation", config);
      const billingData = billingResponse.data;
      setSavedBillingAddresses(billingData);
    } catch (error) {
      console.log("Error adding new billing address:", error);
    }
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
                            name="rue"
                            placeholder="Rue"
                            value={newAddress.rue}
                            onChange={handleNewAddressChange}
                          />
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
                        <br />
                        <Button variant="outline-primary" onClick={handleAddNewAddress}>
                          Add Address
                        </Button>
                      </>
                    )}

                    {addressOption === "savedAddress" && (
                      <Form.Group controlId="savedAddress">
                        <Form.Label>List of Saved Addresses</Form.Label>
                        {savedDeliveryAddresses.map((address) => (
                          <Form.Check
                            key={address.id_adresse_facturation}
                            type="radio"
                            name="savedDeliveryAddress"
                            id={`savedDeliveryAddress-${address.id_adresse_facturation}`}
                            label={address.rue}
                            value={address.id_adresse_facturation}
                          />
                        ))}
                      </Form.Group>
                    )}

                    <br />
                    <Button variant="outline-primary" onClick={handleProceedToDeliveryFacturation}>
                      Delivery
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
                        id="newBillingAddressOption"
                        label="Add New Address"
                        value="newBillingAddress"
                        checked={addressOption === "newBillingAddress"}
                        onChange={handleAddressOptionChange}
                      />
                      <Form.Check
                        type="radio"
                        name="addressOption"
                        id="savedBillingAddressOption"
                        label="Use Saved Address"
                        value="savedBillingAddress"
                        checked={addressOption === "savedBillingAddress"}
                        onChange={handleAddressOptionChange}
                      />
                    </Form.Group>

                    {addressOption === "newBillingAddress" && (
                      <>
                        <Form.Group controlId="rue">
                          <Form.Label>Rue</Form.Label>
                          <Form.Control
                            type="text"
                            name="rue"
                            placeholder="Rue"
                            value={newBillingAddress.rue}
                            onChange={handleNewBillingAddressChange}
                          />
                        </Form.Group>
                    

                        <br />
                        <Button variant="outline-primary" onClick={handleAddNewBillingAddress}>
                          Add Address
                        </Button>
                      </>
                    )}

                    {addressOption === "savedBillingAddress" && (
                      <Form.Group controlId="savedBillingAddress">
                        <Form.Label>List of Saved Addresses</Form.Label>
                        {savedBillingAddresses.map((address) => (
                          <Form.Check
                            key={address.id_adresse_facturation}
                            type="radio"
                            name="savedBillingAddress"
                            id={`savedBillingAddress-${address.id_adresse_facturation}`}
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
                    <Modal.Title>Votre paiement a été effectué avec succès.</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <p>
                      Merci de votre achat !
                      <br />
                      Votre commande a bien été enregistrée sous le numéro XXXXXXX.
                      Vous pouvez suivre son état depuis votre espace client.
                    </p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="outline-primary" onClick={handleModalClose} as={Link} to="/products">
                      Continuer les achats
                    </Button>
                    <Button variant="outline-primary" onClick={handleModalClose} as={Link} to="/commandes">
                      Voir mes commandes
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
                      Payer
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="mt-2">
                <div className="mt-2">
                  <Button variant="outline-primary" as={Link} to="https://www.paypal.com/fr/signin">
                    Payer
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

      <br />
    </div>
  );
}

export default Cart;
