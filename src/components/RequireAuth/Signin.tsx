import { Link, useNavigate } from "react-router-dom";
import React, { useState, FormEvent } from "react";
import { auth } from "../../utils/firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { async } from "@firebase/util";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      // await singIn(email, password)
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (e: any) {
      setError(e.message);
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
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Pleace enter your email" />
          </div>
          <div>
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Pleace enter your password" />
            <p></p>
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
