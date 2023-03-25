import { async } from "@firebase/util";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../RequireAuth/context/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser } = UserAuth;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
    } catch (e) {
      setError(e.messege);
      console.log(e.message);
    }
  };

  return (
    <>
      <div>
        <h3>GO! onBoard</h3>
        <h1>Zaloguj sie</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Pleace enter your email" />
          </div>
        </form>
        <form>
          <div>
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Pleace enter your password" />
            <p></p>
          </div>
        </form>
        <div>
          <button>Zaloguj</button>
        </div>
        <div>
          <p>
            <Link to="/">Rejestracja</Link>
          </p>
          <p>
            <Link to="/signpassword">Nie pamietam hasla</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
