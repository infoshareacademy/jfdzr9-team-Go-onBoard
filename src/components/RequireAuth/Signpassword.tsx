import { Link, useNavigate } from "react-router-dom";
import React, { useState, FormEvent } from "react";
import { auth, passwordReset } from "../../utils/firebase/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import { log } from "console";

export const Signpassword = () => {
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState(false);

  const resetField = () => {
    setEmail("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await passwordReset(email);
      setEmailMessage(true);
      resetField();
    } catch (error: any) {
      console.log({ error });

      if (error.code === "auth/user-not-found") {
        alert("User not found, try again!");
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
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Pleace enter your email" />
          </div>
          <button type="submit">Wysli</button>
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
