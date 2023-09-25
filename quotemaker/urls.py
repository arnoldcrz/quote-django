from django.urls import path
from . import views

urlpatterns = [
    path('product-list/', views.product_list, name='product_list'),
    path('product-list-json/', views.product_list_json, name='product_list_json'),
    path('', views.index, name='index'),
    path('quote/', views.quote, name='quote'),
    path('quote_table/', views.quote_table, name='quote_table'),
    path('save_quote_item/', views.save_quote_item,
         name='save_quote_item'),
]
