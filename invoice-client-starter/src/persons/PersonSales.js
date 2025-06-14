import React from 'react'
import { useEffect, useState } from 'react';
import { apiGet } from '../utils/api';
import { useParams } from 'react-router-dom';

export default function PersonSales() {
	const { identificationNumber } = useParams();
	const [personInvoiceSales, setPersonInvoiceSales] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPersonSales = async () => {
			try {
				const response = await apiGet(`/api/identification/${identificationNumber}/sales`);
				setPersonInvoiceSales(response);
				setLoading(false);
			} catch (error) {
				console.log(error.message);
				setError(error.message);
			}
		}

		if (identificationNumber) {
			fetchPersonSales();
		}

	}, [identificationNumber]);


	return (
		<div className=''>
			<div className='d-flex justify-content-between align-items-center my-3'>
				<h1>Seznam výstavenych faktur</h1>
				<p className='m-0'>Počet faktur: {personInvoiceSales.length}</p>
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
						{personInvoiceSales.map((invoice, index) => (
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
