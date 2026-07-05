from django.contrib import admin
from .models import Property, PropertyImage

class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ['title', 'owner', 'listing_type', 'property_type', 'price', 'location_state', 'is_verified', 'is_active']
    list_filter = ['listing_type', 'property_type', 'location_state', 'is_verified', 'is_active', 'is_diaspora_friendly']
    search_fields = ['title', 'location_area', 'owner__full_name']
    list_editable = ['is_verified', 'is_active']
    inlines = [PropertyImageInline]

@admin.register(PropertyImage)
class PropertyImageAdmin(admin.ModelAdmin):
    list_display = ['property', 'is_primary', 'uploaded_at']