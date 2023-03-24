import "./../index.css";
import { WelcomeContainer } from "../components/HomePageComponents/WelcomeContainer";
import { StagesContainer } from "../components/HomePageComponents/StagesContainer";

export const HomePageLayout = () => {
  return (
    <>
      <div className="up-container">
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
