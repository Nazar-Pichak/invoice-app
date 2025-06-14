from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from ..serializers import InvoiceSerializer, Invoice
from ..services.invoice_services import InvoiceFilterConfig
from ..statistics.invoice_statistics import InvoiceStatistics


class InvoiceViewSet(viewsets.ModelViewSet, InvoiceFilterConfig, InvoiceStatistics):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer  

    def perform_create(self, serializer):
        serializer.is_valid(raise_exception=True)
        serializer.save()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False, methods=['get'], url_path='statistics')
    def calculate_statistics(self, request):
        """
        The statistics endpoint for invoices.
        The endpoint is registered in urls.py: invoices/statistics/
        """
        # Load only necessary columns from all invoices
        invoices = Invoice.objects.values_list('issued', 'price')
        return Response(self.get_statistics(invoices))

