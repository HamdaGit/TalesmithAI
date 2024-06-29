"""
Django settings for TalesmithAI project.

Generated by 'django-admin startproject' using Django 5.0.2.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

import os
from pathlib import Path
from decouple import config

OPENAI_API_KEY = config('OPENAI_API_KEY')

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-thy-iligzh#bjhajj_igy*w-*xlay##mp^3t%rh4w#^mbzs)os'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'startpage',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React development server
    "http://127.0.0.1:3000",  # React development server
]
CORS_ALLOW_CREDENTIALS = True

ROOT_URLCONF = 'TalesmithAI.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'frontend_static', 'build')], 
        'APP_DIRS': True,  # Disable app template loading
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'TalesmithAI.wsgi.application'

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# settings.py

APPEND_SLASH = False

AUTH_USER_MODEL = 'startpage.CustomUser'

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'startpage.authentication.EmailBackend',  # Your custom backend
]

SESSION_ENGINE = 'django.contrib.sessions.backends.db'  # Default
SESSION_EXPIRE_AT_BROWSER_CLOSE = True
SESSION_COOKIE_AGE = 1209600  # Two weeks in seconds

CSRF_TRUSTED_ORIGINS = ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:8000']


CORS_ALLOW_ALL_ORIGINS = True
CSRF_COOKIE_SECURE = False  # Set to True in production
CSRF_COOKIE_HTTPONLY = True
CORS_ORIGIN_WHITELIST = (
    'http://localhost:8000/',  # Add the origin of your frontend application
)
# Ensure these are set correctly
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SECURE = True  # Set to False if you're not using HTTPS

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/
STATIC_URL = '/static/'
STATICFILES_DIRS = [

    os.path.join(BASE_DIR, 'frontend_static', 'build', 'static'),

]
# settings.py

STRIPE_SECRET_KEY = 'sk_test_51POOuLRwnPTAWSL72Sv9DqrJ47ZKoA6j7moQWi6acc6qCYYhUnh22gkY3FZhRkrgMR0jvLUZoZ9ZWqn66R6NTBDN00Ewder02i'
STRIPE_PUBLISHABLE_KEY = 'pk_test_51POOuLRwnPTAWSL7K2FYCEekuODOfbTlAwX3a402BHhVvnzAaoHUYvahLa8ly0dvfYT0CjuNA2ceX56keiTwiBiR00GYhFXIus'
STRIPE_ENDPOINT_SECRET = 'whsec_eCMyYZtqowKVRKqVaO8qwPZa29pVZ0w8'
STRIPE_SUCCESS_URL = 'http://localhost:8000/mainapp'
STRIPE_CANCEL_URL = 'http://localhost:8000/login'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}
[
    BASE_DIR / "frontend_static",
    os.path.join(BASE_DIR, 'frontend_static' ,'static'),
]

# BASE_DIR = os.path.dirname(os.path.abspath(__file__))


# STATICFILES_DIRS = [os.path.join(BASE_DIR, 'frontend/dist/assets')]
# STATIC_URL = '/assets/'
# STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
