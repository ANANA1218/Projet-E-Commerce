import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Table from '../../components/backoffice/Table';
import Template from '../../components/layouts/backoffice/Template';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [checkedRows, setCheckedRows] = useState([]);
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

    const handleIndividualDelete = (id) => {
        axios
            .delete(`${process.env.REACT_APP_PUBLIC_BACKEND_URL}/produits/${id}`)
            .then(() => {
                setProducts((prevProducts) => prevProducts.filter((product) => product.id_produit !== id));
                setSuccessMessage('Produit supprimé avec succès !');
                scrollToAlert();
            })
            .catch((error) => {
                console.error('Erreur :', error);
                setErrorMessage('Erreur dans la suppression du produit');
                scrollToAlert();
            });
    };

    const handleMultipleDelete = () => {
        if (checkedRows.length === 0) {
            setErrorMessage('Aucun produit sélectionné pour la suppression');
            scrollToAlert();
            return;
        }

        const selectedProductIds = checkedRows;
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ces produits ?')) {

            axios
                .delete(`${process.env.REACT_APP_PUBLIC_BACKEND_URL}/produits/multiple/${selectedProductIds}`)
                .then(() => {
                    setProducts((prevProducts) => prevProducts.filter((product) => !checkedRows.includes(product.id_produit)));
                    setSuccessMessage('Produits supprimés avec succès !');
                    setCheckedRows([]);
                    scrollToAlert();
                })
                .catch((error) => {
                    setErrorMessage('Erreur dans la suppression des produits');
                    scrollToAlert();
                });
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            handleIndividualDelete(id);
        }
    };

    const handleCheckboxChange = (id, isChecked) => {
        if (isChecked) {
            setCheckedRows((prevRows) => [...prevRows, id]);
        } else {
            setCheckedRows((prevRows) => prevRows.filter((rowId) => rowId !== id));
        }
    };

    const scrollToAlert = () => {
        messageRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <Template title={'Produits'}>
            <div>
                <div className="MainDiv mb-4">
                    <div className="row">
                        <div className="text-center" style={{ marginTop: '20px', marginBottom: '50px' }}>
                            <a href="/backoffice/product/add" className="btn btn-info mr-4" style={{ width: '250px' }}>
                                <span className="text">Ajouter un nouveau produit</span>
                            </a>
                            <button
                                className="btn btn-danger"
                                style={{ width: '220px' }}
                                onClick={handleMultipleDelete}
                                disabled={checkedRows.length === 0}
                            >
                                <span className="text">Supprimer la sélection</span>
                            </button>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-3">
                            {successMessage && (
                                <div className="alert alert-success" ref={messageRef}>
                                    {successMessage}
                                </div>
                            )}
                            {errorMessage && (
                                <div className="alert alert-danger" ref={messageRef}>
                                    {errorMessage}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="m-4">
                        <Table
                            data={products}
                            columns={columns}
                            path="/backoffice/product"
                            paramKey="id_produit"
                            onDelete={handleDelete}
                            onBulkDelete={handleMultipleDelete}
                            checkedRows={checkedRows}
                            onCheckboxChange={handleCheckboxChange}
                        />
                    </div>
                </div>
            </div>
        </Template>
    );
};

export default Products;
