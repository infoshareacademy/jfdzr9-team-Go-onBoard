import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./context/AuthContext";

const RequireAuth = () => {
  const user = useUser();
  return user ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default RequireAuth;
