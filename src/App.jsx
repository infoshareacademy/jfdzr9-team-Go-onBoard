import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Signin } from "../src/components/RequireAuth/Signin";
import { Signup } from "../src/components/RequireAuth/Signup";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signpassword" element={<Signpassword />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
