import React, { useState, useEffect, useRef } from "react";
import { database } from "../../utils/firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import ConfirmActivity from "../button/ConfirmActivity";
import CommentActivity from "./Comment";
import { Quiz } from "../Quiz/Quiz";

interface Activity {
  id: string;
  name: string;
  description: string;
  type: string;
  comment?: string;
  link?: string; // Add link to the Activity interface
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
  const [fetchedLink, setFetchedLink] = useState<string | null>(null);
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

  useEffect(() => {
    // fetch only the link from the activities, if link =-1 change state
    const activity = activitiesDetail.find((activity) => activity.id === props.detailProps.activitiesId);
    if (activity && activity.link && activity.link !== "-1") {
      setFetchedLink(activity.link);
    } else {
      setFetchedLink(null);
    }
  }, [activitiesDetail, props.detailProps.activitiesId]);

  return (
    <div>
      {activitiesDetail
        .filter((detail) => detail.id === props.detailProps.activitiesId)
        .map((filteredEtap) => {
          return (
            <div style={{ display: "flex", flexDirection: "column" }} key={filteredEtap.id}>
              <span>{filteredEtap.name}</span>
              <span>{filteredEtap.description}</span>
              {fetchedLink && ( // render the button if in activities is link
                <a href={fetchedLink} target="_blank" rel="noopener noreferrer">
                  <button>Przejdź do strony</button>
                </a>
              )}
              {filteredEtap.comment && <CommentActivity activitiesId={props.detailProps.activitiesId} />}
              <ConfirmActivity confirmActivityProps={confirmActivityProps} />
              <Quiz etapIdForQuiz={confirmActivityProps} />
            </div>
          );
        })}
    </div>
  );
}

export default ActivitiesDetail;
