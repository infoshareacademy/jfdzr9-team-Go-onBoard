import "../../index.css";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";

export const WelcomeContainer = () => {
  const userName = useFirebaseFetch("users");
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
