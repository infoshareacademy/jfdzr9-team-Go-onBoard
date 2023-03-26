import React from "react";
import { ReactDOM } from "react-dom";
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements, Routes } from "react-router-dom";
import AddActivity from "./adminControl/AddActivity";
import "./App.css";

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
