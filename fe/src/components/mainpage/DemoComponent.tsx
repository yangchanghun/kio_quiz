import { usePageTransition } from "../../hooks/usePageTransition";
import { pageTransitionClass } from "../../utils/pageTransitionClass";
type DemoPageProps = {
  onSelectQuiz?: (quizId: string) => void;
  handleHomeClick: () => void;
  handleTestQuizClick: () => void;
};

const quizList = [
  { id: "traffic", title: "교통안전교육아아아아아아" },
  { id: "crime", title: "범죄예방교육테스트" },
  { id: "memory", title: "기억력향상" },
  { id: "health", title: "건강관리" },
  { id: "stress", title: "스트레스관리" },
  { id: "privacy", title: "개인정보보호" },
  { id: "fire", title: "화재안전" },
  { id: "firstaid", title: "응급처치" },
  { id: "traffic2", title: "보행안전" },
  { id: "cognitive", title: "인지훈련" },
  { id: "art", title: "미술퀴즈" },
  { id: "ox", title: "OX 퀴즈" },
];

export const DemoPage = ({
  handleHomeClick,
  handleTestQuizClick,
}: DemoPageProps) => {
  const { phase, leave } = usePageTransition(300);

  return (
    <div
      className={`flex-1 flex flex-col items-center px-6 py-6 text-white ${pageTransitionClass(
        phase
      )} transition-all duration-500 ease-in-out`}
    >
      {/* 타이틀 */}
      <button
        onClick={() => leave(handleHomeClick)}
        className="
          absolute top-4 left-4
          text-2xl font-bold
          text-white/80
          hover:text-white
          transition-colors
        "
        aria-label="뒤로가기"
      >
        &lt;
      </button>
      <h1 className="text-2xl font-bold mb-6 tracking-widest">KIO QUIZ</h1>

      {/* 퀴즈 그리드 */}
      <div
        className="
    w-full
    grid
    [grid-template-columns:repeat(auto-fit,minmax(120px,1fr))]
    gap-4
  "
      >
        {quizList.map((quiz) => (
          <button
            key={quiz.id}
            onClick={() => handleTestQuizClick()}
            className="
              flex flex-col items-center justify-center
              aspect-square
              rounded-lg
              bg-white
              text-black
              shadow-md
              active:scale-95
              transition-transform
            "
          >
            {/* 아이콘 */}
            <div className="w-20 h-20 mb-2  bg-gray-200 flex items-center justify-center">
              IMG
            </div>

            {/* 제목 */}
            <span
              className={`${
                quiz.title.length > 9 ? "text-xs" : "text-m"
              } font-bold text-center`}
            >
              {quiz.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
