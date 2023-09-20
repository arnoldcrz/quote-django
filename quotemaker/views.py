# myapp/views.py
from django.shortcuts import render
from .models import Product


def product_list(request):
    products = Product.objects.all()
    return render(request, 'quotemaker/product_list.html', {'products': products})


def quote(request):
    return render(request, 'quotemaker/quote_table.html')


def home(request):
    return render(request, 'quotemaker/home_page.html')
