import React from "react";
import { auth } from "../../utils/firebase/firebase.config";
import { useNavigate } from "react-router-dom";

function ButtonLogout() {
  const navigate = useNavigate();
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
  return <button onClick={handleLogout}>Logout</button>;
}

export default ButtonLogout;
