import React from "react";

const ORDER_OPTIONS = [
  { label: "Id", value: "id" },
  { label: "Číslo faktury", value: "invoice_number" },
  { label: "Datum výstavení", value: "issued" },
  { label: "Datum platnosti", value: "due_date" },
  { label: "Cena", value: "price" },
  { label: "DPH", value: "vat" },
];

const InvoiceOrder = ({ currentOrdering, setOrdering }) => {
  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Uspořádat
      </a>
      <ul className="dropdown-menu">
        {ORDER_OPTIONS.map(({ label, value }) => (
          <React.Fragment key={value}>
            <li>
              <button
                className={`dropdown-item ${currentOrdering === value ? "active" : ""}`}
                onClick={() => setOrdering(value)}
              >
                {label} ↑
              </button>
            </li>
            <li>
              <button
                className={`dropdown-item ${currentOrdering === `-${value}` ? "active" : ""}`}
                onClick={() => setOrdering(`-${value}`)}
              >
                {label} ↓
              </button>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </li>
  );
};

export default InvoiceOrder;
