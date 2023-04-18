import { collection, getDocs } from "firebase/firestore";
import { auth, database } from "../../../utils/firebase/firebase.config";
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./AuthContext";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const userAuth = useUser();
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);

      if (user) {
        const userRef = collection(database, `users/${userAuth.uid}`);
        const snapshot = await getDocs(userRef);
        const userUid = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (userUid.exists) {
          setUserData(snapshot.data());
        } else {
          console.log("No user data found.");
        }
      } else {
        setUserData(null);
      }
    });

    return unsubscribe;
  }, []);

  const value = { userData };

  return <UserContext.Provider value={currentUser}>{children}</UserContext.Provider>;
}

export const usersCollection = () => useContext(UserContext);
