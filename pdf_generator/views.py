from django.shortcuts import render, redirect
from .models import HTMLContent
from .forms import HTMLContentForm
from django.http import JsonResponse

def save_html(request):
    if request.method == 'POST':
        form = HTMLContentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('html_list')
    else:
        form = HTMLContentForm()

    return render(request, 'save_html.html', {'form': form})

def html_list(request):
    html_contents = HTMLContent.objects.all()
    return render(request, 'html_list.html', {'html_contents': html_contents})



def save_html_view(request):
    if request.method == 'POST':
        captured_html = request.POST.get('captured_html', '')

        # TODO: Save the captured HTML to your database or file

        return JsonResponse({'message': 'HTML structure saved successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})
