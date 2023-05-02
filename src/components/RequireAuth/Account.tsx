import { useUser } from "./context/AuthContext";

import ButtonLogout from "./ButtonLogout";
import AvatarUploader from "../HomePageComponents/AvatarUploader";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";
import { Courses, IUser } from "../HomePageComponents/WelcomeContainer";

const Account = () => {
  const user = useUser();
  // using hook useFirebaseFetch() to fetch collection called "users"//
  const usersCollection = useFirebaseFetch<IUser>("users");

  //comparison logged in user with users collection on uid id//
  const loggedInUser = usersCollection.find((user) => user.uid === user?.uid);

  //indication the id_course of logged in user
  const idCourse = loggedInUser?.id_course;

  // using hook useFirebaseFetch() to fetch collection called "courses"//
  const courses = useFirebaseFetch<Courses>("courses");

  //indication type of greeting depends on id_course of logged in user//
  const filteredCourse = courses.find((course) => course.id_course === idCourse);

  return (
    <div>
      <ButtonLogout />
      <div className="account-block">
        <AvatarUploader />
        <div>
          <p>{user?.email}</p>
          <p>{filteredCourse?.name}</p>
        </div>
      </div>
    </div>
  );
};
export default Account;
