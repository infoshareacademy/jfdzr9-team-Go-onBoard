import "../../index.css";
import { database } from "../../utils/firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { getApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";

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

  //ganing access to id of stages in each activities and user_activities collections - needed to calculations the average of activities in each stages for log in user//

  const activity = useFirebaseFetch("activities");
  const activitiesEtapsId = useMemo(() => activity.map((id) => id.etap_id), [activity]);

  const userActivities = useFirebaseFetch("user");
  // const userActivitiesData = useMemo(() => userActivities.map((id) => id.etap_id), [userActivities]);
  const userActivitiesData = useMemo(() => userActivities.map(({ etap_id, check_date }) => ({ etap_id, check_date })), [userActivities]);

  // const filteredUserData = useMemo(() => userActivitiesData.filter((id) => activitiesEtapsId.includes(id.etap_id)).map((id) => id), [activitiesEtapsId, userActivitiesData]);
  // const percentage = useMemo(() => ((filteredUserData.length / activitiesEtapsId.length) * 100).toFixed(2) + "%", [filteredUserData, activitiesEtapsId]);

  const counts = activity.reduce((acc, { etap_id }) => {
    if (!acc[etap_id]) {
      acc[etap_id] = 1;
    } else {
      acc[etap_id]++;
    }
    return acc;
  }, {});

  const averages = Object.entries(counts).map(([key, value]) => {
    const matchingValues = userActivities.filter((obj) => obj.etap_id === key);
    const sum = matchingValues.reduce((acc) => acc + 1, 0);
    const average = (sum / value) * 100;
    return `${average}%`;
  });

  const checkDate = useMemo(
    () =>
      userActivitiesData.map(({ etap_id, check_date }) => {
        const etapId = etap_id;
        const date = check_date.toDate();
        if (userActivitiesData) return date.toLocaleDateString();
      }),
    [userActivitiesData]
  );
  console.log(checkDate);

  return (
    <>
      <div className="stages-container">
        <div className="stages-bloks">
          {sortedStages.map(({ id, course_id, icon, name, sort }) => {
            const imageUrlForStage = imageUrl[stagesName.findIndex((stage) => stage.id === id)];
            return (
              <span key={id} className="etaps">
                <img src={imageUrlForStage} alt={icon} className="icons" />
                <span>{name} </span> <span>{averages[0]}</span> <span>{checkDate[0]}</span>
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
};
