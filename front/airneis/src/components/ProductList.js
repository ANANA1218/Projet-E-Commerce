import React from 'react';

function ProductList(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <ul>
        {props.products.map((product, index) => (
          <li key={index}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price} €</p>
            <button onClick={() => props.onAddToCart(product)}>Ajouter au panier</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
