import React, { useState } from "react";

function Cart({ cartItems, removeFromCart }) {
  const getTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total;
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>{item.name}</p>
              <p>Price: {item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total: {item.quantity * item.price}</p>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </div>
          ))}
          <p>Total: {getTotal()}</p>
          {/* Bouton pour passer à l'étape suivante */}
          <button>Proceed to Delivery</button>
        </>
      )}
    </div>
  );
}
export default Cart;

