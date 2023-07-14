from django.urls import path
from .views import *

urlpatterns = [
    path('worker/<int:id>/', WorkerIdView.as_view()),
    path('worker/', WorkerView.as_view()),
    path('template/', TemplateView.as_view()),
    path('template/<int:id>/', TemplateIdView.as_view()),
    path('department/', DepartmentView.as_view()),
]
