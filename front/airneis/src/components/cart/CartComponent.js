import React from 'react';
import CartLink from './CartLink';

function CartComponent() {
  function handleCartLinkClick() {
    // Ouvrir le panier de l'utilisateur
  }

  const itemsCount = 3; // Nombre d'articles dans le panier

  return (
    <div>
      <CartLink onClick={handleCartLinkClick} itemsCount={itemsCount} />
    </div>
  );
}

export default CartComponent;
