import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, database } from "../../utils/firebase/firebase.config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

interface CreateUserError {
  message: string;
}

const firebaseErrors = {
  "auth/email-already-in-use": "E-mail jest zarejestrowany",
  "auth/weak-password": "Hasło powinno mieć 5 znaków",
};

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const initUserRef = collection(database, "initUser");
    const queryUser = query(initUserRef, where("email", "==", email));

    try {
      const snapshot = await getDocs(queryUser);

      if (snapshot.size > 0) {
        const { gender, id_course, role } = snapshot.docs[0].data();

        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const uid = userCredential.user.uid;
          const usersRef = collection(database, "users");
          const newUser = {
            uid: uid,
            email: email,
            gender: gender,
            id_course: id_course,
            role: role,
          };

          try {
            await setDoc(doc(usersRef, uid), newUser);
            e.target.reset();
            await signOut(auth);
          } catch (e: any) {
            console.dir(e);
            setError(firebaseErrors[e.code]);
          }
          navigate("/dashboard");
        } catch (e: any) {
          console.dir(e);
          setError(firebaseErrors[e.code]);
        }
      } else {
        setError("This email is not registered!");
      }
    } catch (e: any) {
      setError("An error occurred while checking the email.");
      console.log(e.message);
    }
  };

  return (
    <>
      <div>
        <h3>GO! onBoard</h3>
        <h1>Zarejestruj się</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Please enter your email"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Please enter your password"
            />
            <p>{error}</p>
          </div>
          <button type="submit">Zarejestruj</button>
        </form>
        <div>
          <p>
            <Link to="/signin">Logowanie</Link>
          </p>
          <p>
            <Link to="/signpassword">Nie pamietam hasla</Link>
          </p>
        </div>
      </div>
    </>
  );
};
