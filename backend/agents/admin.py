from django.contrib import admin
from .models import AgentProfile

@admin.register(AgentProfile)
class AgentProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'agency', 'verification_status', 'rating', 'total_sales']
    list_filter = ['verification_status']
    list_editable = ['verification_status']
    search_fields = ['user__full_name', 'agency']