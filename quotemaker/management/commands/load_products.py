from django.core.management.base import BaseCommand
import json
from decimal import Decimal
from quotemaker.models import Product  # Import your Product model


class Command(BaseCommand):
    help = 'Load data from a JSON file into the database'

    def add_arguments(self, parser):
        parser.add_argument('json_file', type=str,
                            help='Path to the JSON file')

    def handle(self, *args, **kwargs):
        json_file = kwargs['json_file']
        with open(json_file, 'r', encoding='utf-8') as file:
            product_data = json.load(file)
            for item in product_data:
                # Check if 'Part Number' key exists
                part_number = item.get('Part Number', '')
                # Check if 'Description' key exists
                description = item.get('Description', '')
                rate = item.get('Rate', '')  # Check if 'Rate' key exists

                # Handle "Call for Price" as a special case
                if isinstance(rate, str) and rate.strip().lower() == 'call for price':
                    rate_value = None
                else:
                    try:
                        rate_value = Decimal(rate)
                    except Exception as e:
                        self.stderr.write(self.style.ERROR(
                            f'Invalid rate value: {rate}'))
                        continue

                # Check if a product with the same part number already exists
                existing_product = Product.objects.filter(
                    part_number=part_number).first()

                if not existing_product:
                    Product.objects.create(
                        part_number=part_number,
                        description=description,
                        rate=rate_value
                    )
                else:
                    self.stderr.write(self.style.ERROR(
                        f'Skipping duplicate Part Number: {part_number}'))
        self.stdout.write(self.style.SUCCESS('Data imported successfully'))
