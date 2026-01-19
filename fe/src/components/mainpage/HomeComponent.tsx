import { usePageTransition } from "../../hooks/usePageTransition";
import { pageTransitionClass } from "../../utils/pageTransitionClass";
type HomeComponentProps = {
  handleLoginClick: () => void;
  handleDemoClick: () => void;
};

export const HomeComponent = ({
  handleLoginClick,
  handleDemoClick,
}: HomeComponentProps) => {
  const { phase, leave } = usePageTransition(300);

  return (
    <div
      className={`
        flex-1 flex flex-col items-center justify-center px-6 text-white
        transition-all duration-500 ease-in-out
        ${pageTransitionClass(phase)}
      `}
    >
      <div className="w-20 h-20 mb-6 rounded-full bg-gray-200 flex items-center justify-center">
        ICON
      </div>

      <h1 className="text-2xl font-bold mb-10 tracking-widest">KIO QUIZ</h1>

      <div className="w-full space-y-4">
        <button
          onClick={() => leave(handleLoginClick)}
          className="w-full py-4 bg-[#576390]/40 rounded-md"
        >
          로그인
        </button>

        <button
          onClick={() => leave(handleDemoClick)}
          className="w-full py-4 bg-[#576390]/40 rounded-md"
        >
          체험하기
        </button>
      </div>
    </div>
  );
};
