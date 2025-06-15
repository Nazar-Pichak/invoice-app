import React, { useState } from 'react';

export default function InvoiceLimit({ onLimitChange }) {
	const [input, setInput] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		onLimitChange(input);
	};

    console.log(input);

	return (
		<form className="d-flex w-100" onSubmit={handleSubmit}>
			<input
				className="form-control me-2"
				type="number"
				min="0"
				placeholder="Limit faktur"
				aria-label="Limit"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<button className="btn btn-outline-success" type="submit">
				Nastavit
			</button>
		</form>
	);
}
