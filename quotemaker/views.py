# myapp/views.py
from django.shortcuts import render
from .models import Product
from django.http import JsonResponse


def product_list_json(request):
    products = Product.objects.all()
    product_data = [{'id': product.id, 'part_number': product.part_number,
                     'description': product.description, 'rate': product.rate} for product in products]
    return JsonResponse(product_data, safe=False)


def product_list(request):
    products = Product.objects.all()
    return render(request, 'quotemaker/product_list.html', {'products': products})


def quote(request):
    return render(request, 'quotemaker/quote_table.html')


def home(request):
    return render(request, 'quotemaker/home_page.html')
