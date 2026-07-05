from rest_framework import serializers
from .models import AgentProfile
from properties.serializers import PropertySerializer


class AgentProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(source='user.full_name', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    phone = serializers.CharField(source='user.phone', read_only=True)
    photo = serializers.ImageField(source='user.profile_photo', read_only=True)
    properties = serializers.SerializerMethodField()
    listings_count = serializers.SerializerMethodField()

    class Meta:
        model = AgentProfile
        fields = [
            'id', 'full_name', 'email', 'phone', 'photo',
            'agency', 'bio', 'location', 'license_number',
            'verification_status', 'is_verified',
            'total_sales', 'total_listings', 'rating', 'review_count',
            'properties', 'listings_count', 'created_at',
        ]

    def get_properties(self, obj):
        props = obj.user.properties.filter(is_active=True)[:6]
        return PropertySerializer(props, many=True, context=self.context).data

    def get_listings_count(self, obj):
        return obj.user.properties.filter(is_active=True).count()