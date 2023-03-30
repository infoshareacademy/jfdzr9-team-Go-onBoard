import React, { useState, useEffect, useRef } from "react";
import { database } from "../../utils/firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import ConfirmActivity from "../button/ConfirmActivity";
import CommentActivity from "./Comment";

interface Activity {
  id: string;
  name: string;
  description: string;
  type: string;
  comment?: string;
}

interface Props {
  detailProps: {
    activitiesId: string | null;
    etap_id: string;
    onActivityConfirmation: (newActivityId: string) => void;
  };
}

function ActivitiesDetail(props: Props) {
  const [activitiesDetail, setActivitiesDetail] = useState<Activity[]>([]);

  const confirmActivityProps = {
    activitiesId: props.detailProps.activitiesId,
    etap_id: props.detailProps.etap_id,
    onActivityConfirmation: props.detailProps.onActivityConfirmation,
  };

  useEffect(() => {
    const getActivities = async () => {
      const activitiesRef = collection(database, "activities");
      const activitiesData = await getDocs(activitiesRef);
      const activitiesArray = activitiesData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Activity[];
      setActivitiesDetail(activitiesArray);
    };
    getActivities();
  }, []);

  return (
    <div>
      {activitiesDetail
        .filter((detail) => detail.id === props.detailProps.activitiesId)
        .map((filteredEtap) => {
          // const Icon = allIcons[filteredEtap.type]; // create icon from @tabler/icons-react

          return (
            <div
              style={{ display: "flex", flexDirection: "column" }}
              key={filteredEtap.id}>
              <span>{filteredEtap.name}</span>
              <span>{filteredEtap.description}</span>
              <button>kliknij zeby obejrzec</button>
              {filteredEtap.comment && (
                <CommentActivity
                  activitiesId={props.detailProps.activitiesId}
                />
              )}
              <ConfirmActivity confirmActivityProps={confirmActivityProps} />
            </div>
          );
        })}
    </div>
  );
}

export default ActivitiesDetail;
