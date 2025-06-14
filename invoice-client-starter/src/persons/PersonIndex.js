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

import { apiDelete, apiGet } from "../utils/api";

import PersonTable from "./PersonTable";

const PersonIndex = () => {
    const [persons, setPersons] = useState([]);
    const [loading, setLoading] = useState(true);

    const deletePerson = async (Id) => {
        try {
            await apiDelete("/api/persons/" + Id);
        } catch (error) {
            console.log(error.message);
            alert(error.message)
        }
        setPersons(persons.filter((item) => item.Id !== Id));
    };

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const data = await apiGet("/api/persons");
                setPersons(data.results || data);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
                setError(error);
            }
        };
        fetchPersons();
    }, []);
    

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center my-3">
                <h2>Seznam osob</h2>
                <p className="m-0">Počet osob: {persons.length} </p>
            </div>
            {loading ? (
                <div className="text-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Načítám...</span>
                    </div>
                </div>
            ) : (
                <PersonTable deletePerson={deletePerson} items={persons} />
            )}
        </div>
    );
};
export default PersonIndex;
