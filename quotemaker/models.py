from django.db import models


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    part_number = models.CharField(max_length=50, unique=True)
    description = models.TextField()
    rate = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
