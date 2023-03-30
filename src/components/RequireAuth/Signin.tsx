import { Link } from "react-router-dom";

export const Signin = () => {
  return (
    <>
      <div>
        <h3>GO! onBoard</h3>
        <h1>Zaloguj się</h1>
        <form>
          <div>
            <label>Email</label>
            <input type="email" placeholder="Pleace enter your email" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" placeholder="Pleace enter your password" />
            <p></p>
          </div>
        </form>
        <div>
          <button>Zaloguj</button>
        </div>
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
