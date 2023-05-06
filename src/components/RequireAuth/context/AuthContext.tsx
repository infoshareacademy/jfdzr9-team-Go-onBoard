import {
  ReactNode,
  useContext,
  createContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../../utils/firebase/firebase.config";

interface IUserContext {
  user: null | User;
}

const UserContext = createContext<IUserContext>({
  user: null,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUserContext["user"]>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext).user;
