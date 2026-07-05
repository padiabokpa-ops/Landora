from rest_framework import generics, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
from django.db.models import Q
from .models import Property, SavedProperty
from .serializers import PropertySerializer, PropertyCreateSerializer


class PropertyListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'location_area', 'location_state', 'description']
    ordering_fields = ['price', 'created_at']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return PropertyCreateSerializer
        return PropertySerializer

    def get_queryset(self):
        qs = Property.objects.filter(is_active=True).select_related('owner').prefetch_related('images')
        params = self.request.query_params
        q = params.get('q')
        if q:
            qs = qs.filter(
                Q(title__icontains=q) | Q(location_area__icontains=q) |
                Q(location_state__icontains=q) | Q(description__icontains=q)
            )
        for field in ['listing_type', 'property_type', 'location_state']:
            val = params.get(field)
            if val:
                qs = qs.filter(**{field: val})
        if params.get('is_verified') == 'true':
            qs = qs.filter(is_verified=True)
        if params.get('is_diaspora_friendly') == 'true':
            qs = qs.filter(is_diaspora_friendly=True)
        if params.get('featured') == 'true':
            qs = qs.filter(is_featured=True)
        try:
            if params.get('price_min'):
                qs = qs.filter(price__gte=float(params['price_min']))
            if params.get('price_max'):
                qs = qs.filter(price__lte=float(params['price_max']))
        except (ValueError, TypeError):
            pass
        return qs

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.filter(is_active=True).select_related('owner').prefetch_related('images')
    serializer_class = PropertySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_listings_view(request):
    properties = Property.objects.filter(owner=request.user).prefetch_related('images').order_by('-created_at')
    serializer = PropertySerializer(properties, many=True, context={'request': request})
    return Response({'results': serializer.data, 'count': properties.count()})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def saved_properties_view(request):
    saved = SavedProperty.objects.filter(user=request.user).select_related('property')
    properties = [s.property for s in saved]
    serializer = PropertySerializer(properties, many=True, context={'request': request})
    return Response({'results': serializer.data, 'count': len(properties)})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_save_view(request, pk):
    try:
        prop = Property.objects.get(pk=pk, is_active=True)
    except Property.DoesNotExist:
        return Response({'detail': 'Not found.'}, status=404)
    saved, created = SavedProperty.objects.get_or_create(user=request.user, property=prop)
    if not created:
        saved.delete()
        return Response({'saved': False})
    return Response({'saved': True}, status=201)