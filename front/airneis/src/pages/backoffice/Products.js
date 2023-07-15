import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from "../../components/backoffice/Table";
import Template from '../../components/layouts/backoffice/Template';

function Products() {
    const [products, setProducts] = useState([]);
    const columns = ['id_produit', 'nom_produit', 'nom_categorie', 'description', 'prix', 'stock', 'date_ajout'];

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_PUBLIC_BACKEND_URL}/produits`).then(res => {
            setProducts(res.data);
        });
    }, []);

    return (
        <Template title={"Produits"}>
            <div className="MainDiv">
                <div className="row">
                    <div className="text-center mb-4">
                        <a href="/backoffice/product/add" className="btn btn-info btn-icon-split" style={{ width: '260px' }}>
                            <span className="text">Ajouter un nouveau produit</span>
                        </a>
                    </div>
                </div>
                <Table data={products} columns={columns} path="/backoffice/product" paramKey="id_produit" />
            </div>
        </Template>
    )
}

export default Products;