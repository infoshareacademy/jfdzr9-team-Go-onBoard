import { Question } from "./ModelsQuizTypes";

interface QuestionProps {
  question: Question;
  currentQuestion: number;
  lengthOfQuestions: number;
}

export const QuestionCard = ({ question, currentQuestion, lengthOfQuestions }: QuestionProps) => {
  return (
    <div className="question-card">
      {/* Current Question  */}
      <h2>
        {/*/ Question position */}
        Question: {currentQuestion} out of {lengthOfQuestions}
      </h2>
      <h3>{question.text}</h3>
      {/* <h3 className="question-text">{questions[currentQuestion].text}</h3> */}

      {/* List of possible answers  */}
      {/* <ul>
    {options.map((option) => {
      return (
        <li key={option.id} onClick={() => optionClicked(option.isCorrect)}>
          {option.text}
        </li>
      );
    })}
  </ul> */}
    </div>
  );
};
