import type { ChoicesType } from "./ChoicesType";

export type QuestionType = {
  total: number;
  questions: QuestionsType[];
};

export type QuestionsType = {
  id: number;
  question: string;
  answers: number[];
  choices: ChoicesType[];
  description?: string;
  img?: string;
};
