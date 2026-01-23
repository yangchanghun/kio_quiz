import { ProgressBar } from "@/components/common/ProgressBar";
import { useState } from "react";
import type { ChoicesType } from "@/types/ChoicesType";
import { ChoicesBoxText } from "@/components/common/ChoicesBoxText";
import { Toggle } from "@/components/common/Toggle";
import { AnswerModal } from "@/components/common/AnswerModal";
import { useQuizDetail } from "@/hooks/useQuizDetail";
import { usePageTransition } from "@/hooks/usePageTransition";
import { pageTransitionClass } from "@/utils/pageTransitionClass";

import { useParams, useNavigate } from "react-router-dom";
import { MainQuizResultPage } from "./MainQuizResultPage";

export const MainQuizDetailPage = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { phase, leave } = usePageTransition(300);

  // 🔥 Hook은 전부 최상단
  const { data, isLoading, isError } = useQuizDetail(Number(quizId));

  console.log(data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerPreview, setAnswerPreview] = useState(false);
  const [answerModal, setAnswerModal] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number[]>>({});

  // ✅ 로딩 / 에러는 여기서 바로 return
  if (isLoading) {
    return <div className="text-white">불러오는 중...</div>;
  }

  if (isError || !data) {
    return <div className="text-red-400">퀴즈를 불러오지 못했습니다.</div>;
  }

  // 🔥 여기부터 data 100% 보장
  const questions = data.questions;
  const total = questions.length;
  const currentQuestion = questions[currentIndex];
  const selectedIds = userAnswers[currentQuestion.id] ?? [];

  const handleSelectChoice = (choice: ChoicesType) => {
    const qId = currentQuestion.id;

    setUserAnswers((prev) => {
      const prevAnswers = prev[qId] ?? [];
      const nextAnswers = prevAnswers.includes(choice.id)
        ? prevAnswers.filter((id) => id !== choice.id)
        : [...prevAnswers, choice.id];

      return { ...prev, [qId]: nextAnswers };
    });
  };

  const selectedOrders = currentQuestion.choices
    .filter((choice: ChoicesType) => selectedIds.includes(choice.id))
    .map((choice: ChoicesType) => choice.order);

  const isQuestionCorrect =
    selectedOrders.length === currentQuestion.answers.length &&
    selectedOrders.every((order: ChoicesType) =>
      currentQuestion.answers.includes(order),
    );

  const goNext = () => {
    if (currentIndex === total - 1) {
      setShowResult(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleNextQuestion = () => {
    if (answerPreview) {
      setAnswerModal(true);
      return;
    }
    goNext();
  };

  if (showResult) {
    return (
      <MainQuizResultPage questions={questions} userAnswers={userAnswers} />
    );
  }

  return (
    <div
      className={`flex-1 flex flex-col items-center px-6 py-6 text-white ${pageTransitionClass(
        phase,
      )}transition-all duration-500 ease-in-out`}
    >
      {/* 뒤로가기 */}
      <div
        role="button"
        onClick={() => leave(() => navigate(-1))}
        className="    absolute top-4 left-4
    text-2xl font-bold
    text-white/80
    hover:text-white
    transition-colors
    select-none"
      >
        &lt;
      </div>

      <div className="mb-10">
        {/* <span className="px-4 py-1 text-sm rounded-full border border-white/50">
          문제 {currentIndex + 1}/{total}
        </span> */}
      </div>
      {/* 문제 번호 + 토글 */}
      <div className="w-full flex items-center justify-between mb-3">
        <span className="px-4 py-1 text-sm rounded-full border border-white/50">
          문제 {currentIndex + 1}/{total}
        </span>

        <Toggle checked={answerPreview} setChecked={setAnswerPreview} />
      </div>

      <ProgressBar current={currentIndex + 1} total={total} />

      {/* 질문 */}
      <div className="w-full bg-white text-black rounded-xl px-4 py-5 mb-6 text-center font-semibold">
        {currentQuestion.question}
      </div>

      {/* 질문 이미지 */}
      {currentQuestion.image && (
        <div className="w-full mb-6 rounded-xl overflow-hidden shadow-lg">
          <img
            src={currentQuestion.image}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* 선택지 */}
      <div className="w-full grid grid-cols-2 gap-4">
        {currentQuestion.choices
          .filter((choice: ChoicesType) => choice.label.trim() !== "")
          .map((choice: ChoicesType) => {
            const isSelected = selectedIds.includes(choice.id);

            return (
              <button
                key={choice.id}
                onClick={() => handleSelectChoice(choice)}
                className={`rounded-xl shadow-lg transition-all active:scale-95 overflow-hidden ${
                  isSelected ? "ring-4 ring-[#6EA8C1]" : "opacity-90"
                }`}
              >
                {choice.image && (
                  <div className="h-28">
                    <img
                      src={choice.image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {choice.image ? (
                  <div className="py-3 text-center font-semibold bg-[#6EA8C1]/70 text-white">
                    {choice.label}
                  </div>
                ) : (
                  <ChoicesBoxText label={choice.label} />
                )}
              </button>
            );
          })}
      </div>

      {/* 이전 / 다음 */}
      <div className="w-full flex gap-4 mt-auto pt-6">
        <button
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="flex-1 py-4 rounded-xl border border-white/40"
        >
          이전 문제
        </button>

        <button
          onClick={handleNextQuestion}
          disabled={selectedIds.length === 0}
          className="flex-1 py-4 rounded-xl bg-[#6EA8C1]"
        >
          {currentIndex === total - 1 ? "결과 보기" : "다음 문제"}
        </button>
      </div>

      {answerModal && (
        <AnswerModal
          currentIndex={currentIndex}
          total={total}
          isCorrect={isQuestionCorrect}
          explanation={currentQuestion.description}
          setAnswerModal={setAnswerModal}
          handleNextQuestion={goNext}
        />
      )}
    </div>
  );
};
