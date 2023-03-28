import "../../index.css";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";

export const WelcomeContainer = () => {
  // using hook useFirebaseFetch() to fetch collection called "users"//
  const userName = useFirebaseFetch("users");
  // using hook useFirebaseFetch() to fetch collection called "courses"//
  const greetingText = useFirebaseFetch("courses");

  return (
    <div className="greetingsContainer">
      <h2>
        Hej, {""}
        {userName.map(({ id, name }) => (
          <span key={id}>{name}!</span>
        ))}
      </h2>
      <div>
        {greetingText.map(({ id, greeting }) => (
          <p key={id}>{greeting}</p>
        ))}
      </div>
    </div>
  );
};
