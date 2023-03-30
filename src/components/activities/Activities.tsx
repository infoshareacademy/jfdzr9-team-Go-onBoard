import React, { useState, useEffect } from "react";
import { database } from "../../utils/firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import ActivitiesDetail from "./ActivitiesDetail";

interface Activity {
  id: string;
  name: string;
  type: string;
  etap_id: string;
  sort: number;
}

interface Props {
  etapData: {
    etapsID: string;
    onActivityConfirmation: (newActivityId: string) => void;
  };
}

function Activities(props: Props) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activitiesId, setActivitiesId] = useState<string | null>(null);
  const detailProps = {
    activitiesId: activitiesId,
    etap_id: props.etapData.etapsID,
    onActivityConfirmation: props.etapData.onActivityConfirmation,
  };

  useEffect(() => {
    const getActivities = async () => {
      const activitiesRef = collection(database, "activities");
      const activitiesData = await getDocs(activitiesRef);
      const activitiesArray: Activity[] = [];
      activitiesData.forEach((doc) => {
        activitiesArray.push({
          id: doc.id,
          name: doc.data().name,
          type: doc.data().type,
          etap_id: doc.data().etap_id,
          sort: doc.data().sort,
        });
      });
      setActivities(activitiesArray);
    };
    getActivities();
  }, []);

  useEffect(() => {
    setActivitiesId(null); // Reset activitiesId state when etap prop changes
  }, [props.etapData.etapsID]);

  const sortedActivities = [...activities].sort((a, b) => a.sort - b.sort); // clone the activities array and sort it by the "sort" value from firebase
  return (
    <div>
      {sortedActivities
        .filter((activit) => activit.etap_id === props.etapData.etapsID)
        .map((filteredEtap) => {
          return (
            <button
              onClick={() => setActivitiesId(filteredEtap.id)}
              key={filteredEtap.id}>
              <span>{filteredEtap.name}</span>
            </button>
          );
        })}
      {/* Hide details before button click  */}
      {activitiesId && <ActivitiesDetail detailProps={detailProps} />}
    </div>
  );
}

export default Activities;
