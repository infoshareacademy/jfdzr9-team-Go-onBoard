import { useState, useEffect } from "react";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";

interface StartCourseData {
  startCourse: string | null;
}

function Calendar() {
  // using hook useFirebaseFetch() to fetch collection called "users"//
  const [startCourseData] = useFirebaseFetch<StartCourseData>("users");

  const { startCourse } = startCourseData || {};

  return <h2>Hej, {startCourse}!</h2>;
}

export default Calendar;
