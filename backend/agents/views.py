from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import AgentProfile
from .serializers import AgentProfileSerializer


class AgentListView(generics.ListAPIView):
    queryset = AgentProfile.objects.select_related('user').filter(user__is_active=True)
    serializer_class = AgentProfileSerializer
    permission_classes = [AllowAny]


class AgentDetailView(generics.RetrieveAPIView):
    queryset = AgentProfile.objects.select_related('user')
    serializer_class = AgentProfileSerializer
    permission_classes = [AllowAny]