import React, { useState } from 'react';

function Product(props) {
  const [cart, setCart] = useState([]);

  function handleAddToCart(product) {
    setCart([...cart, product]);
  }

  return (
    <div>
      <h2>{props.name}</h2>
      <p>{props.description}</p>
      <button onClick={() => handleAddToCart(props)}>Ajouter au panier</button>
    </div>
  );
}

export default Product;
