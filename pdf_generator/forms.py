from django import forms
from .models import HTMLContent  # Import your HTMLContent model

class HTMLContentForm(forms.ModelForm):
    class Meta:
        model = HTMLContent  # Specify the model to use
        fields = ['title', 'content']  # List the fields you want in the form
