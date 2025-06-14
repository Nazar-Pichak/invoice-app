from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

@api_view(['GET'])
def custom_api_root(request, format=None):
    """
    Custom API URLs for the application.
    Main purpose is to provide a single endpoint that lists all available API endpoints in the application.
    It overrides the default API root view provided by Django REST Framework.
    This is convenient way to keep all endpoints in one place and make it easy to find them for frontend developers.
    This is especially useful in large applications with many endpoints.     
    """
    
    return Response({
        "persons": reverse('person-list', request=request, format=format),
        "invoices": reverse('invoice-list', request=request, format=format),
        "persons_statistics": reverse('persons-statistics-list', request=request, format=format),
        "invoices_statistics": reverse('invoices-statistics-list', request=request, format=format),
        "persons_sales": request.build_absolute_uri('/api/identification/{identification_number}/sales'),
        "persons_purchases": request.build_absolute_uri('/api/identification/{identification_number}/purchases'),
    })