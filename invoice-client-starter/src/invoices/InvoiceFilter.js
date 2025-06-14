import React from "react";
import Select from "react-select";

export default function InvoiceFilter({
    ids,
    invoiceNumbers,
    issueds,
    dueDates,
    prices,
    vats,
    notes,
    products,
    filter,
    handleChange,
    clearFilters,
    applyFilters,
}) {
    const uniqueSorted = (arr, isNumeric = false) =>
        [...new Set(arr)].sort(isNumeric ? (a, b) => a - b : undefined);

    ids = uniqueSorted(ids);
    invoiceNumbers = uniqueSorted(invoiceNumbers);
    issueds = uniqueSorted(issueds);
    dueDates = uniqueSorted(dueDates);
    prices = uniqueSorted(prices, true);
    vats = uniqueSorted(vats, true);
    notes = uniqueSorted(notes);
    products = uniqueSorted(products);

    const getValue = (arr, key) => {
        const val = filter[key];
        return arr.includes(val) ? { value: val, label: val } : null;
    };

    return (
        <div className="d-flex flex-column gap-2 mb-3">
            <div className="d-flex flex-column flex-lg-row justify-content-lg-between gap-lg-5 gap-2">
                <Select
                    options={ids.map((id) => ({ value: id, label: id }))}
                    value={getValue(ids, "id")}
                    isClearable
                    isSearchable
                    placeholder="Filtrovat podle id"
                    onChange={(selected) => handleChange("id", selected)}
                    className="w-100 w-lg-auto"
                />
                <Select
                    options={invoiceNumbers.map((num) => ({ value: num, label: num }))}
                    value={getValue(invoiceNumbers, "invoiceNumber")}
                    isClearable
                    isSearchable
                    placeholder="Filtrovat podle čísla faktury"
                    onChange={(selected) => handleChange("invoiceNumber", selected)}
                    className="w-100 w-lg-auto"
                />
            </div>

            <div className="d-flex flex-column flex-lg-row justify-content-lg-between gap-lg-5 gap-2">
                <Select
                    options={issueds.map((date) => ({ value: date, label: date }))}
                    value={getValue(issueds, "issued")}
                    isClearable
                    isSearchable
                    placeholder="Filtrovat podle data vystavení"
                    onChange={(selected) => handleChange("issued", selected)}
                    className="w-100 w-lg-auto"
                />
                <Select
                    options={dueDates.map((date) => ({ value: date, label: date }))}
                    value={getValue(dueDates, "dueDate")}
                    isClearable
                    isSearchable
                    placeholder="Filtrovat podle data splatnosti"
                    onChange={(selected) => handleChange("dueDate", selected)}
                    className="w-100 w-lg-auto"
                />
            </div>

            <div className="d-flex flex-column flex-lg-row justify-content-lg-between gap-lg-5 gap-2">
                <Select
                    options={prices.map((price) => ({ value: price, label: price }))}
                    value={getValue(prices, "price")}
                    isClearable
                    isSearchable
                    placeholder="Filtrovat podle ceny"
                    onChange={(selected) => handleChange("price", selected)}
                    className="w-100 w-lg-auto"
                />
                <Select
                    options={vats.map((vat) => ({ value: vat, label: vat }))}
                    value={getValue(vats, "vat")}
                    isClearable
                    isSearchable
                    placeholder="Filtrovat podle DPH"
                    onChange={(selected) => handleChange("vat", selected)}
                    className="w-100 w-lg-auto"
                />
            </div>

            <div className="d-flex flex-column flex-lg-row justify-content-lg-between gap-lg-5 gap-2">
                <Select
                    options={notes.map((note) => ({ value: note, label: note }))}
                    value={getValue(notes, "note")}
                    isClearable
                    isSearchable
                    placeholder="Filtrovat podle poznámky"
                    onChange={(selected) => handleChange("note", selected)}
                    className="w-100 w-lg-auto"
                />
                <Select
                    options={products.map((product) => ({ value: product, label: product }))}
                    value={getValue(products, "product")}
                    isClearable
                    isSearchable
                    placeholder="Filtrovat podle produktu"
                    onChange={(selected) => handleChange("product", selected)}
                    className="w-100 w-lg-auto"
                />
            </div>

            <div className="d-flex justify-content-between align-items-center">
                <button className="btn btn-outline-danger" onClick={clearFilters}>
                    Vyčistit filtr
                </button>
                <button className="btn btn-outline-success" onClick={applyFilters}>
                    Filtrovat
                </button>
            </div>
        </div>
    );
}
