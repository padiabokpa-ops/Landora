from rest_framework import serializers
from .models import Property, PropertyImage, SavedProperty
from accounts.serializers import UserSerializer
import json


class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['id', 'image', 'is_primary', 'uploaded_at']


class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    owner = UserSerializer(read_only=True)
    amenities_list = serializers.SerializerMethodField()
    formatted_price = serializers.SerializerMethodField()

    class Meta:
        model = Property
        fields = [
            'id', 'owner', 'title', 'description', 'property_type',
            'listing_type', 'price', 'formatted_price', 'location_state',
            'location_area', 'location_address', 'latitude', 'longitude',
            'bedrooms', 'bathrooms', 'size_sqm', 'amenities', 'amenities_list',
            'commission_rate', 'payment_terms', 'allows_part_payment',
            'minimum_deposit_percent', 'is_verified', 'is_featured',
            'is_active', 'is_diaspora_friendly', 'is_direct_liquidation',
            'images', 'created_at', 'updated_at',
        ]
        read_only_fields = ['id', 'owner', 'is_verified', 'is_featured', 'created_at', 'updated_at']

    def get_amenities_list(self, obj):
        return obj.get_amenities()

    def get_formatted_price(self, obj):
        return f'₦{int(obj.price):,}'


class PropertyCreateSerializer(serializers.ModelSerializer):
    images = serializers.ListField(
        child=serializers.ImageField(), write_only=True, required=False
    )

    class Meta:
        model = Property
        fields = [
            'title', 'description', 'property_type', 'listing_type', 'price',
            'location_state', 'location_area', 'location_address',
            'bedrooms', 'bathrooms', 'size_sqm', 'amenities',
            'payment_terms', 'allows_part_payment', 'minimum_deposit_percent',
            'is_diaspora_friendly', 'images',
        ]

    def create(self, validated_data):
        images_data = validated_data.pop('images', [])
        amenities_raw = validated_data.get('amenities', '[]')
        if isinstance(amenities_raw, list):
            validated_data['amenities'] = json.dumps(amenities_raw)
        prop = Property.objects.create(**validated_data)
        for i, img in enumerate(images_data):
            PropertyImage.objects.create(property=prop, image=img, is_primary=(i == 0))
        return prop