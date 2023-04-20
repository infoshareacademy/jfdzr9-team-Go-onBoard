import React, { useRef, useState } from "react";

import { database } from "../utils/firebase/firebase.config";
import { collection, addDoc } from "firebase/firestore";

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

// function AddQuiz() {
//   const etapRef = useRef<HTMLInputElement>(null);
//   const courseRef = useRef<HTMLInputElement>(null);
//   const courseNameRef = useRef<HTMLInputElement>(null);
//   const optionsRef = useRef<HTMLInputElement>(null);
//   const optionsTextRef = useRef<HTMLInputElement>(null);
//   const idRef = useRef<HTMLInputElement>(null);
//   const textRef = useRef<HTMLInputElement>(null);
//   const isCorrectRef = useRef<HTMLInputElement>(null);
//   const [message, setMessage] = useState<string | null>(null);

//   // Push Function
//   function onSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     const quizRef = collection(database, "quiz");
//     const options = [
//       {
//         id: parseInt(idRef.current?.value ?? "0"),
//         text: textRef.current?.value ?? "",
//         isCorrect: Boolean(isCorrectRef.current?.value),
//       },
//     ];
//     const questiones = [
//       {
//         text: optionsTextRef.current?.value ?? "",
//         options: options,
//       },
//     ];
//     const newQuiz: QuizData = {
//       etap_id: etapRef.current?.value ?? "",
//       id_course: courseRef.current?.value ?? "",
//       course_name: courseNameRef.current?.value ?? "",
//       questiones: questiones,
//     };

//     addDoc(quizRef, newQuiz)
//       .then(() => {
//         setMessage("Dodano quiz do bazy");
//         setTimeout(() => setMessage(null), 2000); // clear message after 5 seconds
//       })
//       .catch(() => setMessage("Error"));
//   }

//   return (
//     <div>
//       <p>Dodaj quiz do bazy</p>
//       <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column" }}>
//         <label htmlFor="Name">ID etapu</label>
//         <input ref={etapRef} />
//         <label htmlFor="Name">ID kursu</label>
//         <input ref={courseRef} />
//         <label htmlFor="Name">Nazwa kursu</label>
//         <input ref={courseNameRef} />
//         <label htmlFor="Name">Pytanie</label>
//         <input ref={optionsTextRef} />
//         <label htmlFor="Name">Nr odpowiedzi</label>
//         <input ref={idRef} />
//         <label htmlFor="Name">Treść odpowiedzi</label>
//         <input ref={textRef} />
//         <label htmlFor="Name">Wynik odpowiedzi = "true" lub " false"</label>
//         <input ref={isCorrectRef} />
//         <button type="submit">Submit</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default AddQuiz;

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

  // Push Function
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Create new option object
    const newOption: Option = {
      id: parseInt(idRef.current?.value ?? "0"),
      text: textRef.current?.value ?? "",
      isCorrect: Boolean(isCorrectRef.current?.value),
    };

    // Create new question object
    const newQuestion: Question = {
      text: optionsTextRef.current?.value ?? "",
      options: [newOption],
    };

    // Update questiones state with new question
    setQuestiones((prevQuestiones) => [...prevQuestiones, newQuestion]);

    // Clear form input values
    optionsTextRef.current!.value = "";
    idRef.current!.value = "";
    textRef.current!.value = "";
    isCorrectRef.current!.value = "";

    // Display success message
    setMessage("Dodano quiz do bazy");
    setTimeout(() => setMessage(null), 2000);
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
    etapRef.current!.value = "";
    courseRef.current!.value = "";
    courseNameRef.current!.value = "";

    addDoc(quizRef, newQuiz)
      .then(() => setMessage("Quiz został zapisany w bazie danych."))
      .catch(() => setMessage("Wystąpił błąd podczas zapisywania quizu."));
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
        <input type="number" id="optionisCorrect" ref={idRef} />
        <label htmlFor="optionText">Tekst odpowiedzi</label>
        <input type="text" id="optionText" ref={textRef} />
        <label htmlFor="isCorrect">Czy poprawna odpowiedź?</label>
        <input type="checkbox" id="isCorrect" ref={isCorrectRef} />
        <button type="submit">Dodaj pytanie</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={saveQuiz}>Zapisz quiz w bazie</button>
    </div>
  );
}

export default AddQuiz;
