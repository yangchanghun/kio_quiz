from django.db import models

from config import settings

# Create your models here.
class Quiz(models.Model):
    QUIZ_TYPE_CHOICES = (
        ("ox", "OX"),
        ("multiple", "Multiple Choice"),
        ("memory", "Memory"),
    )

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="quizzes",
    )

    type = models.CharField(
        max_length=20,
        choices=QUIZ_TYPE_CHOICES,
    )

    title = models.CharField(max_length=255)

    thumbnail = models.ImageField(
        upload_to="quiz/thumbnails/",
        blank=True,
        null=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Question(models.Model):
    quiz = models.ForeignKey(
        Quiz,
        on_delete=models.CASCADE,
        related_name="questions",
    )

    order = models.PositiveIntegerField()
    question = models.TextField()

    description = models.TextField(blank=True)

    image = models.ImageField(
        upload_to="quiz/questions/",
        blank=True,
        null=True,
    )

    # answers: [1, 3] 같은 구조
    answers = models.JSONField(default=list)

    def __str__(self):
        return f"{self.quiz.title} - Q{self.order}"
class Choice(models.Model):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="choices",
    )

    order = models.PositiveIntegerField()
    label = models.CharField(max_length=255)

    image = models.ImageField(
        upload_to="quiz/choices/",
        blank=True,
        null=True,
    )

    def __str__(self):
        return f"Q{self.question.order} - Choice {self.order}"
