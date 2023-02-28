import React from 'react';
import ProductList from './ProductList';
import SearchBar from './SearchBar';
import CategoryBar from './categorie/CategoryBar';
import CartLink from './cart/CartLink';
import UserLink from './user/UserLink';
import product from './Product';

function HomePage() {
  const products = [
    {
      id: 1,
      name: 'T-shirt blanc',
      price: 20.99,
      image: 'https://example.com/tshirt-blanc.jpg',
      category: 'Vêtements',
    },
    {
      id: 2,
      name: 'Chemise bleue',
      price: 45.99,
      image: 'https://example.com/chemise-bleue.jpg',
      category: 'Vêtements',
    },
    {
      id: 3,
      name: 'Ordinateur portable',
      price: 899.99,
      image: 'https://example.com/ordinateur-portable.jpg',
      category: 'Informatique',
    },
    {
      id: 4,
      name: 'Souris sans fil',
      price: 24.99,
      image: 'https://example.com/souris-sans-fil.jpg',
      category: 'Informatique',
    },
  ];

  function handleAddToCart(product) {
    // Ajouter le produit au panier de l'utilisateur
  }





  return (
    <div>
    
      <SearchBar />
      <CartLink />
      <UserLink />
      <CategoryBar />
      <ProductList products={products} onAddToCart={handleAddToCart} />
    </div>
  );
}

export default HomePage;
