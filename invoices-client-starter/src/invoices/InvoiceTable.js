// InvoiceTable.jsx
import React from "react";
import { Link } from "react-router-dom";

const InvoiceTable = ({ items, deleteInvoice, currentOrdering, setOrdering }) => {
    const renderHeader = (label, key) => {
        const isActive = currentOrdering === key || currentOrdering === `-${key}`;
        const isDescending = currentOrdering === `-${key}`;
        const arrow = isActive ? (isDescending ? "↓" : "↑") : "↓";

        const toggleOrdering = () => {
            if (!isActive || isDescending) {
                setOrdering(key); // Switch to ascending
            } else {
                setOrdering(`-${key}`); // Switch to descending
            }
        };

        return (
            <div className="d-flex flex-column align-items-center flex-lg-row justify-content-lg-between">
                <span>{label}</span>
                <button onClick={toggleOrdering}
                className="btn btn-sm btn-outline-secondary px-2 py-0 ms-2"
                style={{ fontSize: "0.75rem" }} title={`Řadit podle ${label} ${isDescending ? 'vzestupně' : 'sestupně'}`}>
                    {arrow}
                </button>
            </div>
        );
    };


    return (
        <div>

            <div className="overflow-auto">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th className="id">{renderHeader("Id", "id")}</th>
                            <th className="invoice-number">{renderHeader("Číslo faktury", "invoice_number")}</th>
                            <th className="issued">{renderHeader("Datum vystavení", "issued")}</th>
                            <th className="due-date">{renderHeader("Datum splatnosti", "due_date")}</th>
                            <th className="price">{renderHeader("Cena", "price")}</th>
                            <th className="vat">{renderHeader("DPH", "vat")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td className="id">{item.Id}</td>
                                    <td className="invoice-number">{item.invoiceNumber}</td>
                                    <td className="issued">{item.issued}</td>
                                    <td className="due-date">{item.dueDate}</td>
                                    <td className="price">{item.price}</td>
                                    <td className="vat">{item.vat}</td>
                                </tr>
                                <tr>
                                    <th>Akce</th>
                                    <td colSpan={6} className="text-left">
                                        <div className="d-flex justify-content-around">
                                            <Link to={`/invoices/show/${item.Id}`} className="btn btn-sm btn-info">
                                                Zobrazit
                                            </Link>
                                            <Link to={`/invoices/edit/${item.Id}`} className="btn btn-sm btn-warning">
                                                Upravit
                                            </Link>
                                            <button onClick={() => deleteInvoice(item.Id)} className="btn btn-sm btn-danger">Odstranit</button>
                                        </div>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link to="/invoices/create" className="btn btn-success mb-3">
                Nová faktura
            </Link>
        </div>
    );
};

export default InvoiceTable;
