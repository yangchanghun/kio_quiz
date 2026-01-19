type AnswerModalProps = {
  setAnswerModal: (value: boolean) => void;
  isCorrect: boolean;
  explanation: string | undefined;
  handleNextQuestion: () => void;
  currentIndex: number;
  total: number;
};

export const AnswerModal = ({
  setAnswerModal,
  isCorrect,
  explanation,
  handleNextQuestion,
  currentIndex,
  total,
}: AnswerModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-[90%] max-w-sm rounded-2xl bg-white/95 shadow-2xl p-6 animate-fadeInScale">
        <div
          className={`text-xl font-bold text-center mb-3 ${
            isCorrect ? "text-[#4CAF81]" : "text-[#E05A4F]"
          }`}
        >
          {isCorrect ? "정답입니다 🎉" : "오답입니다"}
        </div>

        {/* 선택한 답 */}
        {/* <div className="text-center text-gray-700 mb-4">
          선택한 답: <span className="font-semibold">{selectedLabel}</span>
        </div> */}

        {/* 해설 박스 */}
        <div className="bg-gray-100 rounded-xl p-4 text-ml text-gray-700 whitespace-pre-line leading-relaxed mb-6">
          {explanation}
        </div>

        {/* 버튼 */}
        <button
          onClick={() => {
            setAnswerModal(false);
            handleNextQuestion();
          }}
          className="w-full py-3 rounded-xl bg-[#6EA8C1] text-white font-semibold active:scale-95 transition"
        >
          {currentIndex === total - 1 ? "결과 보기" : "다음문제"}
        </button>
      </div>
    </div>
  );
};
