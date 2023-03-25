import { Route } from "react-router-dom";
import AddActivity from "./adminControl/AddActivity";
import "./App.css";
import { HomePageLayout } from "./pages/Homepage";

export const App = () => {
  return (
    <>
      <Routes>
        <HomePageLayout />
      </Routes>
    </>
  );
};
