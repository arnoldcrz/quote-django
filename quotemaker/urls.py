from django.urls import path
from . import views

urlpatterns = [
    path('product-list/', views.product_list, name='product_list'),
    path('', views.home, name='home'),
    path('', views.quote, name='quote'),
]
