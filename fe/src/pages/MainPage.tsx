import { useState } from "react";
import { HomeComponent } from "../components/mainpage/HomeComponent";
import { LoginComponent } from "../components/mainpage/LoginComponent";
import { DemoPage } from "../components/mainpage/DemoComponent";
import { QuizQuestionPage } from "../components/quiz/fivequestion/QuizQuestionPage";

export default function MainPage() {
  const [status, setStatus] = useState<"home" | "login" | "demo" | "quiz">(
    "home",
  );

  const handleLoginClick = () => {
    setStatus("login");
  };

  const handleHomeClick = () => {
    setStatus("home");
  };

  const handleDemoClick = () => {
    setStatus("demo");
  };

  const handleTestQuizClick = () => {
    setStatus("quiz");
  };

  return (
    <div
      className="
        relative
        min-h-screen
        w-full
        flex
        items-center
        justify-center
        px-4
        bg-gradient-to-b
        from-[#FFFFFF]
        to-[#0F0404]
        overflow-hidden
      "
    >
      {/* 🔥 SVG 배경 (화면에 맞게) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/Pattern.svg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* 🔥 가운데 카드 */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-[420px]
          sm:max-w-[480px]
          md:max-w-[540px]
          h-screen
          rounded-xl
          bg-[#040303]/30
          flex
        "
      >
        <div className="flex-1 flex flex-col  overflow-y-auto">
          {status === "home" && (
            <HomeComponent
              handleLoginClick={handleLoginClick}
              handleDemoClick={handleDemoClick}
            />
          )}
          {status === "login" && (
            <LoginComponent
              // handleLoginClick={handleLoginClick}
              handleHomeClick={handleHomeClick}
            />
          )}
          {status === "demo" && (
            <DemoPage
              handleHomeClick={handleHomeClick}
              handleTestQuizClick={handleTestQuizClick}
            />
          )}

          {status === "quiz" && (
            <QuizQuestionPage handleHomeClick={handleHomeClick} />
          )}
        </div>
      </div>
    </div>
  );
}
