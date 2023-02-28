import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const products = [
  { id: 1, name: 'Produit 1', description: 'Description du produit 1', price: 10, imageUrl: 'https://picsum.photos/200' },
  { id: 2, name: 'Produit 2', description: 'Description du produit 2', price: 20, imageUrl: 'https://picsum.photos/200' },
  { id: 3, name: 'Produit 3', description: 'Description du produit 3', price: 30, imageUrl: 'https://picsum.photos/200' },
];

function ProductList() {
  return (

    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
      {products.map((product) => (
          <Col xs={12} md={6} lg={4} key={product.id}>
            <div className="card mb-4">
              <img src={product.imageUrl} alt={product.name} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">{product.price} €</p>
              
              </div>
            </div>
          </Col>
        ))}
      </Card.Text>
      <button className="btn btn-primary">Ajouter au panier</button>
    </Card.Body>
  </Card>

  );
}

export default ProductList;
