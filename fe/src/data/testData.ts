// import type { ChoicesType } from "@/types/ChoicesType";
// import type { QuestionsType } from "@/types/QuesionsType";

// export const choices: ChoicesType[] = [
//   {
//     id: 1,
//     label: "바퀴벌레",
//     img: "/src/test",
//   },
//   {
//     id: 2,
//     label: "토마토",
//     img: "",
//   },
//   { id: 3, label: "브로콜리", img: "/src/test" },
//   { id: 4, label: "양상추", img: "" },
// ];

// export const questions: QuestionsType[] = [
//   {
//     id: 1,
//     question: "다음 중 채소가 아닌 것은?",
//     answers: ["2", "3"],
//     description: "바퀴벌레는 곤충류로 채소에 속하지 않습니다.",
//     choices: choices,
//   },
//   {
//     id: 2,
//     question: "다음 중 채소가 아닌 것은?",
//     answers: ["2", "3"],
//     description: "바퀴벌레는 곤충류로 채소에 속하지 않습니다.",
//     choices: choices,
//   },
// ];

// export const question = {
//   title: "채소맞추기 퀴즈",
//   questions: questions,
// };

import type { ChoicesType } from "@/types/ChoicesType";
import type { QuestionsType, QuestionType } from "@/types/QuesionsType";

/*
참고 ㄱㄱ
.children-traffic-image-slot {
  width: 100%;
  height: 200px;
  background: #e6f4ff;
  border-radius: 14px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.children-traffic-image-slot img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
*/

export const choices1: ChoicesType[] = [
  {
    id: 1,
    label:
      "바퀴벌레는 곤충류로 채소에 속하지 않습니다.바퀴벌레는 곤충류로 채소에 속하지 않습니다.",
    image: "1-1question.png",
  },
  { id: 2, label: "토마토" },
  { id: 3, label: "브로콜리", image: "tomato.png" },
  { id: 4, label: "양상추" },
];
export const choices2: ChoicesType[] = [
  { id: 1, label: "바퀴벌레" },
  { id: 2, label: "토마토" },
  { id: 3, label: "브로콜리" },
  { id: 4, label: "양상추" },
];
export const choices3: ChoicesType[] = [
  { id: 1, label: "예" },
  { id: 2, label: "아니오" },
];

export const questions: QuestionsType[] = [
  {
    id: 1,
    question: "다음 중 채소가 아닌 것은?",
    answers: [1, 2, 3],
    description: "바퀴벌레는 곤충류로 채소에 속하지 않습니다.",
    choices: choices1,
  },
  {
    id: 2,
    question: "다음 중 과일이 아닌 것은?",
    answers: [1],
    description: "바퀴벌레는 과일이 아니라 곤충입니다.",
    choices: choices2,
  },
  {
    id: 3,
    question: "해당 작품의 이름은 비너스의 탄생인가?",
    answers: [1],
    description: `
작품명: 비너스의 탄생

작가: 산드로 보티첼리 (Sandro Botticelli)

제작 시기: 약 1484~1486년

시대: 이탈리아 르네상스 초기

소장처: 이탈리아 피렌체, 우피치 미술관

설명: 로마 신화의 사랑과 미의 여신 비너스가 조개껍데기 위에 서서 바다에서 태어나는 순간을 묘사한 작품입니다.
`,
    choices: choices3,
    image: "venus.png",
  },
];

export const quizSet: QuestionType = {
  type: "multiple",
  title: "채소맞추기 퀴즈",
  questions: questions,
  img: "sumnail.png",
};
