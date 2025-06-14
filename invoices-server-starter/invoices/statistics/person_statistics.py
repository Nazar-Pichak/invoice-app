import numpy as np
from rest_framework.response import Response
from decimal import Decimal

class PersonStatistics: 
    """
    Utility class to calculate statistics for each persons based on their invoices.
    This function retrieves all persons and their invoices, calculates.
    """
    @staticmethod
    def get_statistics(persons, invoices):
        if not persons or not invoices:
            return []
        
        # Convert to numpy arrays
        persons_np = np.array(persons, dtype=object)
        invoices_np = np.array(invoices, dtype=object)
        # Map seller_id to identification_number
        person_ids_to_identification_numbers = {person_id: identification_number for person_id, identification_number, *_ in persons_np}
        seller_ids = invoices_np[:, 0]
        buyer_ids = invoices_np[:, 1]
        prices = invoices_np[:, 2].astype(np.float64)
        seller_identification_numbers = np.vectorize(person_ids_to_identification_numbers.get)(seller_ids)
        buyer_identification_numbers = np.vectorize(person_ids_to_identification_numbers.get)(buyer_ids)
        
        # Group revenue by identification_number
        unique_idents_seller, index = np.unique(seller_identification_numbers, return_inverse=True)
        revenue = np.zeros(len(unique_idents_seller))
        np.add.at(revenue, index, prices)
        identification_to_revenue = dict(zip(unique_idents_seller, revenue))
        
        # Group expenses by identification_number
        unique_idents_buyer, index_buyer = np.unique(buyer_identification_numbers, return_inverse=True)
        expenses = np.zeros(len(unique_idents_buyer))
        np.add.at(expenses, index_buyer, prices)
        identification_to_expenses = dict(zip(unique_idents_buyer, expenses))
        
        # Prepare response for non-hidden persons
        response_data = []
        for person_id, identification_number, person_name, hidden in persons_np:
            if not hidden:
                revenue = identification_to_revenue.get(identification_number, 0.0)
                expenses = identification_to_expenses.get(identification_number, 0.0)
                response_data.append({
                    "person_id": person_id,
                    "person_name": person_name,
                    "revenue": round(Decimal(revenue), 2),
                    "expenses": round(Decimal(expenses), 2),
                })
                
        return response_data