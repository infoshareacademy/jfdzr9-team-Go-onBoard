import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// import { firebaseConfig } from "./firebase.config";

export const firebaseConfig = {
  apiKey: "AIzaSyDSwyqMv3nf_knUcjTpZ4tahlcglsPviDQ",
  authDomain: "onboarding-6610f.firebaseapp.com",
  projectId: "onboarding-6610f",
  storageBucket: "onboarding-6610f.appspot.com",
  messagingSenderId: "775454494556",
  appId: "1:775454494556:web:e007c9e79bd84f43577b99",
};

const app = initializeApp(firebaseConfig);
export const database = getFirestore();
export const auth = getAuth(app);
