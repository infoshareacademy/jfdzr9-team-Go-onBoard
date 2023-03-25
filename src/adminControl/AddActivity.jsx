import React, { useRef, useState } from "react";

import { database } from "../utils/firebase/firebase.config";
import { collection, doc, setDoc } from "firebase/firestore";

function AddActivity() {
  const etapRef = useRef();
  const courseRef = useRef();
  const setRef = useRef();
  const sortRef = useRef();
  const nameRef = useRef();
  const descRef = useRef();
  const typeRef = useRef();
  const commentRef = useRef();
  const linkRef = useRef();
  const testRef = useRef();
  const [message, setMessage] = useState(null);

  // Push Function
  function onSubmit(e) {
    e.preventDefault();
    const activityRef = collection(database, "activities");
    const newActivity = {
      etap_id: etapRef.current.value,
      comment: Boolean(commentRef.current.value),
      description: descRef.current.value,
      id_course: courseRef.current.value,
      link: linkRef.current.value,
      name: nameRef.current.value,
      set: parseInt(setRef.current.value),
      sort: parseInt(sortRef.current.value),
      test: testRef.current.value,
      type: typeRef.current.value,
    };
    setDoc(doc(activityRef), newActivity)
      .then(() => {
        setMessage("Dodano do aktywności");
        setTimeout(() => setMessage(null), 2000); // clear message after 5 seconds
        console.log("hello");
        clearInputs();
      })
      .catch(() => setMessage("Error"));
  }

  function clearInputs() {
    etapRef.current.value = "";
    courseRef.current.value = "";
    setRef.current.value = "";
    descRef.current.value = "";
    commentRef.current.value = "";
    linkRef.current.value = "";
    nameRef.current.value = "";
    sortRef.current.value = "";
    testRef.current.value = "";
    typeRef.current.value = "";
  }

  return (
    <div>
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="Name">etap</label>
        <input ref={etapRef} />
        <label htmlFor="Name">course</label>
        <input ref={courseRef} />
        <label htmlFor="Name">set</label>
        <input ref={setRef} />
        <label htmlFor="Name">desc</label>
        <input ref={descRef} />
        <label htmlFor="Name">comment</label>
        <input ref={commentRef} />
        <label htmlFor="Name">link</label>
        <input ref={linkRef} />
        <label htmlFor="Name">name</label>
        <input ref={nameRef} />
        <label htmlFor="Name">sort</label>
        <input ref={sortRef} />
        <label htmlFor="Name">test</label>
        <input ref={testRef} />
        <label htmlFor="Name">type</label>
        <input ref={typeRef} />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddActivity;
