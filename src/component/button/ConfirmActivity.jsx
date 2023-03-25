import React, { useState, useEffect, useRef } from "react";
import { database } from "../../firebase";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";

const ConfirmActivity = (props) => {
  const [activityChecked, setActivityChecked] = useState(false); // flag for check button
  const [checkedActivityId, setCheckedActivityId] = useState(null); // state to track the checked activity

  const activiti = props.activitiesId;
  const userResultRef = useRef();

  function checkActivity(e) {
    e.preventDefault();
    const checkRef = collection(database, "user_activities");
    const newCheck = {
      result: Boolean(userResultRef.current?.value),
      check_date: serverTimestamp(),
      user_activity_id: activiti,
    };
    setDoc(doc(checkRef), newCheck)
      .then(() => {
        setActivityChecked(true);
        setCheckedActivityId(activiti); // set the checked activity id
      })
      .catch(() => console.log("Error"));
  }

  const isDisabled = checkedActivityId === activiti; // Check if this activity is disabled

  return (
    <button
      onClick={checkActivity}
      // type="submit"
      disabled={isDisabled}>
      Zapisz krok
    </button>
  );
};

export default ConfirmActivity;
