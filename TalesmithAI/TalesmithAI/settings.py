import os
from pathlib import Path
from decouple import config

OPENAI_API_KEY = config('OPENAI_API_KEY')

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-thy-iligzh#bjhajj_igy*w-*xlay##mp^3t%rh4w#^mbzs)os'

DEBUG = True

ALLOWED_HOSTS = []

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
    'whitenoise.middleware.WhiteNoiseMiddleware',
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
        'DIRS': [os.path.join(BASE_DIR, 'frontend/build')], 
        'APP_DIRS': True,
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

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

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

APPEND_SLASH = False

AUTH_USER_MODEL = 'startpage.CustomUser'

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'startpage.authentication.EmailBackend',  # Your custom backend
]

SESSION_ENGINE = 'django.contrib.sessions.backends.db'  # Default
SESSION_EXPIRE_AT_BROWSER_CLOSE = True
SESSION_COOKIE_AGE = 1209600  # Two weeks in seconds

CSRF_TRUSTED_ORIGINS = ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:8000','http://127.0.0.1:8000']

CORS_ALLOW_ALL_ORIGINS = True
CSRF_COOKIE_SECURE = False  # Set to True in production
CSRF_COOKIE_HTTPONLY = True
CORS_ORIGIN_WHITELIST = (
    'http://localhost:8000/',  # Add the origin of your frontend application
)
SECURE_SSL_REDIRECT = False
SECURE_HSTS_SECONDS = 0

SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SECURE = True  # Set to False if you're not using HTTPS

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'frontend/build/static'),
]
STATIC_ROOT = BASE_DIR / 'staticfiles'

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

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

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
