import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Signin } from "./components/RequireAuth/Signin";
import { Signup } from "./components/RequireAuth/Signup";
import { Signpassword } from "./components/RequireAuth/Signpassword";
import { AuthContextProvider } from "./components/RequireAuth/context/AuthContext";
import { HomePageLayout } from "./pages/Homepage";
import Etaps from "./components/button/Etaps";
import Activities from "./components/activities/Activities";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<HomePageLayout />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signpassword" element={<Signpassword />} />
        <Route path="/etaps/*" element={<Etaps />}>
          <Route path=":id" element={<Activities />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
