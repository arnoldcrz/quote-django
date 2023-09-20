import json
import io
from django.http import HttpResponse
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from django.shortcuts import render


def quote(request):
    return render(request, 'pdf_generator/quote_table.html')


def home(request):
    return render(request, 'pdf_generator/home_page.html')


def generate_pdf(request):
    if request.method == 'POST':
        content_data = json.loads(request.body.decode('utf-8'))
        content_to_print = content_data['contentToPrint']

        # Generate the PDF with content_to_print
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'inline; filename="generated_pdf.pdf"'

        buffer = io.BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        p.drawString(100, 750, "Generated PDF Content:")
        # Include the content_to_print in the PDF
        p.drawString(100, 700, content_to_print)
        p.showPage()
        p.save()

        buffer.seek(0)
        response.write(buffer.read())
        buffer.close()
        return response
