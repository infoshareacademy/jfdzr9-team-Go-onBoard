import { useState, useEffect } from "react";
import { database } from "../../utils/firebase/firebase.config"; // import storage
import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL, getStorage } from "firebase/storage";
import { getApp } from "firebase/app";
import Activities from "../activities/Activities";

interface Etap {
  id: string;
  name: string;
  sort: number;
  icon: string;
}

function Etaps() {
  const [etaps, setEtaps] = useState<Etap[]>([]);
  const [etapId, setEtapId] = useState<string | null>(null);
  const [activitiesByEtap, setActivitiesByEtap] = useState<Record<string, { etap_id: string; id: string }[]>>({});
  const [userActivityIds, setUserActivityIds] = useState<string[]>([]);

  useEffect(() => {
    async function getEtaps() {
      const etapsRef = collection(database, "etaps");
      const etapsData = await getDocs(etapsRef);

      //make array with etpaid and activities
      const activitiesRef = collection(database, "activities");
      const activitiesData = await getDocs(activitiesRef);
      const activitiesByEtap = activitiesData.docs.reduce<Record<string, { etap_id: string; id: string }[]>>((acc, doc) => {
        const etapId = doc.data().etap_id;

        if (!acc[etapId]) {
          acc[etapId] = [];
        }

        acc[etapId].push({
          etap_id: etapId,
          id: doc.id,
        });

        return acc;
      }, {});

      setActivitiesByEtap(activitiesByEtap);
      //make array from user_activities with etpaid and activityid
      const userActivitiesRef = collection(database, "user_activities");
      const useractivitiesData = await getDocs(userActivitiesRef);
      const userActivityIds = useractivitiesData.docs.map((doc) => doc.data().user_activity_id);

      setUserActivityIds(userActivityIds);

      //icon part, take from storage and push in button
      const etapsArray: Etap[] = await Promise.all(
        etapsData.docs.map(async (doc) => {
          const etap = {
            id: doc.id,
            name: doc.data().name,
            sort: doc.data().sort,
            icon: "",
          };

          const firebaseApp = getApp();
          const storage = getStorage(firebaseApp);

          const iconRef = ref(storage, doc.data().icon);
          const iconUrl = await getDownloadURL(iconRef);
          etap.icon = iconUrl;

          return etap;
        })
      );

      setEtaps(etapsArray);
    }

    getEtaps();
  }, []);

  //props to confirm button-after confirm check status to show etpas when all activ in etap are completed
  function handleActivityConfirmation(newActivityId: string) {
    setUserActivityIds((prevActivityIds) => [...prevActivityIds, newActivityId]);
  }

  // sort etaps by "sort" key in firebase
  const sortedEtaps = [...etaps].sort((a, b) => a.sort - b.sort);

  return (
    <div>
      {sortedEtaps.map((etap, index) => {
        //check previous etap if all activities are completed, next etap is enable
        const isPreviousEtapCompleted =
          index === 0 ||
          (index > 0 &&
            activitiesByEtap[sortedEtaps[index - 1].id]?.length ===
              userActivityIds.filter((activityId) => activitiesByEtap[sortedEtaps[index - 1].id].some((activity) => activity.id === activityId)).length);

        const enableButton = isPreviousEtapCompleted;

        return (
          <button id={etap.id} onClick={() => setEtapId(etap.id)} key={etap.id} disabled={!enableButton}>
            {etap.icon && <img src={etap.icon} alt={etap.name} />}
            <span>{etap.name}</span>
          </button>
        );
      })}
      {etapId && (
        <Activities
          etapData={{
            etapsID: etapId,
            onActivityConfirmation: handleActivityConfirmation,
          }}
        />
      )}
    </div>
  );
}

export default Etaps;
