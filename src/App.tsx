import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Signin } from "./components/RequireAuth/Signin";
import { Signup } from "./components/RequireAuth/Signup";
import { Signpassword } from "./components/RequireAuth/Signpassword";
import { AuthContextProvider } from "./components/RequireAuth/context/AuthContext";
import { HomePageLayout } from "./pages/Homepage";
import Etaps from "./components/button/Etaps";
import PasswordReset from "./components/RequireAuth/passwordReset";
import Activities from "./components/activities/Activities";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { InfoPagePassword } from "./components/RequireAuth/InfoPagePassword";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signpassword" element={<Signpassword />} />
        <Route path="emulator/action" element={<PasswordReset />} />
        <Route path="/InfoPagePassword" element={<InfoPagePassword />} />
        <Route element={<RequireAuth />}>
          <Route path="/dashboard/*" element={<HomePageLayout />}>
            <Route path=":id" element={<HomePageLayout />} />
          </Route>
          <Route path="/etaps/*" element={<Etaps />}>
            <Route path=":id" element={<Activities />} />
          </Route>
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
