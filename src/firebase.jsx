import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./utils/firebase/firebase.config";

const app = initializeApp(firebaseConfig);
export const database = getFirestore();
export const auth = getAuth(app);
