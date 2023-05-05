import { StagesContainer } from "../components/HomePageComponents/StagesContainer";
import { WelcomeContainer } from "../components/HomePageComponents/WelcomeContainer";
import "./../index.css";
import { useUser } from "../components/RequireAuth/context/AuthContext";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import Introduction from "../components/HomePageComponents/Introduction";
import { database } from "../utils/firebase/firebase.config";
import Calendar from "../components/HomePageComponents/Calendar";
import { BuddyContainer, BuddyImg, BuddyImgContainer, BuddyNameBlock } from "../components/HomePageComponents/Buddy.styled";
import buddyImgUrl from "../assets/pliki-svg-dashboard/buddy.svg";
import "../index.css";
import { StagesDescription } from "../components/HomePageComponents/StagesContainer.styled";

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
        <Calendar />
      </div>
      <div className="middle-container">
        <StagesDescription className="title-etaps">
          <span></span>
          <span style={{ color: "#020246", width: "90px" }}>Dział</span>
          <span style={{ color: "#020246" }}>Realizacja</span>
          <span style={{ color: "#020246" }}>Wykonano</span>
        </StagesDescription>
      </div>
      <div className="down-container">
        <StagesContainer />
        <BuddyContainer>
          <BuddyNameBlock>
            <h4>Buddy</h4>
          </BuddyNameBlock>
          <BuddyImgContainer>
            <BuddyImg src={buddyImgUrl} alt="buddy" />
            <p style={{ marginBottom: "2px", fontSize: "13px" }}>FrontEnd Senior</p>
            <p style={{ marginTop: "2px", fontSize: "13px" }}>trener@infoShare.pl</p>
          </BuddyImgContainer>
        </BuddyContainer>
      </div>
    </>
  );
};
