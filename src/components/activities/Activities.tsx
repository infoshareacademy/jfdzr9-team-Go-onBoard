import React, { useState, useEffect } from "react";
import { database } from "../../utils/firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import ActivitiesDetail from "./ActivitiesDetail";
import { ActivitiesContainer, ActivitiName, Container, Transparent } from "./Activities.styled";

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
    <Container>
      <ActivitiesContainer>
        {sortedActivities
          .filter((activit) => activit.etap_id === props.etapData.etapsID)
          .map((filteredEtap) => {
            return (
              <Transparent onClick={() => setActivitiesId(filteredEtap.id)} key={filteredEtap.id}>
                <ActivitiName>{filteredEtap.name}</ActivitiName>
              </Transparent>
            );
          })}
      </ActivitiesContainer>
      {/* Hide details before button click  */}

      {activitiesId && <ActivitiesDetail detailProps={detailProps} />}
    </Container>
  );
}

export default Activities;
