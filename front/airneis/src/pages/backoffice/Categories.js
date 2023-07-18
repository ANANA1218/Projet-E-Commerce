import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Table from "../../components/backoffice/Table";
import Template from '../../components/layouts/backoffice/Template';

function Categories() {

    const columns = ['id_categorie', 'nom_categorie'];
    const [categories, setCategories] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const messageRef = useRef(null);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PUBLIC_BACKEND_URL}/categories`).then(res => {
            setCategories(res.data);
        });
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
            setSuccessMessage('');
            setErrorMessage('');

            axios
                .delete(`${process.env.REACT_APP_PUBLIC_BACKEND_URL}/categories/${id}`)
                .then(() => {
                    setCategories((prevCategories) => prevCategories.filter((category) => category.id_categorie !== id));
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
        <Template title={"Catégories"}>
            <div className="MainDiv mb-4">
                <div className="row">
                    <div className="text-center mb-4">
                        <a href="/backoffice/category/add" className="btn btn-info btn-icon-split" style={{ width: '260px' }}>
                            <span className="text">Ajouter une nouvelle catégorie</span>
                        </a>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-2">
                        {successMessage && <div className="alert alert-success" ref={messageRef}>{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger" ref={messageRef}>{errorMessage}</div>}
                    </div>
                </div>
                <div style={{ margin: '0px 450px' }}>
                    <Table data={categories} columns={columns} path={"/backoffice/category"} paramKey={"id_categorie"} onDelete={handleDelete} />
                </div>
            </div>
        </Template>
    )
}

export default Categories;