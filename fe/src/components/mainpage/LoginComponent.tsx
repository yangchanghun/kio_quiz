import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginApi, registerApi } from "../../api/auth.api";
import { usePageTransition } from "../../hooks/usePageTransition";
import { pageTransitionClass } from "../../utils/pageTransitionClass";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
type LoginComponentProps = {
  handleHomeClick: () => void;
};

export const LoginComponent = ({ handleHomeClick }: LoginComponentProps) => {
  const { phase, leave } = usePageTransition(300);
  const navigate = useNavigate();
  // 🔹 상태
  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const loginStore = useAuthStore((state) => state.login);
  // 🔹 로그인
  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      loginStore({
        user: data.user,
        access: data.access,
        refresh: data.refresh,
      });
      leave(() => navigate("/quizlist"));
    },
    onError: () => {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    },
  });

  // 🔹 회원가입
  const registerMutation = useMutation({
    mutationFn: registerApi,
    onSuccess: () => {
      alert("회원가입 성공! 로그인해주세요.");
      setIsRegister(false);
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("회원가입 실패");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 🔥 엔터 눌러도 새로고침 방지

    if (isRegister) {
      registerMutation.mutate({
        phone,
        name,
        company,
        password1: password,
        password2,
      });
    } else {
      loginMutation.mutate({
        phone,
        password,
      });
    }
  };

  return (
    <div
      className={`
        relative flex-1 flex flex-col items-center justify-center px-6 text-white
        transition-all duration-500 ease-in-out
        ${pageTransitionClass(phase)}
      `}
    >
      {/* ← 뒤로가기 */}
      <div
        role="button"
        onClick={() => leave(handleHomeClick)}
        className="absolute top-4 left-4 text-2xl text-white/80"
      >
        &lt;
      </div>

      {/* 타이틀 */}
      <h1 className="text-2xl font-bold mb-8 tracking-widest">
        {isRegister ? "회원가입" : "로그인"}
      </h1>

      {/* 폼 */}
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <input
          placeholder="전화번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-white/10"
        />

        {isRegister && (
          <input
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-white/10"
          />
        )}

        {isRegister && (
          <input
            placeholder="회사명 (선택)"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-white/10"
          />
        )}

        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-md bg-white/10"
        />

        {isRegister && (
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            className="w-full px-4 py-3 rounded-md bg-white/10"
          />
        )}

        {/* 회원가입 토글 */}
        <p
          onClick={() => setIsRegister((prev) => !prev)}
          className="text-right text-sm text-white/70 cursor-pointer"
        >
          {isRegister ? "로그인으로 돌아가기" : "회원가입"}
        </p>

        {/* 🔥 submit 버튼 */}
        <button
          type="submit"
          className="w-full py-3 mt-2 rounded-md bg-[#576390]/40"
        >
          {isRegister ? "회원가입" : "로그인"}
        </button>
      </form>
    </div>
  );
};
