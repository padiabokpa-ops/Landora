from django.contrib import admin
from .models import Inquiry, LiquidationRequest

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'property', 'status', 'created_at']
    list_filter = ['status']
    list_editable = ['status']

@admin.register(LiquidationRequest)
class LiquidationRequestAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'property_title', 'location_state', 'asking_price', 'status']
    list_filter = ['status']
    list_editable = ['status']