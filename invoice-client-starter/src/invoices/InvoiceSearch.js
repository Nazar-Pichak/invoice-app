// src/components/InvoiceSearch.js
import React from "react";

const InvoiceSearch = ({ searchTerm, setSearchTerm, onSearch }) => {
	const handleInput = (e) => {
		const val = e.target.value;
		setSearchTerm(val);
		if (val === "") {
			onSearch(""); // trigger full list on clear
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(searchTerm);
	};

	return (
		<form className="d-flex w-100" role="search" onSubmit={handleSubmit}>
			<input
				className="form-control me-2"
				type="search"
				placeholder="Hledat fakturu..."
				aria-label="Search"
				value={searchTerm}
				onInput={handleInput}
			/>
			<button className="btn btn-outline-success" type="submit">
				Hledat
			</button>
		</form>
	);
};

export default InvoiceSearch;
