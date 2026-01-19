import type { ChoicesType } from "@/types/ChoicesType";
import type { QuestionsType } from "@/types/QuesionsType";

export const questions: QuestionsType[] = [
  {
    id: 1,
    question: "다음 중 채소가 아닌 것은?",
    answers: ["바퀴벌레"],
    description: "바퀴벌레는 곤충류로 채소에 속하지 않습니다.",
  },
  {
    id: 2,
    question: "다음 중 채소가 아닌 것은?",
    answers: ["바퀴벌레"],
    description: "바퀴벌레는 곤충류로 채소에 속하지 않습니다.",
  },
];

export const choices: ChoicesType[] = [
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
