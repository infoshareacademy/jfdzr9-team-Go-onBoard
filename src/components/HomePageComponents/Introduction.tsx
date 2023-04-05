import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import ReactPlayer from "react-player";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { firebaseConfig, database } from "../../utils/firebase/firebase.config";
import { initializeApp } from "firebase/app";
import { useUser } from "../RequireAuth/context/AuthContext";
import { updateDoc, doc } from "firebase/firestore";

initializeApp(firebaseConfig);
ReactModal.setAppElement("#root");

function Introduction() {
  const [showModal, setShowModal] = useState<boolean>(true);
  const [fileName, setFileName] = useState<string>("");
  const [downloadURL, setDownloadURL] = useState<string>("");
  const user = useUser();

  useEffect(() => {
    async function downloadFile() {
      const storage = getStorage();
      const fileRef = ref(storage, "hello.mp4");
      const url = await getDownloadURL(fileRef);
      const name = fileRef.name;
      setDownloadURL(url);
      setFileName(name);
    }
    downloadFile();
  }, []);

  function handleCloseModal() {
    setShowModal(false);
    if (user) {
      const userRef = doc(database, "users", user.uid);
      updateDoc(userRef, { introduction: true });
    }
  }

  function handleOpenModal() {
    setShowModal(true);
  }

  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
      <ReactModal
        isOpen={showModal}
        contentLabel="Minimal Modal Example"
        onAfterOpen={() => {
          // Start playing the video when the modal is opened
          const videoPlayer = document.querySelector("video");
          videoPlayer && videoPlayer.play();
        }}>
        {fileName && (
          <ReactPlayer
            url={downloadURL}
            playing={true}
            controls={false}
            style={{ width: "100%", height: "100%", outline: "none" }}
          />
        )}
        <button onClick={handleCloseModal}>Close Modal</button>
      </ReactModal>
    </div>
  );
}

export default Introduction;
