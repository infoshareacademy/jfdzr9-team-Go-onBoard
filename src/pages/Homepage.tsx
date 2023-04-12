import { StagesContainer } from "../components/HomePageComponents/StagesContainer";
import { WelcomeContainer } from "../components/HomePageComponents/WelcomeContainer";
import "./../index.css";
import { useUser } from "../components/RequireAuth/context/AuthContext";
import Account from "../components/RequireAuth/Account";

export const HomePageLayout = () => {
  const user = useUser();
  console.log(user);
  return (
    <>
      <Account />
      {/* <div>Hello {user.displayName}</div> */}
      <div className="up-container">
        <WelcomeContainer />
        <div className="calendar">
          <h1>Calendar under construction</h1>
        </div>
      </div>
      <div className="middle-container">
        <p className="title-etaps">
          <span></span>
          <span>Dział</span>
          <span>Realizacja</span>
          <span>Wykonano</span>
        </p>
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
