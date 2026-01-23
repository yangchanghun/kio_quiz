import CommonComponent from "./QuizPreview/CommonComponent";
import { QuizCardComponent } from "./QuizPreview/QuizCardComponent";

export default function QuizPreviewPanel({
  quiztitle,
  setThumbnailFile,
}: {
  quiztitle: string;
  setThumbnailFile: (file: File | null) => void;
}) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 h-full flex flex-col gap-6">
      {/* 🔹 상단 컨트롤 영역 */}
      <div
        className="
          w-full
          flex
          flex-col
          sm:flex-row
          gap-4
          sm:gap-8
          items-start
          justify-between
        "
      >
        <CommonComponent />
        <QuizCardComponent
          setThumbnailFile={setThumbnailFile}
          quiztitle={quiztitle}
        />
      </div>

      {/* 🔹 미리보기 영역 */}
      <div className="flex-1 flex justify-center">
        <div
          className="
            w-full
            max-w-[420px]
            bg-gradient-to-b
            from-[#4f6d7a]
            to-[#1f2f36]
            rounded-2xl
            p-6
            text-white
            flex
            flex-col
            shadow-xl
          "
        >
          {/* 문제 번호 */}
          <div className="mb-3 text-center">
            <span className="px-4 py-1 text-sm rounded-full border border-white/50">
              문제 1 / 5
            </span>
          </div>

          {/* ProgressBar 더미 */}
          <div className="w-full h-2 bg-white/20 rounded-full mb-6 overflow-hidden">
            <div className="h-full w-1/3 bg-[#6EA8C1]" />
          </div>

          {/* 질문 카드 */}
          <div className="w-full bg-white text-black rounded-xl px-4 py-5 mb-6 shadow-md text-center font-semibold">
            {"질문 1"}
          </div>

          {/* 문제 이미지 */}
          <div className="w-full h-40 bg-gray-300 rounded-xl mb-6 flex items-center justify-center text-gray-600 font-semibold">
            질문 1 이미지 (필수X)
          </div>

          {/* 선택지 */}
          <div className="w-full grid grid-cols-2 gap-4 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="
                  rounded-xl
                  bg-white
                  text-black
                  py-4
                  text-center
                  font-semibold
                  shadow-md
                  opacity-90
                "
              >
                답{i + 1}
              </div>
            ))}
          </div>

          {/* 하단 버튼 */}
          <div className="mt-auto flex gap-4">
            <div className="flex-1 py-4 rounded-xl border border-white/40 text-center opacity-60">
              이전 문제
            </div>
            <div className="flex-1 py-4 rounded-xl bg-[#6EA8C1] text-center font-semibold opacity-80">
              다음 문제
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
