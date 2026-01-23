import { useState } from "react";
import type { QuestionsType } from "@/types/QuesionsType";
import type { ChoicesType } from "@/types/ChoicesType";
import { useCreateQuiz } from "@/hooks/useCreateQuiz";
type QuizFormPanelProps = {
  thumbnailFile: File | null;
  quiztitle: string;
  setQuizTitle: (title: string) => void;
};

/* ================= 헬퍼 ================= */
const createEmptyChoices = (): ChoicesType[] =>
  Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    label: "",
    imageFile: undefined,
    imagePreview: undefined,
  }));

const createEmptyQuestion = (id: number): QuestionsType => ({
  id,
  question: "",
  answers: [],
  choices: createEmptyChoices(),
  description: "",
  image: undefined,
  imageFile: undefined,
});

export default function QuizFormPanel({
  thumbnailFile,
  quiztitle,
  setQuizTitle,
}: QuizFormPanelProps) {
  // const [quizType, setQuizType] = useState<"ox" | "multiple" | "memory">(
  //   "multiple"
  // );

  const { mutate: createQuiz, isPending } = useCreateQuiz();

  /* ================= state ================= */
  const [questions, setQuestions] = useState<QuestionsType[]>([
    createEmptyQuestion(1),
  ]);

  /* ================= 문제 개수 ================= */
  const handleQuestionCountChange = (count: number) => {
    setQuestions((prev) => {
      const next = [...prev];

      while (next.length < count) {
        next.push(createEmptyQuestion(next.length + 1));
      }

      return next.slice(0, count);
    });
  };

  /* ================= 저장 ================= */
  const handleSubmitQuiz = () => {
    const invalidIndex = questions.findIndex((q) => q.answers.length === 0);
    if (invalidIndex !== -1) {
      alert(`문제 ${invalidIndex + 1}번에 정답을 선택해주세요.`);
      return;
    }

    const formData = new FormData();
    formData.append("title", quiztitle);
    formData.append("type", "multiple"); // 🔥 필수

    // JSON (이미지 제외)
    formData.append(
      "questions",
      JSON.stringify(
        questions.map((q) => ({
          question: q.question,
          answers: q.answers,
          description: q.description,
          choices: q.choices.map((c) => ({
            label: c.label,
          })),
        })),
      ),
    );

    // 질문 이미지
    questions.forEach((q, qi) => {
      if (q.imageFile) {
        formData.append(`question_images[${qi}]`, q.imageFile);
      }

      q.choices.forEach((c, ci) => {
        if (c.imageFile) {
          formData.append(`choice_images[${qi}][${ci}]`, c.imageFile);
        }
      });
    });

    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }

    createQuiz(formData, {
      onSuccess: () => {
        alert("퀴즈 생성 완료 🎉");
      },
      onError: () => {
        alert("퀴즈 생성 실패 😢");
      },
    });
  };

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      {/* 상단 설정 */}
      <div className="grid grid-cols-2 gap-4">
        <select
          value={questions.length}
          onChange={(e) => handleQuestionCountChange(Number(e.target.value))}
          className="border rounded px-3 py-2"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}문제
            </option>
          ))}
        </select>

        <input
          placeholder="제목 : 기억력테스트"
          className="border rounded px-3 py-2 col-span-2"
          value={quiztitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />
      </div>

      {/* 문제 리스트 */}
      <div className="space-y-8">
        {questions.map((q, qIndex) => (
          <div
            key={q.id}
            className="border rounded-lg p-4 space-y-4 bg-gray-50"
          >
            <h3 className="font-semibold">문제 {qIndex + 1}</h3>

            {/* 질문 */}
            <input
              value={q.question}
              onChange={(e) =>
                setQuestions((prev) =>
                  prev.map((item, i) =>
                    i === qIndex ? { ...item, question: e.target.value } : item,
                  ),
                )
              }
              className="border rounded px-3 py-2 w-full"
              placeholder={`질문 ${qIndex + 1}`}
            />

            {/* 질문 이미지 */}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                setQuestions((prev) =>
                  prev.map((item, i) =>
                    i === qIndex
                      ? {
                          ...item,
                          imageFile: file,
                          image: URL.createObjectURL(file),
                        }
                      : item,
                  ),
                );
              }}
            />

            {q.image && (
              <img src={q.image} className="w-full h-40 object-cover rounded" />
            )}

            {/* 보기 */}
            <div className="space-y-3">
              {q.choices.map((choice, cIndex) => (
                <div key={choice.id}>
                  <div className="flex items-center gap-3">
                    <span className="w-8">{cIndex + 1}번</span>

                    <input
                      placeholder={`${cIndex + 1 > 2 ? "(선택)" : "(필수)"} 답변 답이면 옆에 체크 `}
                      value={choice.label}
                      onChange={(e) =>
                        setQuestions((prev) =>
                          prev.map((item, i) =>
                            i !== qIndex
                              ? item
                              : {
                                  ...item,
                                  choices: item.choices.map((c, ci) =>
                                    ci === cIndex
                                      ? { ...c, label: e.target.value }
                                      : c,
                                  ),
                                },
                          ),
                        )
                      }
                      className="border px-2 py-1 flex-1 rounded"
                    />

                    {/* 답 이미지 */}
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          setQuestions((prev) =>
                            prev.map((item, i) =>
                              i !== qIndex
                                ? item
                                : {
                                    ...item,
                                    choices: item.choices.map((c, ci) =>
                                      ci === cIndex
                                        ? {
                                            ...c,
                                            imageFile: file,
                                            imagePreview:
                                              URL.createObjectURL(file),
                                          }
                                        : c,
                                    ),
                                  },
                            ),
                          );
                        }}
                      />
                      <div className="w-10 h-10 border rounded flex items-center justify-center">
                        📷
                      </div>
                    </label>

                    {/* 정답 */}
                    <input
                      type="checkbox"
                      checked={q.answers.includes(choice.id)}
                      onChange={() =>
                        setQuestions((prev) =>
                          prev.map((item, i) =>
                            i !== qIndex
                              ? item
                              : {
                                  ...item,
                                  answers: item.answers.includes(choice.id)
                                    ? item.answers.filter(
                                        (a) => a !== choice.id,
                                      )
                                    : [...item.answers, choice.id],
                                },
                          ),
                        )
                      }
                    />
                  </div>

                  {choice.imagePreview && (
                    <img
                      src={choice.imagePreview}
                      className="ml-11 mt-2 w-32 h-20 object-cover rounded"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* 해설 */}
            <textarea
              value={q.description}
              onChange={(e) =>
                setQuestions((prev) =>
                  prev.map((item, i) =>
                    i === qIndex
                      ? { ...item, description: e.target.value }
                      : item,
                  ),
                )
              }
              className="border rounded px-3 py-2 w-full h-24"
              placeholder="해설"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmitQuiz}
        disabled={isPending}
        className="w-full py-3 bg-black text-white rounded-lg disabled:opacity-50"
      >
        {isPending ? "저장 중..." : "저장"}
      </button>
    </div>
  );
}
