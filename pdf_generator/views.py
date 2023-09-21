from django.http import HttpResponse
from reportlab.lib.pagesizes import *
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from reportlab.lib import colors
import json
import io


def preprocess_text(text):
    # Replace newline characters with spaces
    return text.replace('\n', ' ')


def generate_pdf(request):
    if request.method == 'POST':
        content_data = json.loads(request.body.decode('utf-8'))
        table_data = content_data['tableData']

        # Create a response with PDF content
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'inline; filename="generated_pdf.pdf"'

        # Create a buffer to hold PDF data
        buffer = io.BytesIO()

        # Create a PDF document
        doc = SimpleDocTemplate(buffer, pagesize=portrait(A4))
        elements = []

        col_widths = [40, 100, 50, 300, 50, 60]  # Adjust as needed
        table = Table(table_data, colWidths=col_widths)

        # Define table header titles (hard-coded)
        table_header = ['Item No', 'Part number',
                        'Quantity', 'Description', 'Rate', 'Amount']

        # Add the table header to the table data
        table_data.insert(0, table_header)

        # Create a table from the table data
        table = Table(table_data)

        # Apply styles to the table
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.grey),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (2, -1), 'CENTER'),
            ('ALIGN', (-2, 0), (-1, -1), 'RIGHT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 10),
            ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),

        ]))

        elements.append(table)

        # Build the PDF document
        doc.build(elements)

        # Get the value of the buffer and return it in the response
        pdf_data = buffer.getvalue()
        buffer.close()
        response.write(pdf_data)
        return response
