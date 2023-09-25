from django.db import models
from django.contrib.sessions.models import Session


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    part_number = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    rate = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.part_number
    
    def as_dict(self):
        return {
            'id': self.id,
            'part_number': self.part_number,
            'description': self.description,
            'rate': str(self.rate) if self.rate is not None else None
        }


class QuoteItem(models.Model):
    ITEM_TYPES = (
        ('row', 'Row'),  # Represents a table row
        ('divider', 'Divider'),  # Represents a row divider
        ('note', 'Note'),  # Represents a row note
    )

    quote_session = models.ForeignKey('QuoteSession', on_delete=models.CASCADE)
    item_type = models.CharField(max_length=10, choices=ITEM_TYPES)
    item_order = models.IntegerField()
    part_number = models.CharField(max_length=255, blank=True, null=True)
    quantity = models.IntegerField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    rate = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    amount = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True)
    section_title = models.CharField(max_length=255, blank=True, null=True)
    notes = models.TextField(blank=True, null=True)


class QuoteSession(models.Model):
    session_key = models.CharField(max_length=40, unique=True)
    # Add any other fields relevant to your sessions
