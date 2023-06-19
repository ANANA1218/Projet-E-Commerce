import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function Product(props) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/produits");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {products.length === 0 ? (
        <div>No products found.</div>
      ) : (
        products.map((product) => (
          <div className="col" key={product.id_produit}>
            <div className="card shadow-sm">
              <Link to={`/products/${product.id_produit}`} href="!#" replace>
                <img
                  className="card-img-top bg-dark cover"
                  height="200"
                  alt=""
                  src={product.image}
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title text-center text-dark text-truncate">
                  {product.nom_produit}
                </h5>
                <p className="card-text text-center text-muted mb-0">{product.prix}Ks</p>
                <div className="d-grid d-block">
                  <button className="btn btn-outline-dark mt-3">
                    <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
                  </button>
                  <Link
                    to={`/products/${product.id_produit}`}
                    className="btn btn-outline-primary mt-2"
                  >
                    View More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default Product;
