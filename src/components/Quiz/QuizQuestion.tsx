import { QuestionProps, UserActivitiesCollection } from "./ModelsQuizTypes";
import { useState, useEffect, useMemo } from "react";
import { AnswersContainer } from "./Answers.Container.styled";
import { Answer } from "./Answers.styled";
import { collection, doc, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { database } from "../../utils/firebase/firebase.config";
import { useUser } from "../RequireAuth/context/AuthContext";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";

export const QuestionCard = ({ question, currentQuestion, lengthOfQuestions, setQuestionIndex, etapId, currentActivityId }: QuestionProps) => {
  const userName = useUser();
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [userResult, setUserResult] = useState<Number>(0);
  const [startQuiz, setStartQuiz] = useState<boolean>(true);
  const [saveQuizPoints, setSaveQuizPoints] = useState<boolean>(false);
  const [currentUserResult, setCurrentUserResult] = useState();
  const [quizEnded, setQuizEnded] = useState(false);

  const optionClicked = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < lengthOfQuestions) {
      setQuestionIndex(currentQuestion + 1);
    } else {
      setShowResults(true);
      setQuizEnded(true);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setQuestionIndex(0);
    setShowResults(false);
    setSaveQuizPoints(false);
    setQuizEnded(false);
  };

  function startQuizFn() {
    setStartQuiz(false);
    setUserResult(0);
  }

  const quizResult = useMemo(() => {
    const result = (score / lengthOfQuestions) * 100;
    setUserResult(result);
    return result;
  }, [score, question.options.length]);

  const userQuizPointsCollection = collection(database, "user_quiz_points");
  const userActivitiesCollection = useFirebaseFetch<UserActivitiesCollection>("user_activities");
  const currentUserActivity = userActivitiesCollection.find((currentId) => currentId?.user_activity_id === currentActivityId);

  useEffect(() => {
    if (quizEnded) {
      // check if there is already a document for a given user and stage
      const etapIdQuery = query(collection(database, "user_quiz_points"), where("etap_id", "==", etapId), where("user_id", "==", userName?.uid));
      const unsubscribe = onSnapshot(etapIdQuery, (snapshot) => {
        if (snapshot.empty) {
          // if don't exist create new
          const newUserPoints = {
            etap_id: etapId,
            user_id: userName?.uid,
            result: userResult,
            save_quiz: false,
            user_activity_id: currentActivityId,
          };
          setDoc(doc(userQuizPointsCollection), newUserPoints)
            .then(() => {})
            .catch(() => console.log("Error"));
        } else {
          // if exist update the document
          const docId = snapshot.docs[0].id;
          updateDoc(doc(userQuizPointsCollection, docId), {
            result: userResult,
            save_quiz: currentUserActivity?.user_activity_id === currentActivityId ? true : null,
            user_activity_id: currentActivityId,
          })
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
        }
      });
      return () => unsubscribe();
    }
  }, [quizEnded]);

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
                  {currentUserResult && currentUserResult < 75 && currentUserActivity?.user_activity_id === currentActivityId ? (
                    <h3>Brawo zaliczyłeś(aś) quiz. Przy poprzedniej próbie takze zaliczyłeś test i zapisałeś ten krok. Mozesz przejść do kolejnego etapu.</h3>
                  ) : (
                    <h3>Brawo zaliczyłeś(aś) quiz. Mozesz przejść do kolejnego etapu lub wykonać test kolejny raz.</h3>
                  )}

                  <button onClick={() => restartQuiz()}>Wykonaj test od nowa</button>
                </div>
              ) : (
                <div className="save-quiz">
                  {currentUserResult && currentUserResult < 75 && currentUserActivity?.user_activity_id === currentActivityId ? (
                    <h3>
                      Niestety nie uzyskałeś(aś) minimalnych 75% z quizu. Natomiast przy poprzedniej próbie zaliczyłeś test oraz zapisałeś krok, mozesz nadal przejść do kolejnego
                      etapu.
                    </h3>
                  ) : (
                    <h3>Niestety nie uzyskałeś(aś) minimalnych 75% z quizu. Aby przejść do kolejnego etapu wykonaj test jeszcze raz.</h3>
                  )}

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
            Witaj, ponizej znajduje się przycisk rozpoczynający quiz, klikając w niego zobaczysz pierwsze pytanie. Aby zaliczyć tą aktywność nalezy zdać test na minimum 75% oraz
            kliknąć przycisk "zapisz krok", powodzenia!
            {currentUserResult !== undefined ? (
              <p>
                Ostatni wynik Twojego quizu to{" "}
                {currentUserActivity?.user_activity_id === currentActivityId ? (
                  <>
                    {currentUserResult >= 75 ? (
                      <>{`${currentUserResult}%. Jeśli chcesz mozesz wykonać quiz jeszcze raz, ale kliknąłeś juz przycisk "zapisz krok" więc ten etap masz juz zaliczony!`}</>
                    ) : (
                      <>{`${currentUserResult}%. Jeśli chcesz mozesz wykonać quiz jeszcze raz, ale przy poprzednich próbach juz zaliczyłeś test i kliknąłeś juz przycisk "zapisz krok" więc ten etap masz juz zaliczony!`}</>
                    )}
                  </>
                ) : (
                  <>
                    {currentUserResult >= 75 ? (
                      <>{`${currentUserResult}%. Mozesz kliknąć przycisk "zapisz krok" i przejść do kolejnego etapu. `}</>
                    ) : (
                      <>{`${currentUserResult}%. Wykonaj quiz jeszcze raz, aby zaliczyć ten etap.`}</>
                    )}
                  </>
                )}
              </p>
            ) : (
              <p></p>
            )}
          </h3>
          <button onClick={() => startQuizFn()}>Rozpocznij quiz</button>
        </div>
      )}
    </div>
  );
};
