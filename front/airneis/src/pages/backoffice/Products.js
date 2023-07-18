import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Table from '../../components/backoffice/Table';
import Template from '../../components/layouts/backoffice/Template';

const Products = () => {
    const [products, setProducts] = useState([]);
    const columns = ['id_produit', 'nom_produit', 'nom_categorie', 'description', 'prix', 'stock', 'date_ajout'];
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const messageRef = useRef(null);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_PUBLIC_BACKEND_URL}/produits`)
            .then((res) => {
                setProducts(res.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            setSuccessMessage('');
            setErrorMessage('');

            axios
                .delete(`${process.env.REACT_APP_PUBLIC_BACKEND_URL}/produits/${id}`)
                .then(() => {
                    setProducts((prevProducts) => prevProducts.filter((product) => product.id_produit !== id));
                    setSuccessMessage('Supprimé avec succès !');
                    scrollToAlert();
                })
                .catch((error) => {
                    console.error('Erreur :', error);
                    setErrorMessage('Erreur dans la suppression');
                    scrollToAlert();
                });
        }
    };

    const scrollToAlert = () => {
        messageRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Template title={"Produits"}>
            <div>
                <div className="MainDiv mb-4">
                    <div className="row">
                        <div className="text-center mb-4">
                            <a href="/backoffice/product/add" className="btn btn-info btn-icon-split" style={{ width: '260px' }}>
                                <span className="text">Ajouter un nouveau produit</span>
                            </a>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-2">
                            {successMessage && <div className="alert alert-success" ref={messageRef}>{successMessage}</div>}
                            {errorMessage && <div className="alert alert-danger" ref={messageRef}>{errorMessage}</div>}
                        </div>
                    </div>
                    <div>
                        <Table data={products} columns={columns} path="/backoffice/product" paramKey="id_produit" onDelete={handleDelete} />
                    </div>
                </div>
            </div>
        </Template >
    );
};

export default Products;
