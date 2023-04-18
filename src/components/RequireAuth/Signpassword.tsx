import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useState, FormEvent } from "react";
import { auth, passwordReset } from "../../utils/firebase/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import { log } from "console";

export const Signpassword = () => {
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const resetField = () => {
    setEmail("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await passwordReset(email);
      setEmailMessage(true);
      resetField();
      navigate("/InfoPagePassword");
    } catch (error: any) {
      console.log({ error });

      if (error.code === "auth/user-not-found") {
        setError(
          "Nie znaleźliśmy podanego adresu e-mail w bazie danych. Upewnij się, że wprowadziłeś poprawny adres e-mail lub skontaktuj się z naszym działem wsparcia w celu uzyskania dalszej pomocy."
        );
        setEmail("");
      }
    }
  };
  return (
    <>
      <div>
        <h3>GO! onBoard</h3>
        <h1>Przypomnij hasło</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Wpisz swój email" />
            <p>{error}</p>
          </div>
          <button type="submit">Wyślij</button>
        </form>
        <div>
          <p>
            <Link to="/signup">Rejestracja</Link>
          </p>
          <p>
            <Link to="/">Logowanie</Link>
          </p>
        </div>
      </div>
    </>
  );
};
