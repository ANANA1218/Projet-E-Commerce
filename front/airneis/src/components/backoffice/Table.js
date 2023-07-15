import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'jquery/dist/jquery.min.js';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';

const Table = ({ columns, data, path, paramKey }) => {

    useEffect(() => {

        $(document).ready(function () {
            setTimeout(function () {
                $('#example').DataTable({
                    retrieve: true,
                    language: {
                        lengthMenu: 'Afficher _MENU_ éléments par page',
                        zeroRecords: 'Nothing found - sorry',
                        info: 'Affichage page _PAGE_ sur _PAGES_',
                        infoEmpty: 'Pas de données disponibles',
                        infoFiltered: '(filtré pour _MAX_ total éléments)',
                        search: 'Rechercher',
                        paginate: {
                            previous: 'Précédent',
                            next: 'Suivant'
                        }
                    },
                });
            }, 1000);
        });
    }, []);

    return (
        <div className="container">
            <table id="example" className="table table-hover table-bordered">
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th key={index}>{column}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((result, index) => (
                        <tr key={index}>
                            {columns.map((column, columnIndex) => (
                                <td key={columnIndex}>{result[column]}</td>
                            ))}
                            <td>
                                <Link to={`${path}/${result[paramKey]}`}>Modifier</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
