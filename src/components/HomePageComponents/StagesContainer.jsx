import "../../index.css";
import { database } from "../../utils/firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { getApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

//fetch stages collection from firebase//
export const StagesContainer = () => {
  const [stagesName, setStagesName] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

  const getStagesName = async () => {
    const userCollerction = collection(database, "etaps");
    const querySnapshot = await getDocs(userCollerction);
    const stages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    //fetch svg icons from firebase storage//
    const firebaseApp = getApp();
    const storage = getStorage(firebaseApp);

    //using promise all to fetch all stages and svg icons before rendering whole page//
    const ImageUrls = await Promise.all(
      stages.map(async (stage) => {
        const imageName = stage.icon;
        const imageRef = ref(storage, imageName);
        try {
          const url = getDownloadURL(imageRef);
          return url;
        } catch (error) {
          console.error(error);
        }
      })
    );
    setStagesName(stages);
    setImageUrl(ImageUrls);
  };

  useEffect(() => {
    getStagesName();
  }, []);

  //stage sorting by "sort" key in firebase//
  const sortedStages = [...stagesName].sort((a, b) => a.sort - b.sort);

  return (
    <>
      <div className="stages-container">
        <div className="stages-bloks">
          {sortedStages.map(({ id, course_id, icon, name, sort }) => {
            const imageUrlForStage = imageUrl[stagesName.findIndex((stage) => stage.id === id)];
            return (
              <span key={id} className="etaps">
                <img src={imageUrlForStage} alt={icon} className="icons" />
                <span>{name} </span> <span>{course_id}</span> <span>{sort}</span>
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
};
