import React, { createContext } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../utils/firebase/firebase.config";

const UserContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  return <UserContext.Provider value={createUser}> {children} </UserContext.Provider>;
};

export const UserAuth = () => {
  return UserContext(UserContext);
};
