import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../utils/api";

const fieldLabels = {
	invoiceNumber: "Číslo faktury",
	issued: "Datum výstavení",
	dueDate: "Datum platnosti",
	product: "Produkt",
	price: "Cena",
	vat: "DPH",
	note: "Poznámka",
	"seller.name": "Výstavil",
	"buyer.name": "Převzal"
};

const getFieldValue = (key, invoice) => {
	if (key.includes(".")) {
		const [parent, child] = key.split(".");
		return invoice[parent]?.[child] || "-";
	}
	return invoice[key] ?? "-";
};

const InvoiceDetail = () => {
	const { Id } = useParams();
	const [invoice, setInvoice] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchInvoice = async () => {
			try {
				const response = await apiGet(`/api/invoices/${Id}`);
				setInvoice(response);
				setLoading(false);
			} catch (error) {
				console.error(error.message);
			}
		};

		fetchInvoice();
	}, [Id]);


	return (
		<div>
			<div className="d-flex justify-content-between align-items-center my-3">
				<h2>Detail faktury</h2>
			</div>

			{loading ? (
				<div className="text-center mt-5">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Načítám...</span>
					</div>
				</div>
			) :
				<table className="table table-bordered table-striped table-hover">
					<tbody>
						{Object.entries(fieldLabels).map(([key, label]) => (
							<tr key={key}>
								<th>{label}</th>
								<td>{getFieldValue(key, invoice)}</td>
							</tr>
						))}
					</tbody>
				</table>
			}

		</div>
	);
};

export default InvoiceDetail;
