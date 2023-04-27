import { QuestionProps } from "./ModelsQuizTypes";
import { useState, useEffect, useMemo } from "react";
import { AnswersContainer } from "./Answers.Container.styled";
import { Answer } from "./Answers.styled";
import { collection, doc, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { database } from "../../utils/firebase/firebase.config";
import { useUser } from "../RequireAuth/context/AuthContext";
import { result } from "cypress/types/lodash";
import { resourceLimits } from "worker_threads";

export const QuestionCard = ({ question, currentQuestion, lengthOfQuestions, setQuestionIndex, etapId }: QuestionProps) => {
  const userName = useUser();
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [userResult, setUserResult] = useState<Number>();
  const [startQuiz, setStartQuiz] = useState<boolean>(true);
  const [saveQuizPoints, setSaveQuizPoints] = useState<boolean>(false);
  const [currentUserResult, setCurrentUserResult] = useState();

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

  const restartQuiz = () => {
    setScore(0);
    setQuestionIndex(0);
    setShowResults(false);
    setSaveQuizPoints(false);
  };

  function startQuizFn() {
    setStartQuiz(false);
  }

  const saveQuiz = () => {
    setSaveQuizPoints(true);
  };

  const quizResult = useMemo(() => {
    const result = (score / question.options.length) * 100;
    setUserResult(result);
    return result;
  }, [score, question.options.length]);

  const userQuizPointsCollection = collection(database, "user_quiz_points");

  useEffect(() => {
    if (!startQuiz) {
      // check if there is already a document for a given user and stage
      const etapIdQuery = query(userQuizPointsCollection, where("etap_id", "==", etapId), where("user_id", "==", userName?.uid));
      const unsubscribe = onSnapshot(etapIdQuery, (snapshot) => {
        if (snapshot.empty) {
          // if don't exist create new
          const newUserPoints = {
            etap_id: etapId,
            user_id: userName?.uid,
            result: userResult,
          };
          setDoc(doc(userQuizPointsCollection), newUserPoints)
            .then(() => {})
            .catch(() => console.log("Error"));
        } else {
          // if exist update the document
          const docId = snapshot.docs[0].id;
          updateDoc(doc(userQuizPointsCollection, docId), { result: userResult })
            .then(() => {})
            .catch(() => console.log("Error"));
          // saveQuiz();
        }
      });
      return () => unsubscribe();
    } else {
      const etapIdQuery = query(userQuizPointsCollection, where("etap_id", "==", etapId), where("user_id", "==", userName?.uid));
      const unsubscribe = onSnapshot(etapIdQuery, (snapshot) => {
        if (!snapshot.empty) {
          // if exist update the document
          const docId = snapshot.docs[0].id;
          const result = snapshot.docs[0].data().result;
          setCurrentUserResult(result);
          console.log(result);
        }
      });
      return () => unsubscribe();
    }
  }, [userResult]);

  return (
    <div>
      {!startQuiz ? (
        <div>
          {/* Current Score  */}
          <h2>Punkty: {score}</h2>
          {/* Show results or show the question game  */}
          {showResults ? (
            <div className="final-results">
              <h2>Wynik końcowy</h2>
              <h2>
                {score} z {lengthOfQuestions} prawidłowych({quizResult}%)
              </h2>
              {saveQuizPoints ? (
                <div className="save-quiz">
                  <h3>Zapisałeś wynik swojego quizu. Jeśli chcesz go poprawić kliknij w ponizszy przycisk lub jeśli uzyskałeś minimum 75% mozesz przejść do kolejnego etapu.</h3>
                  <button onClick={() => restartQuiz()}>Wykonaj test od nowa</button>
                </div>
              ) : (
                <div className="save-quiz">
                  <button onClick={() => saveQuiz()}>Zapisz wyniki quizu</button>
                  <button onClick={() => restartQuiz()}>Wykonaj test od nowa</button>
                </div>
              )}
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
      ) : (
        <div className="start-quiz">
          <h3>
            Witaj, ponizej znajduje się przycisk rozpoczynający quiz, klikając w niego zobaczysz pierwsze pytanie, powodzenia!
            {currentUserResult ? <p>Dotychczasowy wynik Twojego quizu to {currentUserResult} %</p> : ""}
          </h3>
          <button onClick={() => startQuizFn()}>Rozpocznij quiz</button>
        </div>
      )}
    </div>
  );
};
