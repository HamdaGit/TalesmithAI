# startpage/urls.py

from django.urls import path
from .views import signup_view, login_view, get_csrf_token, chat_with_gpt, chat_history, submit_feedback, index, create_checkout_session, webhook, process_payment, refresh_payment_csrf_token_view, get_payment_status, user_report_view, is_admin


urlpatterns = [
    path('signup/', signup_view, name='signup'),
    path('login/', login_view, name='login'),
    path('get_csrf/', get_csrf_token, name='get_csrf'),
    path('chat/', chat_with_gpt, name='chat_with_gpt'),
    path('chat/history/', chat_history, name='chat_history'),
    path('submit_feedback/', submit_feedback, name='submit_feedback'),
    path('create-checkout-session/', create_checkout_session, name='create_checkout_session'),
    path('process-payment/', process_payment, name='process_payment'),
    path('webhook/', webhook, name='webhook'),
    path('refresh-payment-csrf/', refresh_payment_csrf_token_view, name='refresh_payment_csrf'),
    path('get_payment_status/', get_payment_status, name='get_payment_status'),
    path('user_report/', user_report_view, name='user_report'),
    path('is_admin/', is_admin, name='is_admin'),  # New URL for user report
    path('', index, name='index'),
]

