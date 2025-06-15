import React, { useEffect, useState } from "react";
import { apiDelete, apiGet } from "../utils/api";
import InvoiceTable from "./InvoiceTable";
import InvoiceSearch from "./InvoiceSearch";
import InvoiceLimit from "./InvoiceLimit";
import InvoiceFilter from "./InvoiceFilter";

const InvoiceIndex = () => {
    const [invoices, setInvoices] = useState([]);
    const [ordering, setOrdering] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [limit, setLimit] = useState("");
    const [filter, setFilter] = useState({});
    const [filteredInvoices, setFilteredInvoices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const params = new URLSearchParams();
                if (ordering) params.append("ordering", ordering);
                if (searchTerm) params.append("search", searchTerm);
                if (limit) params.append("limit", limit);

                const res = await apiGet(`/api/invoices?${params.toString()}`);
                setInvoices(res.results || res);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching invoices:", error);
            }
        };

        fetchInvoices();
    }, [ordering, searchTerm, limit]);

    const handleDelete = async (id) => {
        try {
            await apiDelete(`/api/invoices/${id}`);
            setInvoices((prev) => prev.filter((item) => item.Id !== id));
        } catch (error) {
            console.error(error.message);
            alert("Chyba při mazání faktury.");
        }
    };

    const handleChange = (field, selectedOption) => {
        setFilter((prev) => ({
            ...prev,
            [field]: selectedOption ? selectedOption.value : null,
        }));
    };

    const clearFilters = () => {
        setFilter({});
        setFilteredInvoices([]);
    };

    const applyFilters = async () => {
        const query = new URLSearchParams();

        for (const [key, value] of Object.entries(filter)) {
            if (value !== null && value !== undefined && value !== "") {
                query.append(key, value);
            }
        }

        try {
            const response = await apiGet(`/api/invoices?${query.toString()}`);
            setFilteredInvoices(response.results || response);
        } catch (error) {
            console.error("Error fetching filtered invoices:", error);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mt-3">
                <h2>Seznam faktur</h2>
                <p className="m-0">Počet faktur: {invoices.length}</p>
            </div>

            <div className="d-flex flex-column align-items-end flex-lg-row w-100 justify-content-between align-items-lg-center gap-2 gap-lg-5 mb-3">
                <InvoiceSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={(term) => setSearchTerm(term)} />
                <InvoiceLimit onLimitChange={(val) => setLimit(val)} />
            </div>

            <InvoiceFilter
                ids={invoices.map((invoice) => invoice.Id)}
                invoiceNumbers={invoices.map((invoice) => invoice.invoiceNumber)}
                issueds={invoices.map((invoice) => invoice.issued)}
                dueDates={invoices.map((invoice) => invoice.dueDate)}
                prices={invoices.map((invoice) => invoice.price)}
                vats={invoices.map((invoice) => invoice.vat)}
                notes={invoices.map((invoice) => invoice.note)}
                products={invoices.map((invoice) => invoice.product)}
                filter={filter}
                handleChange={handleChange}
                clearFilters={clearFilters}
                applyFilters={applyFilters}
            />

            {invoices.length === 0 ? (
                <div className="text-center mt-5">
                    {loading ? (
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Načítám...</span>
                        </div>
                    ) : (
                        <p>Žádné faktury k zobrazení.</p>
                    )}
                </div>
            ) : (
                <InvoiceTable
                    items={filteredInvoices.length > 0 ? filteredInvoices : invoices}
                    deleteInvoice={handleDelete}
                    currentOrdering={ordering}
                    setOrdering={setOrdering}
                />
            )}
        </div>
    );
};

export default InvoiceIndex;
