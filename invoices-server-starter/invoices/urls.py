from django.urls import path, include
from .routers import SlashOptionalRouter
from .views.api_views import custom_api_root

from .views.person_views import PersonViewSet, PersonSalesView, PersonPurchasesView
from .views.invoice_views import InvoiceViewSet

router = SlashOptionalRouter()
router.register(r'persons', PersonViewSet)
router.register(r'invoices', InvoiceViewSet)

router.register(r'persons/statistics', PersonViewSet, basename='persons-statistics')
router.register(r'invoices/statistics', InvoiceViewSet, basename='invoices-statistics')

urlpatterns = [
    path('api/', custom_api_root, name='custom-api-root'),
    path('api/', include(router.urls)),
    path('api/identification/<str:identification_number>/sales', PersonSalesView.as_view(), name='person-sales'),
    path('api/identification/<str:identification_number>/purchases', PersonPurchasesView.as_view(), name='person-purchases'),
]
