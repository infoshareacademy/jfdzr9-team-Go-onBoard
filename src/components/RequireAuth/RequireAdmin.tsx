import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./context/AuthContext";

interface user {
  isAdmin: boolean;
}

const RequireAuth = ({ children }) => {
  const user = useUser();
  if (!user) {
    return <Navigate to={"/signin"} />;
  }
  return children;
};

const RequireAdmin = ({ children }) => {
  const user = useUser();
  if (!user || !user.isAdmin) {
    return <Navigate to={"/dashboard"} />;
  }
  return children;
};

export { RequireAuth, RequireAdmin };
