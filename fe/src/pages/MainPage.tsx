import { useState } from "react";
import { HomeComponent } from "../components/mainpage/HomeComponent";
import { LoginComponent } from "../components/mainpage/LoginComponent";
import { DemoPage } from "../components/mainpage/DemoComponent";
import { QuizQuestionPage } from "../components/quiz/fivequestion/QuizQuestionPage";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  if (user) {
    navigate("/quizlist");
  }

  return (
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
  );
}
