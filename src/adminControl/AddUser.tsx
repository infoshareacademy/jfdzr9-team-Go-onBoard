import { useRef, FormEvent } from "react";
import { database } from "../utils/firebase/firebase.config";
import { collection, doc, setDoc } from "firebase/firestore";

interface User {
  email: string;
  name: string;
  gender: string;
  id_course: string;
  role: string;
  start_course: string;
}

function AddActivity() {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const id_courseRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);
  const start_courseRef = useRef<HTMLInputElement>(null);

  // Push user to table
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const usersRef = collection(database, "initUser");
    const newUser: User = {
      email: emailRef.current?.value || "",
      name: usernameRef.current?.value || "",
      gender: genderRef.current?.value || "",
      id_course: id_courseRef.current?.value || "",
      role: roleRef.current?.value || "",
      start_course: start_courseRef.current?.value || "",
    };
    setDoc(doc(usersRef), newUser).catch(alert);
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="E-mail">E-mail</label>
      <input ref={emailRef} />
      <label htmlFor="Imię kursanta">Imię kursanta</label>
      <input ref={usernameRef} />
      <label htmlFor="Płeć">Płeć</label>
      <input ref={genderRef} />
      <label htmlFor="Sygnatura kursu">Sygnatura kursu</label>
      <input ref={id_courseRef} />
      <label htmlFor="Rola">Rola</label>
      <input ref={roleRef} />
      <label htmlFor="Rozpoczęcie kursu">Rozpoczęcie kursu</label>
      <input ref={start_courseRef} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddActivity;
