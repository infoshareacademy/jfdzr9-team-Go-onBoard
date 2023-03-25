import React from "react";
import { ReactDOM } from "react-dom";
import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements, Routes } from "react-router-dom";
import AddActivity from "./adminControl/AddActivity";
import "./App.css";
import Signin from "./components/RequireAuth/Signin";
import Signup from "./components/RequireAuth/Signup";
import Signpassword from "./components/RequireAuth/Signpassword";
import { HomePageLayout } from "./pages/Homepage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signpassword" element={<Signpassword />} />
    </Routes>
  );
}

export default App;
