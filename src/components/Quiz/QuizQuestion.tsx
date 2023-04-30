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
  const [userResult, setUserResult] = useState<Number>(0);
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
    setUserResult(0);
  }

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
            save_quiz: false,
          };
          setDoc(doc(userQuizPointsCollection), newUserPoints)
            .then(() => {})
            .catch(() => console.log("Error"));
        } else {
          // if exist update the document
          const docId = snapshot.docs[0].id;
          updateDoc(doc(userQuizPointsCollection, docId), { result: userResult, save_quiz: true })
            .then(() => {})
            .catch(() => console.log("Error"));
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
        if (saveQuizPoints === true) {
          const docId = snapshot.docs[0].id;
          updateDoc(doc(userQuizPointsCollection, docId), { save_quiz: true })
            .then(() => {
              console.log("Document updated successfully");
            })
            .catch((error) => {
              console.error("Error updating document: ", error);
            });
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
              {quizResult >= 75 ? (
                <div className="save-quiz">
                  <h3>Brawo zaliczyłeś(aś) quiz. Mozesz przejść do kolejnego etapu lub wykonać test kolejny raz.</h3>
                  <button onClick={() => restartQuiz()}>Wykonaj test od nowa</button>
                </div>
              ) : (
                <div className="save-quiz">
                  <h3>Niestety nie uzyskałeś(aś) minimalnych 75% z quizu. Aby przejść do kolejnego etapu wykonaj test jeszcze raz.</h3>
                  {/* <button onClick={() => saveQuiz()}>Zapisz wyniki quizu</button> */}
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
            Witaj, ponizej znajduje się przycisk rozpoczynający quiz, klikając w niego zobaczysz pierwsze pytanie. Aby zaliczyć tą aktywność nalezy zdać test na minimum 75%,
            powodzenia!
            {currentUserResult ? (
              <p>
                Dotychczasowy wynik Twojego quizu to{" "}
                {currentUserResult >= 75
                  ? `${currentUserResult}%. Jeśli chcesz mozesz wykonać quiz kolejny raz, ale pamiętaj ten etap masz juz zaliczony;)!`
                  : `${currentUserResult}%. Wykonaj quiz kolejny raz, aby móc przejść do kolejnego etapu.`}
              </p>
            ) : (
              ""
            )}
          </h3>
          <button onClick={() => startQuizFn()}>Rozpocznij quiz</button>
        </div>
      )}
    </div>
  );
};
