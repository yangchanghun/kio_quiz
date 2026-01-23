from rest_framework import serializers
from .models import Quiz, Question, Choice


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ("id", "order", "label", "image")


class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = (
            "id",
            "order",
            "question",
            "description",
            "image",
            "answers",
            "choices",
        )


class QuizListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = (
            "id",
            "type",
            "title",
            "thumbnail",
            "created_at",
        )


class QuizDetailSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = (
            "id",
            "type",
            "title",
            "thumbnail",
            "questions",
            "created_at",
        )



from rest_framework import serializers
from .models import Quiz, Question, Choice


class ChoiceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ("order", "label", "image")


class QuestionCreateSerializer(serializers.ModelSerializer):
    choices = ChoiceCreateSerializer(many=True)

    class Meta:
        model = Question
        fields = (
            "order",
            "question",
            "description",
            "image",
            "answers",
            "choices",
        )

    def create(self, validated_data):
        choices_data = validated_data.pop("choices")
        question = Question.objects.create(**validated_data)

        for choice in choices_data:
            Choice.objects.create(question=question, **choice)

        return question


class QuizCreateSerializer(serializers.ModelSerializer):
    questions = QuestionCreateSerializer(many=True)

    class Meta:
        model = Quiz
        fields = (
            "type",
            "title",
            "thumbnail",
            "questions",
        )

    def create(self, validated_data):
        questions_data = validated_data.pop("questions")
        user = self.context["request"].user

        quiz = Quiz.objects.create(
            owner=user,
            **validated_data
        )

        for q in questions_data:
            QuestionCreateSerializer().create({
                **q,
                "quiz": quiz,
            })

        return quiz
