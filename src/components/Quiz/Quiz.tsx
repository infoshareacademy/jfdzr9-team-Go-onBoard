import { useEffect, useState } from "react";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";
import { EtapIdProps, QuestionesData, Question, Option } from "./ModelsQuizTypes";
import { QuestionCard, QuestionProps } from "./QuizQuestion";

export const Quiz = ({ etapIdForQuiz }: EtapIdProps) => {
  const { etap_id } = etapIdForQuiz;
  const [quizIndex, setQuizIndex] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const quizes = useFirebaseFetch<QuestionesData>("quiz");
  const currentQuiz = quizes.find((quizByEtapId) => quizByEtapId.etap_id === quizIndex);
  console.log("Obecny Quiz", currentQuiz);

  useEffect(() => {
    setQuizIndex(etap_id);
  }, [etapIdForQuiz]);

  if (!currentQuiz) {
    return <span>Brak Quizu</span>;
  }

  const currentQuestion = currentQuiz.questiones[questionIndex];
  const currentOption = currentQuestion.options;
  // console.log("Obecna Opcja", currentOption);
  console.log("Obecne Pytanie", currentQuestion.options);

  if (!currentQuestion) {
    return <span>Brak pytania</span>;
  }
  return (
    <div>
      <h1>Quiz</h1>
      <QuestionCard currentQuestion={questionIndex} question={currentQuestion} lengthOfQuestions={currentQuiz.questiones.length} setQuestionIndex={setQuestionIndex} />
    </div>
  );
};
