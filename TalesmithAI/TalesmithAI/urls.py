# talesmithai/urls.py
from django.contrib import admin
from django.urls import path, include, re_path  # Import include
from django.views.generic import TemplateView
from .views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('startpage.urls')),  # Include your app's URLs
    path('', index, name='index'),
    # Serve the main HTML file for all other routes
    re_path(r'^(?!/?api/).*$', TemplateView.as_view(template_name='index.html')),
]
