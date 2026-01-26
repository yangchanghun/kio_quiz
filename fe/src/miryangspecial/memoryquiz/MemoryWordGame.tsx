import { useEffect, useState } from "react";
import "./MemoryWordGame.css";
import { useNavigate } from "react-router-dom";

/* ======================
   타입 정의
====================== */
type StepType = "start" | "show" | "quiz";
type ResultType = "correct" | "fail" | "allfail" | null;

/* ======================
   상수
====================== */
const WORD_POOL: string[] = [
  "달팽이",
  "토마토",
  "오렌지",
  "토끼",
  "비행기",
  "사슴벌레",
  "고래",
  "연필",
  "자동차",
  "바나나",
  "사과",
  "포도",
  "나비",
  "시계",
  "의자",
  "책",
  "강아지",
  "고양이",
  "비행선",
  "나무",
];

const TOTAL_QUESTIONS = 5;
const SHOW_COUNT = 5;

/* ======================
   유틸
====================== */
const shuffle = (arr: string[]): string[] =>
  [...arr].sort(() => Math.random() - 0.5);

export default function MemoryWordGame() {
  const navigate = useNavigate();

  /* ======================
     상태
  ====================== */
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [finished, setFinished] = useState<boolean>(false);
  const [step, setStep] = useState<StepType>("start");
  const [question, setQuestion] = useState<number>(1);
  const [index, setIndex] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const [chance, setChance] = useState<number>(2);

  const [shownWords, setShownWords] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [answer, setAnswer] = useState<string | null>(null);
  const [result, setResult] = useState<ResultType>(null);

  /* ======================
     문제 세팅
  ====================== */
  const setupQuestion = () => {
    const shuffled = shuffle(WORD_POOL);
    const showWords = shuffled.slice(0, SHOW_COUNT);
    const notShown = shuffled[SHOW_COUNT];

    setShownWords(showWords);
    setAnswer(notShown);
    setOptions(shuffle([...showWords.slice(0, SHOW_COUNT - 1), notShown]));

    setIndex(0);
    setChance(2);
    setResult(null);
    setStep("show");
  };

  useEffect(() => {
    if (step !== "start") {
      setupQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  const startGame = () => {
    setQuestion(1);
    setCorrectCount(0);
    setFinished(false);
    setupQuestion();
  };

  /* ======================
     단어 순차 표시
  ====================== */
  useEffect(() => {
    if (step !== "show") return;
    if (shownWords.length === 0) return;

    if (index >= shownWords.length) {
      setStep("quiz");
      return;
    }

    setVisible(true);

    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, 1000);

    const nextTimer = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [index, step, shownWords]);

  /* ======================
     선택 처리
  ====================== */
  const handleSelect = (word: string) => {
    if (result || !answer) return;

    if (word === answer) {
      setCorrectCount((prev) => prev + 1);
      setResult("correct");
    } else {
      if (chance > 1) {
        setChance((prev) => prev - 1);
        setResult("fail");
      } else {
        setChance(0);
        setResult("allfail");
      }
    }
  };

  /* ======================
     다시보기
  ====================== */
  const replayWords = () => {
    setIndex(0);
    setResult(null);
    setStep("show");
  };

  /* ======================
     다음 문제
  ====================== */
  const nextQuestion = () => {
    if (question >= TOTAL_QUESTIONS) {
      setFinished(true);
      return;
    }
    setQuestion((prev) => prev + 1);
  };

  /* ======================
     결과 화면
  ====================== */
  if (finished) {
    return (
      <div className="memoryword-container">
        <h2 className="memoryword-title">결과</h2>
        <p>총 {TOTAL_QUESTIONS}문제 중</p>
        <p>✅ 맞춘 문제: {correctCount}문제</p>
        <p>❌ 틀린 문제: {TOTAL_QUESTIONS - correctCount}문제</p>
      </div>
    );
  }

  /* ======================
     렌더링
  ====================== */
  return (
    <div className="memoryword-container">
      <h2 className="memoryword-title">
        기억력 테스트 ({question}/{TOTAL_QUESTIONS})
      </h2>

      <button
        onClick={() => navigate("/quizlist")}
        className="alzheimer-home-btn"
      >
        처음으로
      </button>

      {/* 시작 */}
      {step === "start" && (
        <div className="memoryword-start">
          <p className="memoryword-desc">
            단어가 하나씩 나타납니다.
            <br />
            <strong>보이지 않았던 단어</strong>를 골라주세요.
          </p>
          <button className="memoryword-start-btn" onClick={startGame}>
            시작하기
          </button>
        </div>
      )}

      {/* 단어 보여주기 */}
      {step === "show" && (
        <div className="memoryword-show">
          {visible && (
            <div className="memoryword-word">{shownWords[index]}</div>
          )}
        </div>
      )}

      {/* 퀴즈 */}
      {step === "quiz" && (
        <div className="memoryword-quiz">
          <div className="memoryword-options">
            {options.map((word) => (
              <button
                key={word}
                className="memoryword-option"
                onClick={() => handleSelect(word)}
              >
                {word}
              </button>
            ))}
          </div>

          {result && (
            <div className="memoryword-result">
              {result === "correct" && "✅ 정답입니다!"}
              {result === "fail" && `❌ 틀렸습니다 (남은 기회 ${chance})`}
              {result === "allfail" && "❌ 기회를 모두 사용했습니다"}

              <div className="memoryword-result-buttons">
                {result === "fail" && (
                  <button onClick={replayWords}>다시보기</button>
                )}
                <button onClick={nextQuestion}>
                  {question === TOTAL_QUESTIONS ? "결과보기" : "다음 문제"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
