import "../../index.css";
import { database } from "../../utils/firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { getApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const StagesContainer = () => {
  return (
    <>
      <div className="stages-container">
        <div className="stages-bloks"></div>
      </div>
    </>
  );
};
