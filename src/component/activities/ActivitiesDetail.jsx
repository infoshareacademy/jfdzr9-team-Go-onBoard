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
import ConfirmActivity from "../button/ConfirmActivity";

function ActivitiesDetail(props) {
  const [activitiesDetail, setActivitiesDetail] = useState([]);

  const userCommentRef = useRef();
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

  return (
    <div>
      {activitiesDetail
        .filter((detail) => detail.id === activiti)
        .map((filteredEtap) => {
          const Icon = allIcons[filteredEtap.type]; // create icon from @tabler/icons-react

          return (
            <div
              style={{ display: "flex", flexDirection: "column" }}
              key={filteredEtap.id}>
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
              <ConfirmActivity activitiesId={activiti} />
            </div>
          );
        })}
    </div>
  );
}

export default ActivitiesDetail;
