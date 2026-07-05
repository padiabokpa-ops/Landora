from django.db import models
from accounts.models import User
import json


class Property(models.Model):
    PROPERTY_TYPES = [
        ('Apartment', 'Apartment'), ('House', 'House'), ('Duplex', 'Duplex'),
        ('Bungalow', 'Bungalow'), ('Land', 'Land'), ('Commercial', 'Commercial'),
        ('Warehouse', 'Warehouse'), ('Office', 'Office'),
    ]
    LISTING_TYPES = [
        ('Sale', 'Sale'), ('Rent', 'Rent'), ('Shortlet', 'Shortlet'), ('Lease', 'Lease'),
    ]
    PAYMENT_TERMS = [
        ('full_upfront', 'Full Payment Upfront'),
        ('part_payment', 'Part Payment Allowed'),
        ('escrow', 'Escrow'),
        ('pod', 'Payment Upon Inspection'),
        ('negotiable', 'Negotiable'),
    ]
    STATES = [
        ('Lagos', 'Lagos'), ('Abuja', 'Abuja (FCT)'), ('Rivers', 'Rivers'),
        ('Oyo', 'Oyo'), ('Kano', 'Kano'), ('Enugu', 'Enugu'), ('Delta', 'Delta'),
        ('Anambra', 'Anambra'), ('Kaduna', 'Kaduna'), ('Cross River', 'Cross River'),
        ('Other', 'Other'),
    ]

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='properties')
    title = models.CharField(max_length=255)
    description = models.TextField()
    property_type = models.CharField(max_length=50, choices=PROPERTY_TYPES)
    listing_type = models.CharField(max_length=20, choices=LISTING_TYPES)
    price = models.DecimalField(max_digits=15, decimal_places=2)
    location_state = models.CharField(max_length=100, choices=STATES)
    location_area = models.CharField(max_length=200)
    location_address = models.TextField(blank=True)
    latitude = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
    longitude = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
    bedrooms = models.PositiveSmallIntegerField(null=True, blank=True)
    bathrooms = models.PositiveSmallIntegerField(null=True, blank=True)
    size_sqm = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    amenities = models.TextField(default='[]')
    commission_rate = models.DecimalField(max_digits=5, decimal_places=2, default=5.00)
    payment_terms = models.CharField(max_length=30, choices=PAYMENT_TERMS, default='full_upfront')
    allows_part_payment = models.BooleanField(default=False)
    minimum_deposit_percent = models.PositiveSmallIntegerField(default=0)
    is_verified = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_diaspora_friendly = models.BooleanField(default=False)
    is_direct_liquidation = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    saved_by = models.ManyToManyField(User, related_name='saved_properties', blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def get_amenities(self):
        try:
            return json.loads(self.amenities)
        except Exception:
            return []


class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='properties/')
    is_primary = models.BooleanField(default=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-is_primary', 'uploaded_at']

    def __str__(self):
        return f'Image for {self.property.title}'


class SavedProperty(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='favourites')
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'property')