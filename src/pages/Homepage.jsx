import { StagesContainer } from "../components/HomePageComponents/StagesContainer";
import { WelcomeContainer } from "../components/HomePageComponents/WelcomeContainer";
import "./../index.css";
import { Link } from "react-router-dom";

export const HomePageLayout = () => {
  return (
    <>
      <div className="up-container">
        <button>
          <Link to="/signup">BACK</Link>
        </button>
        <WelcomeContainer />
        <div className="calendar">
          <h1>Calendar under construction</h1>
        </div>
      </div>
      <div className="down-container">
        <StagesContainer />
        <div className="buddy">
          <h1>Buddy acess under construction</h1>
        </div>
      </div>
    </>
  );
};
