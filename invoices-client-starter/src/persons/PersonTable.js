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

import React from "react";
import {Link} from "react-router-dom";

const PersonTable = ({items, deletePerson}) => {
    return (
        <div>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Jméno</th>
                        <th colSpan={3}>Identifikační číslo</th>
                    </tr>
                </thead>
                <tbody>
                {items.map((item, index) => (
                    <React.Fragment key={item.Id}>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.identificationNumber}</td>
                        </tr>
                        <tr>
                            <th>Akce</th>
                            <td colSpan={3}>
                                <div className="d-flex justify-content-around">
                                    <Link to={"/persons/show/" + item.Id} className="btn btn-sm btn-info">Zobrazit</Link>
                                    <Link to={"/persons/edit/" + item.Id} className="btn btn-sm btn-warning">Upravit</Link>
                                    <button onClick={() => deletePerson(item.Id)} className="btn btn-sm btn-danger">Odstranit</button>
                                </div>
                            </td>
                        </tr>
                    </React.Fragment>
                ))}
                </tbody>
            </table>
            <Link to={"/persons/create"} className="btn btn-success mb-3">Nová osoba</Link>
        </div>
    );
};

export default PersonTable;
