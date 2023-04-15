import { useState, useEffect } from "react";
import { useFirebaseFetch } from "../components/hooks/useFirebaseFetch";

function Quiz() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  // const quizQuestions = useFirebaseFetch("quiz");
  // console.log(quizQuestions[0].questiones[0].options[1].text);

  // const { data: quizQuestions } = useFirebaseFetch("quiz");
  // const { questions } = quizQuestions;

  const questions = [
    {
      text: "Czym jest git?",
      options: [
        { id: 0, text: "Popularnym systemem operacyjnym", isCorrect: false },
        { id: 1, text: "Komunikatorem internetowym", isCorrect: false },
        { id: 2, text: "Systemem kontroli wersji", isCorrect: true },
        { id: 3, text: "Edytorem tekstu", isCorrect: false },
      ],
    },
    {
      text: "Jakie polecenie umożliwia przesłanie zmian z lokalnego repozytorium na zdalne?",
      options: [
        { id: 0, text: "git commit", isCorrect: false },
        { id: 1, text: "git pull", isCorrect: false },
        { id: 2, text: "git push", isCorrect: true },
        { id: 3, text: "git branch", isCorrect: false },
      ],
    },
    {
      text: "Jakie są główne korzyści z używania git?",
      options: [
        { id: 0, text: "Możliwość komunikowania się z innymi użytkownikami", isCorrect: false },
        { id: 1, text: "Zwiększenie wydajności procesu tworzenia oprogramowania", isCorrect: true },
        { id: 2, text: "Usprawnienie procesu administracyjnego", isCorrect: false },
        { id: 3, text: "Poprawienie wyglądu interfejsu użytkownika", isCorrect: false },
      ],
    },
    {
      text: "Co to jest gałąź (branch) w systemie git?",
      options: [
        { id: 0, text: "Fragment kodu źródłowego", isCorrect: false },
        { id: 1, text: "Inny termin na repozytorium zdalne", isCorrect: false },
        { id: 2, text: "Wersja oprogramowania, która została wydana", isCorrect: false },
        { id: 3, text: "Niezależna linia rozwoju kodu źródłowego", isCorrect: true },
      ],
    },
    {
      text: "Jakie polecenie pozwala na sprawdzenie historii zmian w repozytorium?",
      options: [
        { id: 0, text: "git log", isCorrect: true },
        { id: 1, text: "git status", isCorrect: false },
        { id: 2, text: "git diff", isCorrect: false },
        { id: 3, text: "git add", isCorrect: false },
      ],
    },
  ];

  /* A possible answer was clicked */
  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  /* function to check points and percentage of quiz*/

  const quizResult = () => {
    const result = (score / questions.length) * 100;
    return result;
  };

  return (
    <div className="App">
      {/* 1. Header  */}
      <h1>Quiz</h1>

      {/* 2. Current Score  */}
      <h2>Score: {score}</h2>

      {/* 3. Show results or show the question game  */}
      {showResults ? (
        /* 4. Final Results */
        <div className="final-results">
          <h1>Final Results</h1>
          <h2>
            {score} out of {questions.length} correct - ({quizResult()}%)
          </h2>
          <button onClick={() => restartGame()}>Restart game</button>
        </div>
      ) : (
        /* 5. Question Card  */
        <div className="question-card">
          {/* Current Question  */}
          <h2>
            Question: {currentQuestion + 1} out of {questions.length}
          </h2>
          <h3 className="question-text">{questions[currentQuestion].text}</h3>

          {/* List of possible answers  */}
          <ul>
            {questions[currentQuestion].options.map((option) => {
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
}

export default Quiz;
