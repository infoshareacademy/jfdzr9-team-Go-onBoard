import "../../index.css";
import { useUser } from "../RequireAuth/context/AuthContext";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";

import { Timestamp } from "firebase/firestore";
import { FieldValue } from "firebase/firestore";
import Account from "../RequireAuth/Account";

interface IUser {
  uid: string;
  start_course: Timestamp | FieldValue;
}

interface IUserActivity {
  user_id: string;
  check_date: Timestamp;
}

// Type guard function
function isTimestamp(value: Timestamp | FieldValue): value is Timestamp {
  return value instanceof Timestamp;
}

// Helper function to check if the date is unique in an array
function isUniqueDate(date: Date, index: number, self: Date[]) {
  const dateString = date.toISOString();
  return self.findIndex((d) => d.toISOString() === dateString) === index;
}

function Calendar() {
  const userName = useUser();
  const usersCollection = useFirebaseFetch<IUser>("users");
  const userActivitiesCollection =
    useFirebaseFetch<IUserActivity>("user_activities");

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

  // Calculate consecutive activities
  let consecutiveActivities = 0;
  if (userName) {
    const sortedUserActivities = userActivitiesCollection
      ?.filter((activity) => activity.user_id === userName.uid) //filter activity by user_id
      .map((activity) => {
        const date = activity.check_date.toDate();
        date.setHours(0, 0, 0, 0); //delete information about hour, minute etc.
        return date;
      })
      .filter(isUniqueDate) //filter date by unique, if user make few activity one day, take only one date
      .sort((a, b) => a.getTime() - b.getTime()); //sort it

    let previousDate: Date | null = null;
    let currentStreak = 0;

    for (const activityDate of sortedUserActivities || []) {
      if (previousDate) {
        const dayDifference =
          (activityDate.getTime() - previousDate.getTime()) /
          (1000 * 3600 * 24);
        if (dayDifference === 1) {
          currentStreak++;
        } else {
          consecutiveActivities = Math.max(
            consecutiveActivities,
            currentStreak
          );
          currentStreak = 1;
        }
      } else {
        currentStreak = 1;
      }

      previousDate = activityDate;
    }

    consecutiveActivities = Math.max(consecutiveActivities, currentStreak);
  }

  return (
    <>
      <Account />
      <h2>
        {daysUntilStart === 0
          ? "Kurs się rozpoczął"
          : `Kurs rozpocznie się za: ${daysUntilStart} ${
              daysUntilStart === 1 ? "dzień" : "dni"
            }!`}
      </h2>
      <h2>Dni pracy pod rząd: {consecutiveActivities}</h2>
    </>
  );
}

export default Calendar;
