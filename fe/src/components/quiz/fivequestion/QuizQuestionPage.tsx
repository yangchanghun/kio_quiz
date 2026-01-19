import { ProgressBar } from "../../common/ProgressBar";
import { useState } from "react";
import { type ChoicesType } from "@/types/ChoicesType";

const choices: ChoicesType[] = [
  {
    id: 1,
    label: "바퀴벌레",
    img: "/src/test",
  },
  {
    id: 2,
    label: "토마토",
    img: "",
  },
  { id: 3, label: "브로콜리", img: "/src/test" },
  { id: 4, label: "양상추", img: "" },
];

export const QuizQuestionPage = () => {
  const [current, setCurrent] = useState(1);

  return (
    <div className="flex-1 flex flex-col items-center px-6 py-6 text-white">
      {/* 문제 번호 */}
      <div className="mb-3">
        <span className="px-4 py-1 text-sm rounded-full border border-white/50">
          문제 {current}/10
        </span>
      </div>

      {/* 진행 바 */}
      {/* <div className="w-full h-2 bg-white/20 rounded-full mb-4 overflow-hidden">
        <div className="h-full w-[70%] bg-green-400 rounded-full" />
      </div> */}
      <ProgressBar current={current} total={10} />
      {/* 질문 카드 */}
      <div className="w-full bg-white text-black rounded-xl px-4 py-5 mb-6 shadow-md text-center font-semibold">
        다음 중 채소가 아닌 것은?
      </div>

      {/* 선택지 */}
      <div className="w-full grid grid-cols-2 gap-4">
        {choices.map((choice) => (
          <button
            key={choice.id}
            className="
              text-black
              rounded-xl
              shadow-lg shadow-black/20
              transition-all duration-200
              active:scale-95
              overflow-hidden
            "
          >
            {/* 이미지 영역 */}
            {choice.img && (
              <div className="h-28 bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                IMG
              </div>
            )}
            {/* 라벨 영역 */}
            {choice.img ? (
              <div className="py-3 font-semibold text-center bg-[#6EA8C1]/55 text-white rounded-b-xl">
                {choice.label}
              </div>
            ) : (
              <div className="py-3 font-semibold text-center bg-[#6EA8C1]/55 text-white rounded-xl">
                {choice.label}
              </div>
            )}
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          setCurrent(current - 1);
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          setCurrent(current + 1);
        }}
      >
        +
      </button>
    </div>
  );
};
