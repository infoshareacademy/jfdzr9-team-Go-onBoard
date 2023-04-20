import "../../index.css";
import { database } from "../../utils/firebase/firebase.config";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { getApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";
import { Link } from "react-router-dom";
import { useUser } from "../RequireAuth/context/AuthContext";

interface Stage {
  id: string;
  sort: number;
  icon: string;
  name: string;
}

//fetch stages collection from firebase//
export const StagesContainer = () => {
  const user = useUser();
  const [stagesName, setStagesName] = useState<Stage[]>([]);
  const [imageUrl, setImageUrl] = useState<string[]>([]);

  const getStagesName = async () => {
    const userCollerction = collection(database, "etaps");
    const querySnapshot = await getDocs(userCollerction);
    const stages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      icon: doc.data().icon,
      ...doc.data(),
    })) as Stage[];

    //fetch svg icons from firebase storage//
    const firebaseApp = getApp();
    const storage = getStorage(firebaseApp);

    //using promise all to fetch all stages and svg icons before rendering whole page//
    const ImageUrls = (await Promise.all(
      stages.map(async (stage) => {
        const imageName = stage.icon;
        const imageRef = ref(storage, imageName);
        try {
          const url = await getDownloadURL(imageRef);
          return url;
        } catch (error) {
          console.error(error);
        }
      })
    )) as string[];
    setStagesName(stages);
    setImageUrl(ImageUrls);
  };

  useEffect(() => {
    getStagesName();
  }, []);

  //stage sorting by "sort" key in firebase//
  const sortedStages = [...stagesName].sort((a, b) => a.sort - b.sort);

  //ganing access to id of stages in each activities and user_activities collections ( by used hook useFirebase) - needed to calculations the average of activities in each stages for log in user//

  interface Users {
    check_date: Timestamp;
    etap_id: string;
    user_id: String;
  }

  interface UsersActivities {
    comment: string;
    false: boolean;
    description: string;
    etap_id: string;
    id_course: string;
    link: string;
    name: string;
    set: number;
    sort: number;
    test: boolean;
    type: string;
  }

  const activity = useFirebaseFetch<UsersActivities>("activities");
  const userActivities = useFirebaseFetch<Users>("user_activities");
  const filteredUserActivities = userActivities.filter((activity) => activity.user_id === user?.uid);

  const counts = activity.reduce((acc: { [key: UsersActivities["etap_id"]]: number }, { etap_id }) => {
    //counting the number of occurrences of each stage/////
    if (!acc[etap_id]) {
      acc[etap_id] = 1;
    } else {
      acc[etap_id]++;
    }
    return acc;
  }, {});

  //User stage grouping to calculate average and stage last check date//
  const userActivitiesByEtapId = filteredUserActivities.reduce(
    (
      acc: {
        [key: UsersActivities["etap_id"]]: {
          count: number;
          check_date: Timestamp;
        };
      },
      activity
    ) => {
      const { etap_id, check_date } = activity;
      if (!acc[etap_id]) {
        acc[etap_id] = { count: 1, check_date };
      } else {
        acc[etap_id].count++;
        if (check_date > acc[etap_id]?.check_date) {
          acc[etap_id].check_date = check_date;
        }
      }
      return acc;
    },
    {}
  );

  //Calculation of the average for each step and the date of the last step check//
  const averagesAndDates = Object.entries(counts).map(([key, value]) => {
    const matchingValues = userActivitiesByEtapId[key];
    const sum = matchingValues ? matchingValues.count : 0;
    const average = (sum / value) * 100;
    const checkDate = matchingValues ? matchingValues.check_date : null;
    return { etap_id: key, average: `${average}%`, checkDate };
  });

  const averagesByEtapId = averagesAndDates.reduce((acc: { [key: UsersActivities["etap_id"]]: string }, { etap_id, average }) => {
    acc[etap_id] = average;
    return acc;
  }, {});

  const checkDatesByEtapId = averagesAndDates.reduce((acc: { [key: UsersActivities["etap_id"]]: string }, { etap_id, checkDate }) => {
    if (checkDate && checkDate) {
      acc[etap_id] = checkDate.toDate().toLocaleDateString();
    } else {
      acc[etap_id] = "nie rozpoczęto";
    }
    return acc;
  }, {});

  return (
    <>
      <div className="stages-container">
        <div className="stages-bloks">
          {sortedStages.map(({ id, icon }) => {
            const imageUrlForStage = imageUrl[stagesName.findIndex((stage) => stage.id === id)];
            return (
              <span key={id} className="etaps">
                <button>
                  <Link to={`/etaps/${id}`}>Process</Link>
                </button>
                <img src={imageUrlForStage} alt={icon} className="icons" />
                {/* <span>{name}</span> */}
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
