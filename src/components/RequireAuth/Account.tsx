import React, { useEffect } from "react";
import { useUser } from "./context/AuthContext";
import { auth, firebaseConfig } from "../../utils/firebase/firebase.config";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();
  const user = useUser();
  console.log(user);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/signin", { replace: true });
    } catch (error) {
      console.log(error);
    }
    // await auth.signOut();
    // navigate("/signin");
  };
  return (
    <div>
      <h2>Account</h2>
      <p>User Email: {user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
export default Account;
