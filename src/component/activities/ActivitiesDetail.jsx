import React, { useState, useEffect, useRef } from "react";
import { database } from "../../firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import * as allIcons from "@tabler/icons-react";

function ActivitiesDetail(props) {
  const [activitiesDetail, setActivitiesDetail] = useState([]);
  const [activityChecked, setActivityChecked] = useState(false); // flag for check button
  const [checkedActivityId, setCheckedActivityId] = useState(null); // state to track the checked activity

  const userCommentRef = useRef();
  const userResultRef = useRef();
  const dateRef = useRef();

  const activiti = props.activitiesId;

  useEffect(() => {
    const getActivities = async () => {
      const activitiesRef = collection(database, "activities");
      const activitiesData = await getDocs(activitiesRef);
      const activitiesArray = activitiesData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setActivitiesDetail(activitiesArray);
    };
    getActivities();
  }, []);

  function addComment(e) {
    e.preventDefault();
    const commentRef = collection(database, "user_comment");
    const userCommentDocRef = doc(commentRef, `${activiti}`); // reference to the user's comment document for this activity

    // check if the document exists
    getDoc(userCommentDocRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        // document already exists, update the comment field
        updateDoc(userCommentDocRef, { comment: userCommentRef.current.value })
          .then(() => console.log("Comment updated successfully"))
          .catch(() => console.log("Error updating comment"));
      } else {
        // document doesn't exist, create a new one
        const newComment = {
          comment: userCommentRef.current.value,
          user_activity_id: activiti,
          // user_id: props.user.uid,
        };
        setDoc(userCommentDocRef, newComment)
          .then(() => console.log("Comment added successfully"))
          .catch(() => console.log("Error adding comment"));
      }
    });
  }

  function checkActivity(e) {
    e.preventDefault();
    const checkRef = collection(database, "user_activities");
    const newCheck = {
      result: Boolean(userResultRef.current.value),
      check_date: serverTimestamp(),
      user_activity_id: activiti,
    };
    setDoc(doc(checkRef), newCheck)
      .then(() => {
        setActivityChecked(true);
        setCheckedActivityId(activiti); // set the checked activity id
      })
      .catch(() => console.log("Error"));
    userResultRef.current.value = ""; // reset the input value after submitting
  }

  return (
    <div>
      {activitiesDetail
        .filter((detail) => detail.id === activiti)
        .map((filteredEtap) => {
          const Icon = allIcons[filteredEtap.type]; // create icon from @tabler/icons-react
          const isDisabled = checkedActivityId === activiti; // Check if this activity is disabled

          return (
            <div key={filteredEtap.id}>
              <span>{filteredEtap.name}</span>
              <span>{filteredEtap.description}</span>
              <span>
                <Icon size={26} />
              </span>
              <button>kliknij zeby obejrzec</button>
              {filteredEtap.comment && (
                <form onSubmit={addComment}>
                  <label htmlFor="Name">Wpisz notatkę</label>
                  <input ref={userCommentRef} />
                  <button type="submit">Zapisz NOTATKE</button>
                </form>
              )}
              <form onSubmit={checkActivity}>
                <button
                  type="submit"
                  disabled={isDisabled}>
                  Zapisz krok
                </button>
              </form>
            </div>
          );
        })}
    </div>
  );
}

export default ActivitiesDetail;
