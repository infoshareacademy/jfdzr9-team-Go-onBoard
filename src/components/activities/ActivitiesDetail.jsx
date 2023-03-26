import React, { useState, useEffect, useRef } from "react";
import { database } from "../../utils/firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import * as allIcons from "@tabler/icons-react";
import ConfirmActivity from "../button/ConfirmActivity";
import CommentActivity from "./Comment";

function ActivitiesDetail(props) {
  const [activitiesDetail, setActivitiesDetail] = useState([]);

  const activiti = props.activitiesId;

  useEffect(() => {
    const getActivities = async () => {
      const activitiesRef = collection(database, "activities");
      const activitiesData = await getDocs(activitiesRef);
      const activitiesArray = activitiesData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setActivitiesDetail(activitiesArray);
    };
    getActivities();
  }, []);

  return (
    <div>
      {activitiesDetail
        .filter((detail) => detail.id === activiti)
        .map((filteredEtap) => {
          const Icon = allIcons[filteredEtap.type]; // create icon from @tabler/icons-react

          return (
            <div
              style={{ display: "flex", flexDirection: "column" }}
              key={filteredEtap.id}>
              <span>{filteredEtap.name}</span>
              <span>{filteredEtap.description}</span>
              <span>
                <Icon size={26} />
              </span>
              <button>kliknij zeby obejrzec</button>
              {filteredEtap.comment && (
                <CommentActivity activitiesId={activiti} />
              )}
              <ConfirmActivity activitiesId={activiti} />
            </div>
          );
        })}
    </div>
  );
}

export default ActivitiesDetail;
