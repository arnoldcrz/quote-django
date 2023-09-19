from django.urls import path
from . import views

urlpatterns = [
    path('product-list/', views.product_list, name='product_list'),
    path('home/', views.home, name='home'),
    path('quote/', views.quote, name='quote'),
]
