import React, { useState, useEffect } from "react";
import { database } from "../../utils/firebase/firebase.config";
import { collection, query, where, getDocs, doc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { useUser } from "../RequireAuth/context/AuthContext";

interface ConfirmActivityProps {
  confirmActivityProps: {
    activitiesId: string | null;
    etap_id: string;
    onActivityConfirmation: (newActivityId: string) => void;
  };
  currentActivity: {
    test: boolean;
  };
}
interface QuizCollection {
  result: number;
  user_id: string;
  id: string;
  etapId: string;
}

const ConfirmActivity: React.FC<ConfirmActivityProps> = (props) => {
  const user = useUser();
  const [activityChecked, setActivityChecked] = useState<boolean>(false); // flag for check button
  const [checkedActivityId, setCheckedActivityId] = useState<string | null>(null); // state to track the checked activity
  const [isDisabled, setIsDisabled] = useState<boolean>(true); // state to disable the button if the activity has already been checked
  const [hasMounted, setHasMounted] = useState<boolean>(false); // flag to indicate whether the component has mounted
  const [points, setPoints] = useState<QuizCollection[]>([]);
  const [quizPassed, setQuizPassed] = useState<boolean>(false);

  const activiti: string = props.confirmActivityProps.activitiesId || "";
  const etap_id: string = props.confirmActivityProps.etap_id;

  // Fetch the user_activities collection and check if there's a document with a true value for the result field
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(database, "user_activities"), where("user_activity_id", "==", activiti), where("user_id", "==", user?.uid));
      const querySnapshot = await getDocs(q);
      const hasResult = querySnapshot.docs.some((doc) => doc.data().result);
      // setHasMounted(true); // set the flag to indicate that the component has mounted
      // Additional query to check if a document with the user_id exists
      setIsDisabled(hasResult); // disable the button if the activity has already been checked or user_id doesn't match
      setHasMounted(true);
    };
    fetchData();
  }, [activiti, user?.uid]);

  function checkActivity(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const checkRef = collection(database, "user_activities");
    const newCheck = {
      result: true, // set the result field to true
      check_date: serverTimestamp(),
      user_activity_id: activiti,
      etap_id: etap_id,
      user_id: user?.uid,
    };
    setDoc(doc(checkRef), newCheck)
      .then(() => {
        setActivityChecked(true);
        setCheckedActivityId(activiti); // set the checked activity id
        setIsDisabled(true); // disable the button
        props.confirmActivityProps.onActivityConfirmation(activiti);
      })
      .catch(() => console.log("Error"));
  }

  ///listening when the result of quiz will changed to enable or disable the button "zapisz krok"
  // useEffect(() => {
  //   const pointsRef = collection(database, "user_quiz_points");
  //   const pointsQuery = query(pointsRef, where("user_id", "==", user?.uid));
  //   const unsubscribe = onSnapshot(pointsQuery, (snapshot) => {
  //     const newPoints: QuizCollection[] = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       user_id: doc.data().user_id,
  //       result: doc.data().result,
  //       etapId: doc.data().etap_id,
  //       ...doc.data(),
  //     }));
  //     setPoints(newPoints);

  //     const userPoints: QuizCollection | undefined = newPoints.find((point) => point.user_id === user?.uid && point.etapId === etap_id);

  //     console.log(userPoints?.result);

  //     if (userPoints?.result && userPoints.result >= 75) {
  //       setQuizPassed(userPoints.result >= 75);
  //       setIsDisabled(!props.currentActivity.test === true || userPoints.result >= 75 ? false : true);
  //     } else {
  //       setQuizPassed(false);
  //       setIsDisabled(false);
  //     }
  //     console.log(props.currentActivity.test);
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [props.currentActivity]);

  return (
    <button
      onClick={checkActivity}
      disabled={!hasMounted || isDisabled} // disable the button if the component hasn't mounted or the activity has already been checked, without this: button is mounted at first, so i could add few data to firebase
    >
      Zapisz krok
    </button>
  );
};

export default ConfirmActivity;
