import django.shortcuts
from django.shortcuts import render, redirect
from django.conf import settings


def index(request):
    if settings.DEBUG:
        return redirect("http://localhost:3000", permanent=True)
    return render(request, 'index.html')
