import { Question } from "./ModelsQuizTypes";
import { useState } from "react";

export interface QuestionProps {
  question: Question;
  currentQuestion: number;
  lengthOfQuestions: number;
  setQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const QuestionCard = ({ question, currentQuestion, lengthOfQuestions, setQuestionIndex }: QuestionProps) => {
  const [showResults, setShowResults] = useState(false);
  // const [currentQuestions, setCurrentQuestions] = useState(0);
  const [score, setScore] = useState(0);

  const optionClicked = (isCorrect: boolean) => {
    // Increment the score
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
      {/* 2. Current Score  */}
      <h2>Score: {score}</h2>

      {/* 3. Show results or show the question game  */}
      {showResults ? (
        /* 4. Final Results */
        <div className="final-results">
          <h1>Final Results</h1>
          <h2>
            {score} out of {lengthOfQuestions} correct ({quizResult()}%)
          </h2>
          <button onClick={() => restartGame()}>Restart game</button>
        </div>
      ) : (
        <div className="question-card">
          {/* Current Question  */}
          <h2>
            {/*/ Question position */}
            Question: {currentQuestion} out of {lengthOfQuestions}
          </h2>
          <h3>{question.text}</h3>
          {/* List of possible answers  */}
          <ul>
            {question.options.map((option) => {
              return (
                <li key={option.id} onClick={() => optionClicked(option.isCorrect)}>
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
