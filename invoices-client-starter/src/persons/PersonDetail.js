import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiGet } from "../utils/api";
import Country from "./Country";

const fieldLabels = {
    name: "Jméno",
    identificationNumber: "IČO",
    taxNumber: "DIČ",
    accountNumber: "Bankovní účet",
    bankCode: "Kód banky",
    iban: "IBAN",
    telephone: "Telefon",
    mail: "E-mail",
    street: "Ulice",
    city: "Město",
    zip: "PSČ",
    country: "Země",
    note: "Poznámka",
};

const formatFieldValue = (key, value, person) => {
    if (key === "country") {
        return value === Country.CZECHIA ? "Česká republika" : "Slovensko";
    }
    if (key === "accountNumber" && person.bankCode) {
        return `${value}/${person.bankCode}`;
    }
    return value || "-";
};

const PersonDetail = () => {
    const { Id } = useParams();
    const [person, setPerson] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPerson = async () => {
            try {
                const response = await apiGet(`/api/persons/${Id}`);
                setPerson(response);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchPerson();
    }, [Id]);


    return (
        <div className="">
            <div className="d-flex justify-content-between align-items-center my-3">
                <h2>Detail osoby</h2>
                <ul className="navbar-nav flex-row gap-4">
                    <li className="nav-item">
                        <Link className="nav-link" to={`/identification/${person.identificationNumber}/sales`}>
                            Výstavené faktury
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/identification/${person.identificationNumber}/purchases`}>
                            Přijaté faktury
                        </Link>
                    </li>
                </ul>
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
                                <td>{formatFieldValue(key, person[key], person)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
};

export default PersonDetail;
