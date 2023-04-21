import React, { useState, useEffect, useRef } from "react";
import { database } from "../../utils/firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import ConfirmActivity from "../button/ConfirmActivity";
import CommentActivity from "./Comment";
import {
  DetailsWraper,
  LinkFetched,
  HeaderInfo,
  HeaderInfoButton,
} from "./Activities.styled";
import LinkFetchedHeader from "./LinkFetchedHeader";
import IconFetchedHeader from "./IconFetchedHeader";

interface Activity {
  id: string;
  name: string;
  description: string;
  type: string;
  comment?: string;
  link?: string;
  action?: string;
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
    const activity = activitiesDetail.find(
      (activity) => activity.id === props.detailProps.activitiesId
    );
    if (activity && activity.link && activity.link !== "-1") {
      setFetchedLink(activity.link);
    } else {
      setFetchedLink(null);
    }
  }, [activitiesDetail, props.detailProps.activitiesId]);

  return (
    <DetailsWraper>
      {activitiesDetail
        .filter((detail) => detail.id === props.detailProps.activitiesId)
        .map((filteredEtap) => {
          return (
            <div
              className="detailsContent"
              key={filteredEtap.id}>
              <h3>{filteredEtap.name}</h3>
              <span>{filteredEtap.description}</span>
              <LinkFetched>
                <HeaderInfo>
                  <IconFetchedHeader iconName={filteredEtap.type || ""} />
                  <LinkFetchedHeader text={filteredEtap.action || ""} />
                </HeaderInfo>
                <HeaderInfoButton>
                  {fetchedLink && ( // render the button if in activities is link
                    <a
                      href={fetchedLink}
                      target="_blank"
                      rel="noopener noreferrer">
                      <button className="confirmButton">
                        Przejdź do strony
                      </button>
                    </a>
                  )}
                </HeaderInfoButton>
              </LinkFetched>
              {filteredEtap.comment && (
                <CommentActivity
                  activitiesId={props.detailProps.activitiesId}
                />
              )}
              <ConfirmActivity confirmActivityProps={confirmActivityProps} />
            </div>
          );
        })}
    </DetailsWraper>
  );
}

export default ActivitiesDetail;
