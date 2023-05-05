import "../../index.css";
import { useUser } from "../RequireAuth/context/AuthContext";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";
import manLogoUrl from "../../assets/pliki-svg-dashboard/man_10 1.svg";
export interface IUser {
  email: string;
  name: string;
  age: number;
  id_course: string;
  uid: string;
}

export interface Courses {
  greeting: string;
  name: string;
  id_course: string;
}

interface FilteredUser {
  id_course: string;
}

export const WelcomeContainer = () => {
  const userName = useUser();
  // using hook useFirebaseFetch() to fetch collection called "users"//
  const usersCollection = useFirebaseFetch<IUser>("users");

  //comparison logged in user with users collection on uid id//
  const loggedInUser = usersCollection.find((user) => user.uid === userName?.uid);

  //indication the id_course of logged in user
  const idCourse = loggedInUser?.id_course;

  // using hook useFirebaseFetch() to fetch collection called "courses"//
  const courses = useFirebaseFetch<Courses>("courses");

  //indication type of greeting depends on id_course of logged in user//
  const filteredCourse = courses.find((course) => course.id_course === idCourse);

  return (
    <div className="greetingsContainer">
      <div className="img-block">
        <img src={manLogoUrl} alt="man-greeting-logo" className="man-greetins-logo"></img>
      </div>
      <div className="greeting-block">
        <h2>Hej,{userName?.displayName}!</h2>
        <div className="dashboard-greeting">{filteredCourse?.greeting}</div>
      </div>
    </div>
  );
};
