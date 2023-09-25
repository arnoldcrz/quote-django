from django.contrib import admin
from .models import Product
from .models import QuoteSession, QuoteItem


admin.site.register(Product)

@admin.register(QuoteSession)
class QuoteSessionAdmin(admin.ModelAdmin):
    # Define how QuoteSession is displayed in the admin panel
    list_display = ('session_key',)  # Add other fields as needed

@admin.register(QuoteItem)
class QuoteItemAdmin(admin.ModelAdmin):
    # Define how QuoteItem is displayed in the admin panel
    list_display = ('quote_session', 'item_type', 'item_order', 'part_number', 'quantity', 'description', 'rate', 'amount', 'section_title', 'notes')
    list_filter = ('item_type',) 

