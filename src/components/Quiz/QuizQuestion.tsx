import { QuestionProps } from "./ModelsQuizTypes";
import { useState } from "react";
import { AnswersContainer } from "./Answers.Container.styled";
import { Answer } from "./Answers.styled";

export const QuestionCard = ({ question, currentQuestion, lengthOfQuestions, setQuestionIndex }: QuestionProps) => {
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const optionClicked = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < lengthOfQuestions) {
      setQuestionIndex(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const restartGame = () => {
    setScore(0);
    setQuestionIndex(0);
    setShowResults(false);
  };

  const quizResult = () => {
    const result = (score / question.options.length) * 100;
    return result;
  };

  return (
    <div>
      {/* Current Score  */}
      <h2>Punkty: {score}</h2>

      {/* Show results or show the question game  */}
      {showResults ? (
        <div className="final-results">
          <h1>Wynik końcowy</h1>
          <h2>
            {score} out of {lengthOfQuestions} correct ({quizResult()}%)
          </h2>
          <button onClick={() => restartGame()}>Wykonaj test od nowa</button>
        </div>
      ) : (
        <div className="question-card">
          <h2>
            {/*/ Question position */}
            Pytanie: {currentQuestion} z {lengthOfQuestions}
          </h2>
          <h3>{question.text}</h3>
          {/* List of possible answers  */}
          <AnswersContainer>
            {question.options.map((option) => {
              return (
                <Answer key={option.id} onClick={() => optionClicked(option.isCorrect)}>
                  {option.text}
                </Answer>
              );
            })}
          </AnswersContainer>
        </div>
      )}
    </div>
  );
};
