import React from 'react'

import { Route, Routes, Navigate } from "react-router-dom";

import PersonIndex from "../persons/PersonIndex";
import PersonDetail from "../persons/PersonDetail";
import PersonForm from "../persons/PersonForm";
import PersonSales from "../persons/PersonSales";
import PersonPurchases from "../persons/PersonPurchases";

import InvoiceIndex from "../invoices/InvoiceIndex";
import InvoiceDetail from "../invoices/InvoiceDetail";
import InvoiceForm from "../invoices/InvoiceForm";

import InvoiceChart from "../statistics/InvoiceChart";
import PersonChart from "../statistics/PersonChart";

export default function Main() {
    return (
        <main>
            <div className="container">
                <Routes>
                    <Route index element={<Navigate to={"/persons"} />} />
                    <Route path="/persons">
                        <Route index element={<PersonIndex />} />
                        <Route path="show/:Id" element={<PersonDetail />} />
                        <Route path="create" element={<PersonForm />} />
                        <Route path="edit/:Id" element={<PersonForm />} />
                        <Route path="statistics" element={<PersonChart />} />
                    </Route>

                    <Route path="/invoices">
                        <Route index element={<InvoiceIndex />} />
                        <Route path="show/:Id" element={<InvoiceDetail />} />
                        <Route path="create" element={<InvoiceForm />} />
                        <Route path="edit/:Id" element={<InvoiceForm />} />
                        <Route path="statistics" element={<InvoiceChart />} />
                    </Route>

                    <Route path="/identification/:identificationNumber">
                        <Route path="sales" element={<PersonSales />} />
                        <Route path="purchases" element={<PersonPurchases />} />
                    </Route>

                </Routes>
            </div>
        </main>
    );
};
