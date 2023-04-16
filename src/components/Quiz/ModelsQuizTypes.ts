export type Option = {
  id: number;
  text: string;
  isCorrect: boolean;
};
export type Question = {
  text: string;
  options: Option[];
};

export type QuestionesData = {
  questiones: Question[];
};
