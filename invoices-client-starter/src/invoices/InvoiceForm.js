/*  _____ _______         _                      _
 * |_   _|__   __|       | |                    | |
 *   | |    | |_ __   ___| |___      _____  _ __| | __  ___ ____
 *   | |    | | '_ \ / _ \ __\ \ /\ / / _ \| '__| |/ / / __|_  /
 *  _| |_   | | | | |  __/ |_ \ V  V / (_) | |  |   < | (__ / /
 * |_____|  |_|_| |_|\___|\__| \_/\_/ \___/|_|  |_|\_(_)___/___|
 *                                _
 *              ___ ___ ___ _____|_|_ _ _____
 *             | . |  _| -_|     | | | |     |  LICENCE
 *             |  _|_| |___|_|_|_|_|___|_|_|_|
 *             |_|
 *
 *   PROGRAMOVÁNÍ  <>  DESIGN  <>  PRÁCE/PODNIKÁNÍ  <>  HW A SW
 *
 * Tento zdrojový kód je součástí výukových seriálů na
 * IT sociální síti WWW.ITNETWORK.CZ
 *
 * Kód spadá pod licenci prémiového obsahu a vznikl díky podpoře
 * našich členů. Je určen pouze pro osobní užití a nesmí být šířen.
 * Více informací na http://www.itnetwork.cz/licence
 */

import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";


import { apiGet, apiPost, apiPut } from "../utils/api";

import InputField from "../components/InputField";
import FlashMessage from "../components/FlashMessage";


const InvoiceForm = () => {
    const navigate = useNavigate();
    const { Id } = useParams();
    const [invoice, setInvoice] = useState({
        invoiceNumber: "",
        issued: "",
        dueDate: "",
        price: "",
        vat: "",
        note: "",
        buyer: "",
        seller: "",
        product: "",
    });
    const [sentState, setSent] = useState(false);
    const [successState, setSuccess] = useState(false);
    const [errorState, setError] = useState(null);
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        if (Id) {
            apiGet("/api/invoices/" + Id).then((data) => setInvoice(data.results || data));
        }
        apiGet("/api/persons").then((data) => setPersons(data.results || data));
    }, [Id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        (Id ? apiPut("/api/invoices/" + Id, invoice) : apiPost("/api/invoices", invoice))
            .then((data) => {
                setSent(true);
                setSuccess(true);
                navigate("/invoices");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
                setSent(true);
                setSuccess(false);
            });
    };

    const personOptions = persons.map((person) => ({
        value: person.Id,
        label: person.name,
    }));

    const sent = sentState;
    const success = successState;

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center my-3">
                <h2 className="">{Id ? "Upravit" : "Vytvořit"} fakturu</h2>
                <p className="m-0">{Id ? invoice.invoiceNumber: ""}</p>
            </div>
            
            {errorState ? (
                <div className="alert alert-danger">{errorState}</div>
            ) : null}
            {sent && (
                <FlashMessage
                    theme={success ? "success" : ""}
                    text={success ? "Uložení faktury proběhlo úspěšně." : ""}
                />
            )}
            <form onSubmit={handleSubmit}>
                <InputField
                    required={true}
                    type="text"
                    name="invoiceNumber"
                    min="3"
                    label="Faktura číslo"
                    prompt="Zadejte číslo faktury"
                    value={invoice.invoiceNumber}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, invoiceNumber: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="issued"
                    min="3"
                    label="Datum vystavení"
                    prompt="Zadejte datum vystavení"
                    value={invoice.issued}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, issued: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="date"
                    name="dueDate"
                    min="3"
                    label="Datum splatnosti"
                    prompt="Zadejte datum splatnosti"
                    value={invoice.dueDate}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, dueDate: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="price"
                    min="3"
                    label="Cena"
                    prompt="Zadejte cenu"
                    value={invoice.price}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, price: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="vat"
                    min="3"
                    label="DPH"
                    prompt="Zadejte DPH"
                    value={invoice.vat}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, vat: e.target.value });
                    }}
                />

                <InputField
                    required={true}
                    type="text"
                    name="note"
                    min="3"
                    label="Poznámka"
                    prompt="Zadejte poznámku"
                    value={invoice.note}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, note: e.target.value });
                    }}
                />

                <label className="">Kupující</label>
                <Select
                    options={personOptions}
                    value={invoice.buyer?.Id? { value: invoice.buyer.Id, label: invoice.buyer.name }: null}
                    onChange={(selected) => {
                        const selectedPerson = persons.find(person => person.Id === selected?.value);
                        setInvoice({ ...invoice, buyer: selectedPerson || null });
                    }}
                    placeholder="Vyberte kupujícího"
                    isClearable={true}
                    label="Kupující"
                />

                <label className="">Prodávající</label>
                <Select
                    options={personOptions}
                    value={invoice.seller?.Id? { value: invoice.seller.Id, label: invoice.seller.name }: null}
                    onChange={(selected) => {
                        const selectedPerson = persons.find(person => person.Id === selected?.value);
                        setInvoice({ ...invoice, seller: selectedPerson || null });
                    }}
                    placeholder="Vyberte prodávajícího"
                    isClearable={true}
                    label="Prodávající"
                />

                <InputField
                    required={true}
                    type="text"
                    name="product"
                    min="3"
                    label="Produkt"
                    prompt="Zadejte produkt"
                    value={invoice.product}
                    handleChange={(e) => {
                        setInvoice({ ...invoice, product: e.target.value });
                    }}
                />


                <input type="submit" className="btn btn-success mt-3" value="Uložit" />
            </form>
        </div>
    );
};

export default InvoiceForm;
