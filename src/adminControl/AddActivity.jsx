import { useRef } from "react";
import { database } from "../firebase";
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

  // Push Function
  function onSubmit(e) {
    e.preventDefault();
    const activityRef = collection(database, "activities");
    const newActivity = {
      etap_id: etapRef.current.value,
      comment: commentRef.current.value,
      description: descRef.current.value,
      id_course: courseRef.current.value,
      link: linkRef.current.value,
      name: nameRef.current.value,
      set: setRef.current.value,
      sort: sortRef.current.value,
      test: testRef.current.value,
      type: typeRef.current.value,
    };
    setDoc(doc(activityRef), newActivity).catch(alert);
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{ display: "flex", flexDirection: "column" }}>
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
  );
}

export default AddActivity;
