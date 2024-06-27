# startpage/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, ChatMessage, Feedback, Payment

class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username', 'is_staff', 'is_active', 'timestamp', )  # Include timestamp
    list_filter = ('is_staff', 'is_active', 'is_superuser', 'groups', 'timestamp')
    search_fields = ('email', 'username')
    readonly_fields = ('date_joined', 'last_login')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'timestamp')}),  # Include timestamp
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2'),
        }),
    )

class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('user', 'message', 'response', 'timestamp')
    search_fields = ('user__email', 'message', 'response')
    list_filter = ('timestamp',)

class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('user', 'feedback', 'timestamp')
    search_fields = ('user__email', 'feedback')
    list_filter = ('timestamp',)

class PaymentAdmin(admin.ModelAdmin):
    list_display = ('user', 'payment_id', 'amount', 'timestamp')
    search_fields = ('user__email', 'payment_id')
    list_filter = ('timestamp',)

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(ChatMessage, ChatMessageAdmin)
admin.site.register(Feedback, FeedbackAdmin)
admin.site.register(Payment, PaymentAdmin)
