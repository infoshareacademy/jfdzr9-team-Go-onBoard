import React, { useRef, useState, useEffect } from "react";
import { database } from "../../utils/firebase/firebase.config";
import {
  collection,
  getDoc,
  doc,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

interface UserComment {
  comment: string;
  user_activity_id: string;
  create: any;
}

interface Props {
  activitiesId: string | null;
}

const CommentActivity: React.FC<Props> = (props) => {
  const activiti = props.activitiesId;

  const userCommentRef = useRef<HTMLInputElement>(null);
  const [hasCommented, setHasCommented] = useState(false); //state to check if user add comment

  useEffect(() => {
    const commentRef = collection(database, "user_comment");
    const userCommentDocRef = doc(commentRef, `${activiti}`);

    // check if the user has already added a comment for this activity
    getDoc(userCommentDocRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        setHasCommented(true);
        const commentData = docSnapshot.data();
        if (userCommentRef.current) {
          userCommentRef.current.value = commentData?.comment;
        }
      }
    });
  }, [activiti]);

  function addComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const commentRef = collection(database, "user_comment");
    const userCommentDocRef = doc(commentRef, `${activiti}`);

    // check if the document with user comment exists
    getDoc(userCommentDocRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        // document already exists, update the comment field
        updateDoc(userCommentDocRef, { comment: userCommentRef.current?.value })
          .then(() => console.log("Comment updated successfully"))
          .catch(() => console.log("Error updating comment"));
      } else {
        // document doesn't exist, create a new one
        const newComment: UserComment = {
          comment: userCommentRef.current?.value ?? "",
          user_activity_id: activiti || "",
          create: serverTimestamp(),

          // user_id: props.user.uid, TODO
        };
        setDoc(userCommentDocRef, newComment)
          .then(() => {
            console.log("Comment added successfully");
            setHasCommented(true);
          })
          .catch(() => console.log("Error adding comment"));
      }
    });
  }

  return (
    <form onSubmit={addComment}>
      <label htmlFor="Name">Wpisz notatkę</label>
      <input ref={userCommentRef} />
      <button type="submit">
        {hasCommented ? "Zaktualizuj NOTATKE" : "Zapisz NOTATKE"}
      </button>
    </form>
  );
};

export default CommentActivity;