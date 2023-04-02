import "../../index.css";
import { database } from "../../utils/firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
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

  //ganing access to id of stages in each activities and user_activities collections ( by used hook useFirebase) - needed to calculations the average of activities in each stages for log in user//

  const activity = useFirebaseFetch("activities");
  const userActivities = useFirebaseFetch("user");

  const counts = activity.reduce((acc, { etap_id }) => {
    //counting the number of occurrences of each stage/////
    if (!acc[etap_id]) {
      acc[etap_id] = 1;
    } else {
      acc[etap_id]++;
    }
    return acc;
  }, {});

  //User stage grouping to calculate average and stage last check date//
  const userActivitiesByEtapId = userActivities.reduce((acc, activity) => {
    const { etap_id, check_date } = activity;
    if (!acc[etap_id]) {
      acc[etap_id] = { count: 1, check_date: check_date ? check_date : null };
    } else {
      acc[etap_id].count++;
      if (check_date && check_date > acc[etap_id].check_date) {
        acc[etap_id].check_date = check_date;
      }
    }
    return acc;
  }, {});

  //Calculation of the average for each step and the date of the last step check//
  const averagesAndDates = Object.entries(counts).map(([key, value]) => {
    const matchingValues = userActivitiesByEtapId[key];
    const sum = matchingValues ? matchingValues.count : 0;
    const average = (sum / value) * 100;
    const checkDate = matchingValues ? matchingValues.check_date : null;
    return { etap_id: key, average: `${average}%`, checkDate };
  });

  const averagesByEtapId = averagesAndDates.reduce((acc, { etap_id, average }) => {
    acc[etap_id] = average;
    return acc;
  }, {});

  const checkDatesByEtapId = averagesAndDates.reduce((acc, { etap_id, checkDate }) => {
    if (checkDate && checkDate.seconds) {
      acc[etap_id] = checkDate.toDate().toLocaleDateString();
    } else {
      acc[etap_id] = "nie rozpoczęto";
    }
    return acc;
  }, {});

  sortedStages.push({
    course_id: "aBXvTc786876njhghu6RSPJzBwasniv",
    icon: "JS.svg",
    id: "ssdd455455foVQal9YJCynUwiF6XV",
    name: "test",
    custom: true,
    sort: 99,
  });
  const fetchData = () => {
    const Wiktor = useFirebaseFetch("Wiktor");
    console.log(Wiktor)
  }
  const handleClick = (e, name) => {
  
    // console.log(e.target)
    if (name === "test") {
      fetchData();
      // console.log(e.currentTarget)
    }
  
    
  }
  return (
    <>
      <div className="stages-container">
        <div className="stages-bloks">
          {sortedStages.map(({ id, icon, name }) => {
            
            const imageUrlForStage = imageUrl[stagesName.findIndex((stage) => stage.id === id)];
            return (
              <span onClick={(e) => handleClick(e, name)} key={id} className="etaps" name={name}>
                <img src={imageUrlForStage} alt={icon} className="icons" />
                <span>{name}</span>
                <span>{averagesByEtapId[id]}</span>
                <span>{checkDatesByEtapId[id]}</span>
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
};
