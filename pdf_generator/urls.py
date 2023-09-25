from django.urls import path
from . import views

urlpatterns = [
    path('save-html/', views.save_html, name='save_html'),
    path('save-html-view/', views.save_html, name='save_html_view'),
    path('html-list/', views.html_list, name='html_list'),
]
