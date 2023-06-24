import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const getTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };

  const decreaseQuantity = (item) => {
    // Vérifier si la quantité est supérieure à 1 avant de la diminuer
    if (item.quantity > 1) {
      item.quantity -= 1;
      updateCart([...cartItems]);
    }
  };

  const increaseQuantity = (item) => {
    // Augmenter simplement la quantité du produit
    item.quantity += 1;
    updateCart([...cartItems]);
  };

  const removeFromCart = (item) => {
    // Filtrer les produits du panier pour supprimer l'élément correspondant
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
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="container">
   

      <h2>Cart</h2>
      <div className="row">
        <div className="col-lg-8">
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
                        Quantity: {item.quantity}
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
        </div>
        <div className="col-lg-4">
          <Card>
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <Card.Text>Total: {getTotal().toFixed(2)}</Card.Text>
            </Card.Body>
          </Card> 
          <Button variant="outline-primary">Proceed to Delivery</Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
