from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

class InvoiceFilterConfig:
    """
    This is a helper class to configure the filtering, searchin and ordering for the InvoiceViewSet.
    """
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    
    # pattern for filtering: /api/invoices?<field_name>=<value>
    filterset_fields = ['id', 'invoice_number', 'issued', 'due_date', 'price', 'vat', 'note']
    
    # pattern for searching: /api/invoices?search=<value> 
    search_fields = ['id', 'invoice_number', 'issued', 'due_date', 'price', 'vat', 'note', 'buyer__name', 'seller__name', 'buyer__identification_number', 'seller__identification_number']
    
    # pattern for ordering: /api/invoices?ordering=<field_name>
    ordering_fields = ['id', 'invoice_number', 'issued', 'due_date', 'price', 'vat', 'buyer_id', 'seller_id']  
