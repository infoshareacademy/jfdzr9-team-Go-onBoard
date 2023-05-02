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
  return <button className="dashboard-logout-btn" onClick={handleLogout}></button>;
}

export default ButtonLogout;
