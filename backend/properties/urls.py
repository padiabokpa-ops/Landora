from django.urls import path
from . import views

urlpatterns = [
    path('', views.PropertyListCreateView.as_view(), name='property-list'),
    path('<int:pk>/', views.PropertyDetailView.as_view(), name='property-detail'),
    path('my-listings/', views.my_listings_view, name='my-listings'),
    path('saved/', views.saved_properties_view, name='saved-properties'),
    path('<int:pk>/save/', views.toggle_save_view, name='toggle-save'),
]