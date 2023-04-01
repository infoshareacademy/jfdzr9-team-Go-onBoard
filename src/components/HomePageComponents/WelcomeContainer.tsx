import "../../index.css";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";

interface IUser {
  email: string;
  name: string;
  age: number;
}

interface Courses {
  greeting: string;
  name: string;
}

export const WelcomeContainer = () => {
  // using hook useFirebaseFetch() to fetch collection called "users"//
  const [userName] = useFirebaseFetch<IUser>("users");

  const { name } = userName || {};
  // using hook useFirebaseFetch() to fetch collection called "courses"//
  const [greetingText] = useFirebaseFetch<Courses>("courses");
  console.log(greetingText);

  const { greeting } = greetingText || {};

  return (
    <div className="greetingsContainer">
      <h2>Hej,{name}!</h2>
      <div>{greeting}</div>
    </div>
  );
};
