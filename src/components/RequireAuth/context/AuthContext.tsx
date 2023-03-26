import React, { ReactNode, useContext, createContext } from "react";
import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../../../utils/firebase/firebase.config";

interface IUserContext {
  createUser: (email: string, password: string) => Promise<UserCredential>;
}

export interface AuthProviderProps {
  children?: ReactNode;
}

const UserContext = createContext<IUserContext>({
  createUser: async (email: string, password: string) => {
    throw new Error("UserContext not initialized");
  },
});

export const AuthContextProvider: React.FC = ({
  children,
}: AuthProviderProps) => {
  const createUser = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const value: IUserContext = {
    createUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const UserAuth = () => {
  return useContext(UserContext);
};
