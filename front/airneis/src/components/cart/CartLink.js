import React from 'react';

function CartLink(props) {
  return (
    <a href="#" onClick={props.onClick}>
      Mon panier ({props.itemsCount})
    </a>
  );
}

export default CartLink;
