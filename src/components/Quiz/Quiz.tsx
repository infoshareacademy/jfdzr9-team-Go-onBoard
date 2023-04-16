import { useState } from "react";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";
import { QuestionesData } from "./ModelsQuizTypes";
import { QuestionCard } from "./QuizQuestion";

export const Quiz = () => {
  const [quizIndex, setQuizIndex] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const quizes = useFirebaseFetch<QuestionesData>("quiz");
  const currentQuiz = quizes[quizIndex];

  if (!currentQuiz) {
    return <span>Brak Quizu</span>;
  }
  console.log(currentQuiz, quizes);
  const currentQuestion = currentQuiz.questiones[questionIndex];

  if (!currentQuestion) {
    return <span>Brak pytania</span>;
  }
  return (
    <div>
      <h1>Quiz</h1>
      <QuestionCard currentQuestion={questionIndex + 1} question={currentQuestion} lengthOfQuestions={currentQuiz.questiones.length} />
    </div>
  );
};
