from django.db import models
from accounts.models import User


class AgentProfile(models.Model):
    VERIFICATION_STATUS = [
        ('unverified', 'Unverified'), ('pending', 'Pending Review'),
        ('verified', 'Verified'), ('suspended', 'Suspended'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='agent_profile')
    agency = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=200, blank=True)
    license_number = models.CharField(max_length=100, blank=True)
    verification_status = models.CharField(max_length=20, choices=VERIFICATION_STATUS, default='unverified')
    id_document = models.FileField(upload_to='agent_docs/', blank=True, null=True)
    total_sales = models.PositiveIntegerField(default=0)
    total_listings = models.PositiveIntegerField(default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    review_count = models.PositiveIntegerField(default=0)
    commission_split_percent = models.DecimalField(max_digits=5, decimal_places=2, default=60.00)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Agent: {self.user.full_name}'

    @property
    def is_verified(self):
        return self.verification_status == 'verified'