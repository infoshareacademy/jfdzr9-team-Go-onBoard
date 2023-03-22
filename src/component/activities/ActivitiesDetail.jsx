import React, { useState, useEffect } from "react";
import { database } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import * as allIcons from "@tabler/icons-react";

function ActivitiesDetail(props) {
  const [activitiesDetail, setActivitiesDetail] = useState([]);
  const [activitiesDetailId, setActivitiesDetailId] = useState(null);

  const activiti = props.activitiesId;
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
          description: doc.data().description,
          test: doc.data().test,
          link: doc.data().link,
          comment: doc.data().comment,
        });
      });
      setActivitiesDetail(activitiesArray);
    };
    getActivities();
  }, []);

  return (
    <div>
      {activitiesDetail
        .filter((detail) => detail.id === activiti)
        .map((filteredEtap) => {
          //const Icon = allIcons[filteredEtap.type];  create icon from @tabler/icons-react
          return (
            <>
              <span key={filteredEtap.id}>{filteredEtap.description}</span>
            </>
          );
        })}
    </div>
  );
}

export default ActivitiesDetail;
