import React from 'react'
import { useEffect, useState } from 'react';
import { apiGet } from '../utils/api';
import { useParams } from 'react-router-dom';

export default function PersonPurchases() {
    const { identificationNumber } = useParams();
    const [personInvoicePurchases, setPersonInvoicePurchases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPersonPurchases = async () => {
            try {
                const response = await apiGet(`/api/identification/${identificationNumber}/purchases`);
                setPersonInvoicePurchases(response);
                setLoading(false);
            } catch (error) {
                console.log(error.message);
            }
        }

        if (identificationNumber) {
            fetchPersonPurchases();
        }

    }, [identificationNumber]);


    return (
        <div className=''>
            <div className='d-flex justify-content-between align-items-center my-3'>
                <h2>Seznam přijatych faktur</h2>
                <p className='m-0'>Počet faktur: {personInvoicePurchases.length}</p>
            </div>

            {loading ? (
                <div className="text-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Načítám...</span>
                    </div>
                </div>
            ) :

                <table className='table table-striped table-bordered table-hover'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Číslo faktury</th>
                            <th>Cena</th>
                            <th>DPH</th>
                            <th>Výstavil</th>
                            <th>Převzal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personInvoicePurchases.map((invoice, index) => (
                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{invoice.invoiceNumber}</td>
                                <td>{invoice.price}</td>
                                <td>{invoice.vat}</td>
                                <td>{invoice.seller.name}</td>
                                <td>{invoice.buyer.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            }

        </div>
    )
}
