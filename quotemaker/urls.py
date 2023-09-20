from django.urls import path
from . import views

urlpatterns = [
    path('product-list/', views.product_list, name='product_list'),
    path('product-list-json/', views.product_list_json, name='product_list_json'),
    path('home/', views.home, name='home'),
    path('quote/', views.quote, name='quote'),

]
