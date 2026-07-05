from django.db import models
from accounts.models import User
from properties.models import Property


class Inquiry(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'), ('read', 'Read'),
        ('replied', 'Replied'), ('closed', 'Closed'),
    ]
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='inquiries')
    sender = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='sent_inquiries')
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='new')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Inquiry from {self.name} on {self.property.title}'


class LiquidationRequest(models.Model):
    STATUS_CHOICES = [
        ('submitted', 'Submitted'), ('under_review', 'Under Review'),
        ('offer_made', 'Offer Made'), ('accepted', 'Accepted'), ('rejected', 'Rejected'),
    ]
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    property_title = models.CharField(max_length=255)
    property_type = models.CharField(max_length=50)
    location_area = models.CharField(max_length=200)
    location_state = models.CharField(max_length=100)
    size_sqm = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    asking_price = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    description = models.TextField()
    offer_price = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='submitted')
    admin_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Liquidation: {self.property_title} by {self.full_name}'