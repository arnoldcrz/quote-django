# myapp/views.py
from django.shortcuts import render, redirect
from .models import Product, QuoteSession, QuoteItem
from django.http import HttpResponse, JsonResponse
from .forms import QuoteItemForm


def start_new_session(request):
    # Create a new QuoteSession and associate it with the current session
    quote_session, created = QuoteSession.objects.get_or_create(
        session=request.session.session_key)
    return redirect('quote_table')  # Redirect to your quote table view


def quote_table(request):
    session_key = request.session.session_key
    quote_session, created = QuoteSession.objects.get_or_create(
        session_key=session_key)

    # Retrieve all QuoteItems for the current session and order them by item_order
    quote_items = QuoteItem.objects.filter(
        quote_session=quote_session).order_by('item_order')

    context = {
        'quote_session': quote_session,
        'quote_items': quote_items,
        'form': QuoteItemForm(),
    }

    return render(request, 'quotemaker/quote_table.html', context)


def save_quote_item(request):
    if request.method == 'POST':
        form = QuoteItemForm(request.POST)
        if form.is_valid():
            quote_item = form.save(commit=False)

            # Set the quote session for the item
            session_key = request.session.session_key
            quote_session, created = QuoteSession.objects.get_or_create(session_key=session_key)
            quote_item.quote_session = quote_session

            # Determine the item type based on the form data
            item_type = form.cleaned_data.get('item_type')

            # Handle different item types
            if item_type == 'row':
                print("Processing row...")
                # Process fields specific to rows (e.g., part_number, quantity, etc.)
                # Update quote_item fields accordingly

            elif item_type == 'divider':
                print("Processing divider...")
                # Process fields specific to dividers (e.g., section_title)
                # Update quote_item fields accordingly

            elif item_type == 'note':
                print("Processing note...")
                # Process fields specific to notes (e.g., notes)
                # Update quote_item fields accordingly

            quote_item.save()

    return redirect('quote_table')



def product_list_json(request):
    products = Product.objects.all()
    product_data = [{'id': product.id, 'part_number': product.part_number,
                     'description': product.description, 'rate': product.rate} for product in products]
    return JsonResponse(product_data, safe=False)


def product_list(request):
    products = Product.objects.all()
    # return render(request, 'quotemaker/product_list.html', {'products': products})
    
    product_data = [product.as_dict() for product in products]    
    return JsonResponse(product_data, safe=False)


def quote(request):
    return render(request, 'quotemaker/quote_table.html')


def index(request):
    return render(request, 'index.html')
