from rest_framework import serializers
from .models import Inquiry, LiquidationRequest


class InquirySerializer(serializers.ModelSerializer):
    property_title = serializers.CharField(source='property.title', read_only=True)

    class Meta:
        model = Inquiry
        fields = ['id', 'property', 'property_title', 'name', 'email',
                  'phone', 'message', 'status', 'created_at']
        read_only_fields = ['id', 'status', 'created_at', 'property_title']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            validated_data['sender'] = request.user
        return super().create(validated_data)


class LiquidationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = LiquidationRequest
        fields = ['id', 'full_name', 'email', 'phone', 'property_title',
                  'property_type', 'location_area', 'location_state',
                  'size_sqm', 'asking_price', 'description', 'status', 'created_at']
        read_only_fields = ['id', 'status', 'created_at']