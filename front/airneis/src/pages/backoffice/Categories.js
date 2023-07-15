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
            <Table data={categories} columns={columns} path="/backoffice/category" paramKey="id_categorie" />
        </Template>
    )
}

export default Categories;