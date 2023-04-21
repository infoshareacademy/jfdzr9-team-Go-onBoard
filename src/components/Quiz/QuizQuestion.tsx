import { QuestionProps } from "./ModelsQuizTypes";
import { useState, useEffect, useMemo } from "react";
import { AnswersContainer } from "./Answers.Container.styled";
import { Answer } from "./Answers.styled";
import { collection, doc, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { database } from "../../utils/firebase/firebase.config";
import { useUser } from "../RequireAuth/context/AuthContext";

export const QuestionCard = ({ question, currentQuestion, lengthOfQuestions, setQuestionIndex, etapId }: QuestionProps) => {
  const userName = useUser();
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [userResult, setUserResult] = useState<Number>();

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

  const quizResult = useMemo(() => {
    const result = (score / question.options.length) * 100;
    setUserResult(result);
    return result;
  }, [score, question.options.length]);

  const userQuizPointsCollection = collection(database, "user_quiz_points");

  useEffect(() => {
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
      }
    });
    return () => unsubscribe();
  }, [userResult]);

  return (
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
