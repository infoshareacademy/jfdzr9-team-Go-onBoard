import { StagesContainer } from "../components/HomePageComponents/StagesContainer";
import { WelcomeContainer } from "../components/HomePageComponents/WelcomeContainer";
import "./../index.css";
import { useUser } from "../components/RequireAuth/context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import Introduction from "../components/HomePageComponents/Introduction";
import { database } from "../utils/firebase/firebase.config";

export const HomePageLayout = () => {
  const user = useUser();
  const [showIntroduction, setShowIntroduction] = useState<boolean>(false);

  useEffect(() => {
    async function checkIntroduction() {
      if (user) {
        const userRef = doc(database, "users", user.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
        if (!userData?.introduction) {
          setShowIntroduction(true);
        }
      }
    }
    checkIntroduction();
  }, [user]);

  return (
    <>
      {showIntroduction && <Introduction />}
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
