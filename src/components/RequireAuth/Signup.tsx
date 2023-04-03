import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, database } from "../../utils/firebase/firebase.config";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";

interface CreateUserError {
  message: string;
}

type FirebaseErrorCode = "auth/email-already-in-use" | "auth/invalid-email" | "auth/user-not-found" | "auth/wrong-password" | "auth/weak-password";

type FirebaseErrorMessages = {
  [key in FirebaseErrorCode]: string;
};

const firebaseErrors: FirebaseErrorMessages & { [key: string]: string } = {
  "auth/email-already-in-use": "E-mail jest już zarejestrowany.",
  "auth/invalid-email": "Wprowdź poprawny e-mail",
  "auth/user-not-found": "E-mail nie został zarejestrowany",
  "auth/wrong-password": "Niepoprawne hasło",
  "auth/weak-password": "Hasło powinno zawierać conajmniej 6 znaków",
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
        snapshot.docs.forEach(async (docSnapshot) => {
          const { gender, id_course, role } = docSnapshot.data();

          try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            const usersRef = collection(database, "users");
            const newUser = {
              email: email,
              gender: gender,
              id_course: id_course,
              role: role,
            };

            try {
              const userDocRef = doc(usersRef, uid);
              await setDoc(userDocRef, newUser);
              (e.target as HTMLFormElement).reset();
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
        });
      } else {
        setError("E-mail, nie moze zostać zrejestrowany. Jeśli opłaciłeś kurs, skontaktuj się z działem Sprzedaż. ");
      }
    } catch (e: any) {
      setError("Wystąpił błąd podczas weryfikowania e-mail.");
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
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Please enter your email" />
          </div>
          <div>
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Please enter your password" />
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
