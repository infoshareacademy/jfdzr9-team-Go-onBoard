import { Link, useNavigate } from "react-router-dom";
import { useState, FormEvent } from "react";
import { auth } from "../../utils/firebase/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

export const InfoPagePassword = () => {
  return (
    <>
      <div>
        <h3>GO! onBoard</h3>
        <h2>Hasło zrestartowane</h2>
        <p>Na Twój adres e-mail wysłaliśmy link resetujący hasło</p>
        <p>
          <Link to="/signin">Logowanie</Link>
        </p>
      </div>
    </>
  );
};
