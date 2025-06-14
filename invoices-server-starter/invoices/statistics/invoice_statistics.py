import numpy as np
from django.utils.timezone import now

class InvoiceStatistics:
    """
    Utility class to calculate statistics for all invoices in DB.
    """
    @staticmethod
    def get_statistics(invoices_data):    
        current_year = now().year
        if not invoices_data:
            return {
                "current_year_sum": 0.0,
                "all_time_sum": 0.0,
                "all_time_average": 0.0,
                "all_time_median": 0.0,
                "all_time_min": 0.0,
                "all_time_max": 0.0,
                "total_invoices": 0,
            }

        # Convert to NumPy array for performance
        issued_dates, prices = zip(*invoices_data)
        prices_array = np.array(prices, dtype=np.float64)
        issued_years = np.array([date.year for date in issued_dates], dtype=np.int32)
        
        # Compute sums based on numpy vectorization
        current_year_sum = np.sum(prices_array[issued_years == current_year])
        all_time_sum = np.sum(prices_array)
        all_time_average = np.mean(prices_array) if prices_array.size > 0 else 0.0
        all_time_median = np.median(prices_array) if prices_array.size > 0 else 0.0
        all_time_min = np.min(prices_array) if prices_array.size > 0 else 0.0
        all_time_max = np.max(prices_array) if prices_array.size > 0 else 0.0
        total_invoices = prices_array.size

        return {
            "current_year_sum": float(current_year_sum),
            "all_time_sum": float(all_time_sum),
            "all_time_average": float(all_time_average),
            "all_time_median": float(all_time_median),
            "all_time_min": float(all_time_min),
            "all_time_max": float(all_time_max),
            "total_invoices": int(total_invoices),
        }