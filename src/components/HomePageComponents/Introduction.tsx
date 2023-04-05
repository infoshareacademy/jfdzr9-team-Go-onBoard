import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import ReactPlayer from "react-player";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from "../../utils/firebase/firebase.config";
import { initializeApp } from "firebase/app";

initializeApp(firebaseConfig);
ReactModal.setAppElement("#root");

function Introduction() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");
  const [downloadURL, setDownloadURL] = useState<string>("");

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

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return (
    <div>
      <button onClick={handleOpenModal}>Trigger Modal</button>
      <ReactModal
        isOpen={showModal}
        contentLabel="Minimal Modal Example">
        <button onClick={handleCloseModal}>Close Modal</button>
        {fileName && (
          <ReactPlayer
            url={downloadURL}
            playing={true}
            controls={false}
            style={{ width: "100%", height: "100%", outline: "none" }}
          />
        )}
      </ReactModal>
    </div>
  );
}

export default Introduction;
