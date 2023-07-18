import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from "../../components/backoffice/Table";
import Template from '../../components/layouts/backoffice/Template';

function Categories() {

    const columns = ['id_categorie', 'nom_categorie'];
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PUBLIC_BACKEND_URL}/categories`).then(res => {
            setCategories(res.data);
        });
    }, []);

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

                <Table data={categories} columns={columns} path="/backoffice/category" paramKey="id_categorie" />
            </div>
        </Template>
    )
}

export default Categories;