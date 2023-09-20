from django.urls import path
from . import views
from .views import generate_pdf

app_name = 'pdf_generator'

urlpatterns = [
    path('home/', views.home, name='home'),
    path('quote/', views.quote, name='quote'),
    path('generate-pdf/', generate_pdf, name='generate_pdf'),

]
