import React, { useState, useEffect, useRef } from "react";
import { database } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

const ConfirmActivity = (props) => {
  const [activityChecked, setActivityChecked] = useState(false); // flag for check button
  const [checkedActivityId, setCheckedActivityId] = useState(null); // state to track the checked activity
  const [isDisabled, setIsDisabled] = useState(true); // state to disable the button if the activity has already been checked
  const [hasMounted, setHasMounted] = useState(false); // flag to indicate whether the component has mounted

  const activiti = props.activitiesId;
  //   const userResultRef = useRef();

  // Fetch the user_activities collection and check if there's a document with a true value for the result field
  useEffect(() => {
    const fetchData = async () => {
      const q = query(
        collection(database, "user_activities"),
        where("user_activity_id", "==", activiti)
      );
      const querySnapshot = await getDocs(q);
      const hasResult = querySnapshot.docs.some((doc) => doc.data().result);
      setIsDisabled(hasResult);
      setHasMounted(true); // set the flag to indicate that the component has mounted
    };
    fetchData();
  }, [activiti]);

  function checkActivity(e) {
    e.preventDefault();
    const checkRef = collection(database, "user_activities");
    const newCheck = {
      result: true, // set the result field to true
      check_date: serverTimestamp(),
      user_activity_id: activiti,
    };
    setDoc(doc(checkRef), newCheck)
      .then(() => {
        setActivityChecked(true);
        setCheckedActivityId(activiti); // set the checked activity id
        setIsDisabled(true); // disable the button
      })
      .catch(() => console.log("Error"));
  }

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
