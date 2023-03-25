import React, { useState, useEffect } from "react";
import { database } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import * as allIcons from "@tabler/icons-react";
import ActivitiesDetail from "./ActivitiesDetail";

function Activities(props) {
  const [activities, setActivities] = useState([]);
  const [activitiesId, setActivitiesId] = useState(null);
  const etap = props.etapsID;

  useEffect(() => {
    const getActivities = async () => {
      const activitiesRef = collection(database, "activities");
      const activitiesData = await getDocs(activitiesRef);
      const activitiesArray = [];
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
  }, [etap]);

  const sortedActivities = [...activities].sort((a, b) => a.sort - b.sort); // clone the activities array and sort it by the "sort" value from firebase
  return (
    <div>
      {sortedActivities
        .filter((activit) => activit.etap_id === etap)
        .map((filteredEtap) => {
          const Icon = allIcons[filteredEtap.type]; // create icon from @tabler/icons-react
          return (
            <button
              onClick={() => setActivitiesId(filteredEtap.id)}
              key={filteredEtap.id}>
              <span>{filteredEtap.name}</span>

              <span>
                <Icon size={26} />
              </span>
            </button>
          );
        })}
      {/* Hide details before button click  */}
      {activitiesId && <ActivitiesDetail activitiesId={activitiesId} />}
    </div>
  );
}

export default Activities;
