from django import forms
from .models import QuoteItem


class QuoteItemForm(forms.ModelForm):
    class Meta:
        model = QuoteItem
        fields = '__all__'
