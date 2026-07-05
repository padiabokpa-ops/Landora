from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .models import Inquiry, LiquidationRequest
from .serializers import InquirySerializer, LiquidationRequestSerializer


class InquiryCreateView(generics.CreateAPIView):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    permission_classes = [AllowAny]


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def received_inquiries_view(request):
    inquiries = Inquiry.objects.filter(
        property__owner=request.user
    ).select_related('property').order_by('-created_at')
    serializer = InquirySerializer(inquiries, many=True)
    return Response({'results': serializer.data, 'count': inquiries.count()})


class LiquidationRequestCreateView(generics.CreateAPIView):
    queryset = LiquidationRequest.objects.all()
    serializer_class = LiquidationRequestSerializer
    permission_classes = [AllowAny]