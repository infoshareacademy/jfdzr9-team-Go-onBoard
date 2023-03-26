import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route
          path="/"
          element={<Signin />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/signpassword"
          element={<Signpassword />}
        />
        <Route
          path="/account"
          element={<Account />}
        />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
