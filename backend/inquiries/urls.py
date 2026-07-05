from django.urls import path
from . import views

urlpatterns = [
    path('', views.InquiryCreateView.as_view(), name='inquiry-create'),
    path('received/', views.received_inquiries_view, name='received-inquiries'),
    path('liquidation/', views.LiquidationRequestCreateView.as_view(), name='liquidation-request'),
]