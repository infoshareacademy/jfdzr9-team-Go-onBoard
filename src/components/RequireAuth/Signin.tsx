import { Link, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import { auth } from "../../utils/firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

type FirebaseErrorCode = "auth/email-already-in-use" | "auth/invalid-email" | "auth/user-not-found" | "auth/wrong-password" | "auth/weak-password";

type FirebaseErrorMessages = {
  [key in FirebaseErrorCode]: string;
};

const firebaseErrors: FirebaseErrorMessages & { [key: string]: string } = {
  "auth/email-already-in-use": "E-mail jest już zarejestrowany.",
  "auth/invalid-email": "Wprowdź poprawny e-mail",
  "auth/user-not-found": "E-mail nie został zarejestrowany",
  "auth/wrong-password": "Niepoprawne hasło",
  "auth/weak-password": "Hasło powinno zawierać conajmniej 6 znaków",
};

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      auth.onAuthStateChanged((user) => {
        if (user) {
          navigate(`/dashboard/${user.uid}`);
        }
      });
    } catch (e: any) {
      setError(firebaseErrors[e.code]);
      console.log(e.message);
    }
  };

  return (
    <>
      <div>
        <h3>GO! onBoard</h3>
        <h1>Zaloguj się</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Wpisz swój email" />
          </div>
          <div>
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Wpisz swoje hasło" />
            <p>{error}</p>
          </div>
          <button type="submit">Zaloguj</button>
        </form>

        <div>
          <p>
            <Link to="/signup">Zarejestruj się</Link>
          </p>
          <p>
            <Link to="/signpassword">Nie pamietam hasla</Link>
          </p>
        </div>
      </div>
    </>
  );
};
