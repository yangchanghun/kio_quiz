import { usePageTransition } from "@/hooks/usePageTransition";
import { pageTransitionClass } from "@/utils/pageTransitionClass";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { useQuizList } from "@/hooks/useQuizList";
import { useRef } from "react";
import PigCharacter from "@/miryangspecial/pig_cog_game/PigCharacter";

type Quiz = {
  id: number;
  title: string;
  thumbnail: string;
};

type MiryangQuiz = {
  id: number;
  title: string;
  thumbnail: string;
  domain: string;
};

export const MainQuizListPage = () => {
  const { phase, leave } = usePageTransition(300);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  // 🔥 React Query 데이터
  const { data: quizList, isLoading, isError } = useQuizList();

  const handleLogoutClick = () => {
    logout();
    leave(() => navigate("/"));
  };

  const handleTestQuizClick = (quizId: number) => {
    // console.log("선택한 퀴즈:", quizId);
    navigate(`/quiz/${quizId}`);
  };

  const miryangQuizList: MiryangQuiz[] = [
    {
      id: 123,
      title: "치매안내",
      thumbnail: "/miryang/olderguide.jpeg",
      domain: "/miryang/older/guide",
    },
    {
      id: 123,
      title: "치매 선별 설문지",
      thumbnail: "/miryang/alz.png",
      domain: "/miryang/alzhemier",
    },
    {
      id: 123,
      title: "인지교육",
      thumbnail: "/miryang/cog.png",
      domain: "/miryang/cognitive",
    },
    {
      id: 123,
      title: "우울증진단테스트",
      thumbnail: "/miryang/depression.png",
      domain: "/miryang/depression",
    },
    {
      id: 123,
      title: "스트레스진단테스트",
      thumbnail: "/miryang/stress.png",
      domain: "/miryang/stress",
    },
    {
      id: 123,
      title: "수면진단테스트",
      thumbnail: "/miryang/sleep.png",
      domain: "/miryang/sleep",
    },
    {
      id: 123,
      title: "기억력테스트",
      thumbnail: "/miryang/memory.png",
      domain: "/miryang/memorytest",
    },
  ];
  const clickCountRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <div
        className={`flex-1 flex flex-col items-center px-6 py-6 text-white ${pageTransitionClass(
          phase,
        )} transition-all duration-500 ease-in-out`}
      >
        {/* 상단 */}

        <p
          onClick={() => {
            clickCountRef.current += 1;

            // 타이머 리셋
            if (timerRef.current) {
              clearTimeout(timerRef.current);
            }

            // 1.5초 안에 5번 클릭
            timerRef.current = setTimeout(() => {
              clickCountRef.current = 0;
            }, 1500);

            if (clickCountRef.current >= 5) {
              clickCountRef.current = 0;
              navigate("/user/management");
            }
          }}
          className="mb-2 select-none cursor-pointer"
        >
          {user?.name}
        </p>
        <div
          role="button"
          onClick={handleLogoutClick}
          className="absolute top-4 left-4 text-sm text-white/80 hover:text-white"
        >
          로그아웃
        </div>

        <h1 className="text-2xl font-bold mb-6 tracking-widest">KIO QUIZ</h1>

        {/* 상태 분기 */}
        {isLoading && <div className="text-white/70">불러오는 중...</div>}

        {isError && (
          <div className="text-red-400">퀴즈 목록을 불러오지 못했습니다.</div>
        )}

        {/* 퀴즈 리스트 */}
        {!isLoading && quizList?.length === 0 && (
          <div className="text-white/70">퀴즈가 없습니다.</div>
        )}

        <div
          className="
            w-full
            grid
            [grid-template-columns:repeat(auto-fit,minmax(120px,1fr))]
            gap-4
          "
        >
          <button
            onClick={() => {
              navigate("/miryang/pigcoggame");
            }}
            className="
           w-[130px]
          h-[140px]
          bg-white
          rounded-2xl
          shadow-lg
          flex
          flex-col
          items-center
          justify-between
          p-3
          active:scale-95
          transition-transform
          mb-4
          mr-4

          "
          >
            <PigCharacter size={120} />
            <span className="text-xs font-semibold text-black text-center">
              길찾기인지향상게임
            </span>
          </button>
          {user?.name === "밀양시청" &&
            miryangQuizList.map((quiz) => (
              <button
                key={quiz.id}
                onClick={() => navigate(quiz.domain)}
                className="
          w-[130px]
          h-[140px]
          bg-white
          rounded-2xl
          shadow-lg
          flex
          flex-col
          items-center
          justify-between
          p-3
          active:scale-95
          transition-transform
          mb-4
          mr-4"
              >
                <div
                  className="                             
                  w-full
                h-[100px]
                bg-gray-200
                rounded-xl
                flex
                items-center
                justify-center
                text-gray-500
                text-sm
                font-semibold
                overflow-hidden"
                >
                  <img
                    src={quiz.thumbnail}
                    alt={quiz.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {quiz.title.length >= 9 ? (
                  <span className="text-xs font-semibold text-black text-center">
                    {quiz.title}
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-black text-center">
                    {quiz.title}
                  </span>
                )}
                {/* <span className="text-sm font-semibold text-black text-center">
                  {quiz.title}
                </span> */}
              </button>
            ))}
          {quizList?.map((quiz: Quiz) => (
            <button
              key={quiz.id}
              onClick={() => handleTestQuizClick(quiz.id)}
              className="
          w-[130px]
          h-[140px]
          bg-white
          rounded-2xl
          shadow-lg
          flex
          flex-col
          items-center
          justify-between
          p-3
          active:scale-95
          transition-transform
          mb-4
          mr-4"
            >
              <div
                className="
                             w-full
             h-[100px]
             bg-gray-200
             rounded-xl
             flex
             items-center
             justify-center
             text-gray-500
             text-sm
             font-semibold
             overflow-hidden
              "
              >
                <img
                  className="w-full h-full object-cover"
                  src={quiz.thumbnail}
                  alt="Thumbnail"
                />
              </div>

              <span
                className={`${
                  quiz.title.length > 9 ? "text-xs" : "text-sm"
                } text-black font-semibold text-sm mt-2 text-center leading-tight`}
              >
                {quiz.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
