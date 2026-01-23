// src/components/updator/UpdatorQuizFormPanel.tsx

import type { QuestionsType } from "@/types/QuesionsType";
import { useUpdateQuiz } from "@/hooks/useUpdateQuiz";

type Props = {
  quizId: number;
  quiztitle: string;
  setQuizTitle: (title: string) => void;
  thumbnailFile: File | null;
  questions: QuestionsType[];
  setQuestions: React.Dispatch<React.SetStateAction<QuestionsType[]>>;
};

export default function UpdatorQuizFormPanel({
  quizId,
  quiztitle,
  setQuizTitle,
  thumbnailFile,
  questions,
  setQuestions,
}: Props) {
  const { mutate: updateQuiz, isPending } = useUpdateQuiz(quizId);
  console.log(quizId);
  /* ================= 문제 개수 ================= */
  const handleQuestionCountChange = (count: number) => {
    setQuestions((prev) => {
      const next = [...prev];

      while (next.length < count) {
        next.push({
          id: Date.now(),
          question: "",
          description: "",
          image: undefined,
          imageFile: undefined,
          answers: [],
          choices: Array.from({ length: 5 }).map((_, i) => ({
            id: Date.now() + i,
            label: "",
            image: undefined,
            imageFile: undefined,
            imagePreview: undefined,
            order: i + 1,
          })),
        });
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
    formData.append("type", "multiple");

    // 🔹 질문 JSON
    formData.append(
      "questions",
      JSON.stringify(
        questions.map((q, qi) => ({
          id: q.id,
          order: qi + 1,
          question: q.question,
          description: q.description,
          answers: q.answers, // order 기준
          choices: q.choices.map((c) => ({
            id: c.id,
            label: c.label,
            order: c.order,
          })),
        })),
      ),
    );

    // 🔹 이미지
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

    updateQuiz(formData, {
      onSuccess: () => alert("퀴즈 수정 완료 ✅"),
      onError: () => alert("퀴즈 수정 실패 ❌"),
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
          value={quiztitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          className="border rounded px-3 py-2 col-span-2"
          placeholder="퀴즈 제목"
        />
      </div>

      {/* 문제 리스트 */}
      {questions.map((q, qIndex) => (
        <div key={q.id} className="border rounded-lg p-4 bg-gray-50 space-y-4">
          <h3 className="font-semibold">문제 {qIndex + 1}</h3>

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
            placeholder="질문"
          />
          {/* 질문 이미지 업로드 */}
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
                        image: URL.createObjectURL(file), // 👈 미리보기
                      }
                    : item,
                ),
              );
            }}
          />

          {/* 질문 이미지 미리보기 */}
          {q.image && (
            <img src={q.image} className="w-full h-40 object-cover rounded" />
          )}

          {/* 선택지 */}
          {q.choices.map((choice, cIndex) => (
            <div key={choice.id} className="flex items-center gap-3">
              <span>{cIndex + 1}</span>

              <input
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
              {/* 답 이미지 업로드 */}
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
                                      imagePreview: URL.createObjectURL(file),
                                    }
                                  : c,
                              ),
                            },
                      ),
                    );
                  }}
                />
                <div className="w-8 h-8 border rounded flex items-center justify-center">
                  📷
                </div>
              </label>

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
                              ? item.answers.filter((a) => a !== choice.id)
                              : [...item.answers, choice.id],
                          },
                    ),
                  )
                }
              />
              {choice.imagePreview && (
                <img
                  src={choice.imagePreview}
                  className="ml-8 mt-2 w-32 h-20 object-cover rounded"
                />
              )}
            </div>
          ))}
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

      <button
        onClick={handleSubmitQuiz}
        disabled={isPending}
        className="w-full py-3 bg-black text-white rounded-lg disabled:opacity-50"
      >
        {isPending ? "저장 중..." : "수정 저장"}
      </button>
    </div>
  );
}
