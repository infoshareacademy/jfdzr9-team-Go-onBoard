import "../../index.css";
import { useUser } from "../RequireAuth/context/AuthContext";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";

import { Timestamp } from "firebase/firestore";
import { FieldValue } from "firebase/firestore";

interface IUser {
  uid: string;
  start_course: Timestamp | FieldValue;
}

// Type guard function
function isTimestamp(value: Timestamp | FieldValue): value is Timestamp {
  return value instanceof Timestamp;
}

function Calendar() {
  const userName = useUser();
  const usersCollection = useFirebaseFetch<IUser>("users");

  const currentUser = usersCollection?.find(
    (user) => user.uid === userName?.uid
  );

  const now = new Date();
  let daysUntilStart: string | number = "Nieznany";

  if (currentUser?.start_course && isTimestamp(currentUser.start_course)) {
    const start_course_date = currentUser.start_course.toDate();
    const timeDifference = start_course_date.getTime() - now.getTime();
    daysUntilStart = Math.ceil(timeDifference / (1000 * 3600 * 24));
  }

  return <h2>Kurs rozpocznie się za: {daysUntilStart} dni!</h2>;
}

export default Calendar;
