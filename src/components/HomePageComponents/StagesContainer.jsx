import "../../index.css";
import { database } from "../../utils/firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { getApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export const StagesContainer = () => {
  const [stagesName, setStagesName] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  const getStagesName = async () => {
    const userCollerction = collection(database, "etaps");
    const querySnapshot = await getDocs(userCollerction);
    const stages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStagesName(stages);
  };
  useEffect(() => {
    getStagesName();
  }, []);

  useEffect(() => {
    if (stagesName.length > 0) {
      const firebaseApp = getApp();
      const storage = getStorage(firebaseApp);

      const promises = stagesName.map(async (stage) => {
        const imageName = stage.icon;
        const imageRef = ref(storage, imageName);
        try {
          const url = await getDownloadURL(imageRef);
          return url;
        } catch (error) {
          console.error(error);
        }
      });

      Promise.all(promises)
        .then((urls) => {
          setImageUrl(urls);
          setIsImagesLoaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [stagesName]);
  const sortedStages = [...stagesName].sort((a, b) => a.sort - b.sort);

  // useEffect(() => {
  //   if (stagesName.length > 0) {
  //     const firebaseApp = getApp();
  //     const storage = getStorage(firebaseApp);

  //     const imageRefs = stagesName.map((stage) => ref(storage, stage.icon));
  //     Promise.all(imageRefs.map((imageRef) => getDownloadURL(imageRef)))
  //       .then((urls) => {
  //         setImageUrl(urls);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }
  // }, [stagesName]);

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
