from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import action

from ..serializers import PersonSerializer, InvoiceSerializer, Person, Invoice
from ..statistics.person_statistics import PersonStatistics


class PersonViewSet(viewsets.ModelViewSet, PersonStatistics):
    queryset = Person.objects.filter(hidden=False)
    serializer_class = PersonSerializer

    def perform_create(self, serializer):
        serializer.is_valid(raise_exception=True)
        serializer.save()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.hidden = True
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['get'], url_path='statistics')
    def calculate_statistics(self, request):
        """
        The statistics endpoint for persons.
        The endpoint is registered in urls.py: persons/statistics/
        """
        # Load only necessary columns from all persons and all invoices
        # and make them lists for numpy calculations
        persons = Person.objects.all().values_list('id', 'identification_number', 'name', 'hidden')
        invoices = Invoice.objects.all().values_list('seller_id', 'buyer_id', 'price')
        return Response(self.get_statistics(persons, invoices))
    
    
class PersonInvoicesByIdentificationView(APIView):
    """
    The base view for getting invoices by identification number.
    """
    role = None
    
    def get(self, request, identification_number):
        people = Person.objects.filter(identification_number=identification_number)
        invoices = Invoice.objects.filter(**{f"{self.role}__in": people})
        
        if not people.exists():
            return Response({"detail": "Person not found"}, status=status.HTTP_404_NOT_FOUND)
        if not invoices.exists():
            return Response({"detail": "No invoices found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = InvoiceSerializer(invoices, many=True)
        return Response(serializer.data)

class PersonSalesView(PersonInvoicesByIdentificationView):
    """
    The view for getting sales invoices by identification number.
    The endpoint is registered in urls.py: api/identification/<str:identification_number>/sales/
    """
    role = 'seller'
    
class PersonPurchasesView(PersonInvoicesByIdentificationView):
    """
    The view for getting purchase invoices by identification number.
    The endpoint is registered in urls.py: api/identification/<str:identification_number>/purchases/
    """
    role = 'buyer'

