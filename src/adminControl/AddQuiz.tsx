import React, { useEffect, useRef, useState } from "react";

import { database } from "../utils/firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { useFirebaseFetch } from "../components/hooks/useFirebaseFetch";

type QuizData = {
  etap_id: string;
  id_course: string;
  course_name: string;
  questiones: Question[];
};
type Option = {
  id: number;
  text: string;
  isCorrect: boolean;
};
type Question = {
  text: string;
  options: Option[];
};

function AddQuiz() {
  const etapRef = useRef<HTMLInputElement>(null);
  const courseRef = useRef<HTMLInputElement>(null);
  const courseNameRef = useRef<HTMLInputElement>(null);
  const optionsTextRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLInputElement>(null);
  const isCorrectRef = useRef<HTMLInputElement>(null);
  const [questiones, setQuestiones] = useState<Question[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [isButtonClicked, setIsButtonClicked] = useState<Boolean>(false);

  // Push Function
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Create new option object
    const newOption: Option = {
      id: parseInt(idRef.current?.value ?? "0"),
      text: textRef.current?.value ?? "",
      isCorrect: Boolean(isCorrectRef.current?.checked),
    };

    // Find the question in questiones array
    const updatedQuestiones = questiones.map((question) => {
      if (question.text === optionsTextRef.current?.value) {
        // Add new option to existing question
        return {
          ...question,
          options: [...question.options, newOption],
        };
      } else {
        return question;
      }
    });

    // If the question doesn't exist yet, create a new one
    if (updatedQuestiones.every((question) => question.text !== optionsTextRef.current?.value)) {
      // Create new question object
      const newQuestion: Question = {
        text: optionsTextRef.current?.value ?? "",
        options: [newOption],
      };

      // Add new question to questiones array
      updatedQuestiones.push(newQuestion);
    }

    // Update questiones state with new question
    setQuestiones(updatedQuestiones);
    // Clear form input values
    // optionsTextRef.current!.value = "";
    idRef.current!.value = "";
    textRef.current!.value = "";
    isCorrectRef.current!.checked = false;

    // Display success message
    setMessage("Dodano quiz do bazy");
    setTimeout(() => setMessage(null), 2000);

    setNewQuestion();
  }

  function setButtonClickedFn() {
    setIsButtonClicked(true);
  }
  // function clickedButton() {
  //   setIsButtonClicked(true);
  //   // Ustawiamy stan na początkowy, a następnie zerujemy go
  //   setTimeout(() => setIsButtonClicked(false), 1000);
  // }

  //Set newQueston
  function setNewQuestion() {
    if (isButtonClicked === true) {
      optionsTextRef.current!.value = "";
      idRef.current!.value = "";
      textRef.current!.value = "";
      isCorrectRef.current!.checked = false;
      setTimeout(() => setIsButtonClicked(false), 500);
    } else {
      idRef.current!.value = "";
      textRef.current!.value = "";
      isCorrectRef.current!.checked = false;
    }
  }

  function resetQuiz() {
    etapRef.current!.value = "";
    courseRef.current!.value = "";
    courseNameRef.current!.value = "";
    optionsTextRef.current!.value = "";
    idRef.current!.value = "";
    textRef.current!.value = "";
    isCorrectRef.current!.value = "";
  }
  // Save quiz data to database
  function saveQuiz() {
    const quizRef = collection(database, "quiz");
    const newQuiz: QuizData = {
      etap_id: etapRef.current?.value ?? "",
      id_course: courseRef.current?.value ?? "",
      course_name: courseNameRef.current?.value ?? "",
      questiones: questiones,
    };
    addDoc(quizRef, newQuiz)
      .then(() => {
        setMessage("Quiz został zapisany w bazie danych.");
        setTimeout(() => setMessage(null), 2000); // clear message after 5 seconds
      })
      .catch(() => setMessage("Wystąpił błąd podczas zapisywania quizu."));
    setQuestiones([]);
    resetQuiz();
  }

  return (
    <div>
      <p>Dodaj quiz do bazy</p>
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="etap_id">ID etapu</label>
        <input type="text" id="etap_id" ref={etapRef} />
        <label htmlFor="id_course">ID kursu</label>
        <input type="text" id="id_course" ref={courseRef} />
        <label htmlFor="course_name">Nazwa kursu</label>
        <input type="text" id="course_name" ref={courseNameRef} />
        <label htmlFor="optionsText">Pytanie</label>
        <input type="text" id="optionsText" ref={optionsTextRef} />
        <label htmlFor="optionId">Nr odpowiedzi</label>
        <input type="text" id="optionisCorrect" ref={idRef} />
        <label htmlFor="optionText">Tekst odpowiedzi</label>
        <input type="text" id="optionText" ref={textRef} />
        <label htmlFor="isCorrect">Jeśli odpowiedź jest poprawna wpisz "true" w innym wypadku "false"</label>
        <input type="checkbox" id="isCorrect" ref={isCorrectRef} />
        <button type="submit">Dodaj kolejną odpowiedź</button>
        <button type="submit" onClick={setButtonClickedFn}>
          Dodaj pytanie
        </button>
      </form>
      <button onClick={saveQuiz}>Zapisz quiz w bazie</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddQuiz;
