from django.urls import path
from .views import QuizListView, QuizDetailView, QuizCreateView,QuizUpdateView

urlpatterns = [
    path("", QuizListView.as_view()),          # GET
    path("create/", QuizCreateView.as_view()), # POST
    path("<int:pk>/", QuizDetailView.as_view()),
    path("<int:pk>/update/", QuizUpdateView.as_view()),
    
]
