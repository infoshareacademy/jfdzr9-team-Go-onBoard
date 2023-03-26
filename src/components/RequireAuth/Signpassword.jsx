import React from "react";
import { Link } from "react-router-dom";

const Signpassword = () => {
  return (
    <>
      <div>
        <h3>GO! onBoard</h3>
        <h1>Przypomnij hasło</h1>
        <form>
          <div>
            <label>Email</label>
            <input type="email" placeholder="Pleace enter your email" />
          </div>
        </form>
        <div>
          <button>Wyślij</button>
        </div>
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

export default Signpassword;
