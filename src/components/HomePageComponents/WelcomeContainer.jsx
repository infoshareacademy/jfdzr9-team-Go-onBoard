import "../../index.css";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";

export const WelcomeContainer = () => {
  // using hook useFirebaseFetch() to fetch collection called "users"//
  const [userName] = useFirebaseFetch("users");
  const { name } = userName || {};
  // using hook useFirebaseFetch() to fetch collection called "courses"//
  const [greetingText] = useFirebaseFetch("courses");
  const { greeting } = greetingText || {};

  return (
    <div className="greetingsContainer">
      <h2>Hej,{name}!</h2>
      <div>{greeting}</div>
    </div>
  );
};
