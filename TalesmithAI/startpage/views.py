# startpage/views.py
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, get_user, logout
from .models import CustomUser, ChatMessage, Feedback, Payment
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware.csrf import get_token
from .authentication import EmailBackend
from django.http import HttpResponse
from django.http import JsonResponse
import requests
from django.conf import settings
import json
import stripe
import openai
from openai import OpenAI
from datetime import datetime, timedelta


stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
@api_view(['POST'])
def signup_view(request):
    data = request.data
    print(data)  # Debug print statement
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not (username and email and password):
        return Response({'error': 'All fields are required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = CustomUser.objects.create_user(username=username, email=email, password=password)
        user.save()
        return Response({'message': 'User created successfully!'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@ensure_csrf_cookie
@api_view(['POST'])
def login_view(request):
    data = request.data
    print("Received data:", data)  # Debugging statement

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=email, password=password)  # Use 'username' for email

    if user is not None:
        if user.is_staff or user.is_superuser:
            # Admin user login logic
            logout(request)
            login(request, user)
            request.session.save()  # Ensure session is saved
            print("Admin user logged in and session saved:", request.user)
            print("Session ID:", request.session.session_key)
            return Response({'message': 'Admin login successful!', 'is_staff': True}, status=status.HTTP_200_OK)
        
        if user.has_paid:
            # User has already paid, login without incrementing login_attempts
            logout(request)
            login(request, user)
            request.session.save()  # Ensure session is saved
            print("User logged in and session saved:", request.user)
            print("Session ID:", request.session.session_key)
            return Response({'message': 'Login successful!', 'has_paid': True, 'is_staff': False}, status=status.HTTP_200_OK)
        
        if user.login_attempts >= 3 and not user.has_paid:
            return Response({'error': 'Free trial period ended. Payment required.'}, status=status.HTTP_402_PAYMENT_REQUIRED)
        
        # Logout other sessions and login
        logout(request)
        login(request, user)
        user.login_attempts += 1
        user.save()
        request.session.save()  # Ensure session is saved
        print("User logged in and session saved:", request.user)
        print("Session ID:", request.session.session_key)
        return Response({'message': 'Login successful!', 'has_paid': False, 'is_staff': False}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Ensure only authenticated users can access this endpoint
def get_payment_status(request):
    user = request.user
    if user.is_authenticated and not user.is_staff and not user.is_superuser:
        # Only non-staff and non-superuser users should be allowed to access payment status
        return JsonResponse({'has_paid': user.has_paid})
    else:
        return JsonResponse({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)

@ensure_csrf_cookie
@api_view(['GET'])
def get_csrf_token(request):
    token = get_token(request)
    return Response({'csrfToken': token})

@api_view(['POST'])
def refresh_payment_csrf_token_view(request):
    backend = EmailBackend()
    return backend.refresh_csrf_token_for_payment(request)

def get_gpt_response(message):
    try:
        client = OpenAI(api_key=settings.OPENAI_API_KEY)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo-0125",
            messages=[{"role": "system", "content": "you are ai model"}, {"role": "user", "content": str(message)}],
            max_tokens=1500,
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error communicating with OpenAI API: {e}")
        raise Exception(f"An unexpected error occurred: {e}")

@csrf_exempt
@api_view(['POST'])
def chat_with_gpt(request):
    try:
        print(f"Request data: {request.data}")  # Debug print statement
        data = request.data
        print(f"Parsed data: {data}")  # Log the parsed data

        message = data.get('message')
        user = request.user 
        print(f"User: {user}, Authenticated: {user.is_authenticated}")

        if not message:
            print("No message provided")
            return JsonResponse({'error': 'No message provided'}, status=status.HTTP_400_BAD_REQUEST)

        response = get_gpt_response(message)
        print(f"OpenAI API response: {response}")
        
        if user.is_authenticated and not user.is_staff and not user.is_superuser:
            print('Authenticated User:', user)
            user_instance = CustomUser.objects.get(id=user.id)
            ChatMessage.objects.create(user=user_instance, message=message, response=response)
        else:
            print('User is not authenticated or not a customer user')
            return JsonResponse({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

        return JsonResponse({'response': response})
    except Exception as e:
        print(f"Error in chat_with_gpt: {e}")
        return JsonResponse({'error': 'An unexpected error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def chat_history(request):
    print(f"Authenticated User: {request.user}")  # Debugging statement
    user = request.user
    if user.is_staff or user.is_superuser:
        return JsonResponse({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)
    chat_messages = ChatMessage.objects.filter(user=user).order_by('-timestamp')
    history = [
        {'message': chat.message, 'response': chat.response, 'timestamp': chat.timestamp}
        for chat in chat_messages
    ]
    return JsonResponse({'history': history})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_feedback(request):
    data = request.data
    feedback_text = data.get('feedback')

    if not feedback_text:
        return Response({'error': 'Feedback is required'}, status=status.HTTP_400_BAD_REQUEST)

    Feedback.objects.create(user=request.user, feedback=feedback_text)
    return Response({'message': 'Feedback submitted successfully!'}, status=status.HTTP_201_CREATED)

@csrf_exempt
@api_view(['POST'])
def create_checkout_session(request):
    if request.method == 'POST':
        try:
            session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                            'name': 'Subscription Fee',
                        },
                        'unit_amount': 1000,  # $10.00
                    },
                    'quantity': 1,
                }],
                mode='payment',
                success_url=settings.STRIPE_SUCCESS_URL,  # Update the success URL
                cancel_url=settings.STRIPE_CANCEL_URL,
            )
            return Response({'id': session.id})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def process_payment(request):
    if request.method == 'POST':
        payment_intent_id = request.data.get('payment_intent_id')
        print(f"Payment Intent ID: {payment_intent_id}")

        if not payment_intent_id:
            return Response({'error': 'Payment Intent ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            payment_intent = stripe.PaymentIntent.retrieve(payment_intent_id)
            print(f"Payment Intent Status: {payment_intent.status}")

            if payment_intent.status == 'succeeded':
                amount = payment_intent.amount / 100
                user_email = payment_intent.charges.data[0].billing_details.email
                print(f"User Email: {user_email}")

                user = CustomUser.objects.get(email=user_email)
                print(f"User: {user}")

                if not user.is_staff and not user.is_superuser:
                    Payment.objects.create(user=user, payment_id=payment_intent.id, amount=amount)
                    user.has_paid = True
                    user.login_attempts = 0
                    user.save()
                    # Manually authenticate the user
                    user.backend = 'startpage.authentication.EmailBackend'  # Ensure the correct backend is set
                    login(request, user, backend='startpage.authentication.EmailBackend')  # Log in the correct user after successful payment
                    print(f"User {user.email} authenticated as customer after payment")
                    request.session.save()  
                    return Response({'message': 'Payment successful'}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)
            else:
                return Response({'error': 'Payment failed'}, status=status.HTTP_400_BAD_REQUEST)
        except stripe.error.StripeError as e:
            print(f"Stripe Error: {e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@csrf_exempt
@api_view(['POST'])
def webhook(request):
    # Retrieve the event data from the request
    payload = request.body
    event = None

    try:
        event = stripe.Event.construct_from(
            json.loads(payload), stripe.api_key
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)

    # Handle the event based on its type
    if event.type == 'checkout.session.completed':
        # Extract necessary data from the event
        session = event.data.object
        payment_intent = session.payment_intent
        customer_email = session.customer_details.email
        
        # Update the payment status for the corresponding user in your database
        # (You might need to retrieve the user based on their email)
        user = CustomUser.objects.get(email=customer_email)
        user.has_paid = True
        user.save()

    # Return a success response to Stripe
    return HttpResponse(status=200)

def handle_checkout_session(session):
    customer_email = session['customer_details']['email']
    payment_id = session['payment_intent']
    amount = session['amount_total'] / 100  # Stripe amount is in cents
    user = CustomUser.objects.get(email=customer_email)

    if not user.is_staff and not user.is_superuser:
        # Update payment status in Payment model
        payment = Payment.objects.create(user=user, payment_id=payment_id, amount=amount)
        user.has_paid = True
        user.login_attempts = 0
        user.save()
        return payment 
    
@api_view(['GET'])
@permission_classes([IsAdminUser])  # Apply IsAdminUser permission
def user_report_view(request):
    user_type = request.query_params.get('type', 'All')
    date_filter = request.query_params.get('date', None)
    
    users = CustomUser.objects.all()
    
    if user_type == 'Subscribed':
        users = users.filter(has_paid=True)
    elif user_type == 'Unsubscribed':
        users = users.filter(has_paid=False)

    if date_filter:
        try:
            days = int(date_filter)
            date_from = datetime.now() - timedelta(days=days)
            users = users.filter(timestamp__gte=date_from)
        except ValueError:
            return Response({'error': 'Invalid date filter'}, status=status.HTTP_400_BAD_REQUEST)
    
    user_data = [
        {
            'email': user.email,
            'username': user.username,
            'is_active': user.is_active,
            'timestamp': user.timestamp
        } for user in users
    ]
    
    return Response({'users': user_data}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAdminUser])  # Ensure only admin users can access this endpoint
def is_admin(request):
    return Response({'is_admin': True})

def index(request):
    return render(request, 'index.html')