import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";

interface CreateUserError {
  message: string;
}

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      await createUser(email, password);
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
        <h1>Zarejestruj się</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Please enter your email" />
          </div>
          <div>
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Please enter your password" />
            <p>{error}</p>
          </div>
          <button type="submit">Zarejestruj</button>
        </form>
        <div>
          <p>
            <Link to="/signin">Logowanie</Link>
          </p>
          <p>
            <Link to="/signpassword">Nie pamietam hasla</Link>
          </p>
        </div>
      </div>
    </>
  );
};
