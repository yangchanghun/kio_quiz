import { usePageTransition } from "../../hooks/usePageTransition";
import { pageTransitionClass } from "../../utils/pageTransitionClass";

type LoginComponentProps = {
  // handleLoginClick: () => void;
  handleHomeClick: () => void;
};

export const LoginComponent = ({
  // handleLoginClick,
  handleHomeClick,
}: LoginComponentProps) => {
  const { phase, leave } = usePageTransition(300);

  return (
    <div
      className={`
        relative
        flex-1 flex flex-col items-center justify-center px-6 text-white
        transition-all duration-500 ease-in-out
        ${pageTransitionClass(phase)}
      `}
    >
      {/* ← 뒤로가기 */}
      <div
        role="button"
        onClick={() => leave(handleHomeClick)}
        className="
    absolute top-4 left-4
    text-2xl font-bold
    text-white/80
    hover:text-white
    transition-colors
    select-none
  "
        aria-label="뒤로가기"
      >
        &lt;
      </div>
      {/* 아이콘 */}
      <div className="w-20 h-20 mb-6 rounded-full bg-white/20 flex items-center justify-center">
        LOGO
      </div>

      {/* 타이틀 */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-8 tracking-widest">
        KIO QUIZ
      </h1>

      {/* 로그인 폼 */}
      <div className="w-full space-y-4">
        <input
          type="text"
          placeholder="아이디"
          className="
            w-full px-4 py-3 rounded-md
            bg-white/10 placeholder-white/60
            focus:outline-none focus:ring-2 focus:ring-white/30
          "
        />

        <input
          type="password"
          placeholder="비밀번호"
          className="
            w-full px-4 py-3 rounded-md
            bg-white/10 placeholder-white/60
            focus:outline-none focus:ring-2 focus:ring-white/30
          "
        />

        <p className="text-right text-sm text-white/70 cursor-pointer">
          회원가입
        </p>

        <button
          // onClick={() => leave(handleLoginClick)}
          className="
            w-full py-3 mt-2 rounded-md
            bg-[#576390]/40 hover:bg-[#4a5170]
            transition-colors active:scale-[0.98]
          "
        >
          로그인
        </button>
      </div>
    </div>
  );
};
