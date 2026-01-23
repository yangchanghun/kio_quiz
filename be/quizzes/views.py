import json
from rest_framework import generics, permissions
from .models import Quiz
from .serializers import QuizListSerializer, QuizDetailSerializer,QuizCreateSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Quiz, Question, Choice
from django.shortcuts import get_object_or_404
class QuizListView(generics.ListAPIView):
    serializer_class = QuizListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Quiz.objects.filter(owner=self.request.user).order_by("-created_at")


class QuizDetailView(generics.RetrieveAPIView):
    serializer_class = QuizDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Quiz.objects.filter(owner=self.request.user)




class QuizCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            # 🔹 기본 필드
            quiz_type = request.data.get("type")
            title = request.data.get("title")

            if not quiz_type or not title:
                return Response(
                    {"detail": "type, title은 필수입니다."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # 🔹 questions JSON 파싱
            questions_raw = request.data.get("questions")
            if not questions_raw:
                return Response(
                    {"detail": "questions가 필요합니다."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            questions = json.loads(questions_raw)

            # 🔹 Quiz 생성
            quiz = Quiz.objects.create(
                owner=request.user,
                type=quiz_type,
                title=title,
                thumbnail=request.FILES.get("thumbnail"),
            )

            # 🔹 Question / Choice 생성
            for qi, q in enumerate(questions):
                question = Question.objects.create(
                    quiz=quiz,
                    order=qi + 1,
                    question=q["question"],
                    description=q.get("description", ""),
                    answers=q.get("answers", []),
                    image=request.FILES.get(f"question_images[{qi}]"),
                )

                for ci, c in enumerate(q["choices"]):
                    Choice.objects.create(
                        question=question,
                        order=ci + 1,
                        label=c["label"],
                        image=request.FILES.get(f"choice_images[{qi}][{ci}]"),
                    )

            return Response(
                {"id": quiz.id, "message": "퀴즈 생성 완료"},
                status=status.HTTP_201_CREATED,
            )

        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )


class QuizUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, pk):
        quiz = get_object_or_404(Quiz, pk=pk, owner=request.user)

        # 🔹 기본 필드
        quiz.title = request.data.get("title", quiz.title)
        quiz.type = request.data.get("type", quiz.type)

        if "thumbnail" in request.FILES:
            quiz.thumbnail = request.FILES["thumbnail"]

        quiz.save()

        # 🔹 questions JSON
        questions_data = json.loads(request.data.get("questions", "[]"))

        for qi, q_data in enumerate(questions_data):
            question = get_object_or_404(
                Question,
                pk=q_data["id"],
                quiz=quiz,
            )

            question.question = q_data["question"]
            question.description = q_data.get("description", "")
            question.answers = q_data["answers"]

            # 질문 이미지
            img_key = f"question_images[{qi}]"
            if img_key in request.FILES:
                question.image = request.FILES[img_key]

            question.save()

            # 🔹 choices
            for ci, c_data in enumerate(q_data["choices"]):
                choice = get_object_or_404(
                    Choice,
                    pk=c_data["id"],
                    question=question,
                )

                choice.label = c_data["label"]

                img_key = f"choice_images[{qi}][{ci}]"
                if img_key in request.FILES:
                    choice.image = request.FILES[img_key]

                choice.save()

        return Response(
            {"detail": "퀴즈 수정 완료"},
            status=status.HTTP_200_OK,
        )