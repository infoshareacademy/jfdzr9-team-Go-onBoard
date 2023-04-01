import { useState, useEffect } from "react";
import { database } from "../../utils/firebase/firebase.config.jsx";
import { collection, getDocs, DocumentData, query, where, onSnapshot } from "firebase/firestore";
import Activites from "../activities/Activities";

interface IEtap {
  id: string;
  name: string;
  sort: number;
}

function Etaps() {
  const [etaps, setEtaps] = useState<IEtap[]>([]);
  const [etapId, setEtapId] = useState<string | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    const getEtaps = async (): Promise<void> => {
      const etapsRef = collection(database, "etaps");
      const etapsData = await getDocs(etapsRef);

      const etapsArray: IEtap[] = [];
      etapsData.forEach((doc: DocumentData) => {
        const etap: IEtap = {
          id: doc.id,
          name: doc.data().name,
          sort: doc.data().sort,
        };
        etapsArray.push(etap);
      });
      setEtaps(etapsArray);
    };
    getEtaps();
  }, []);

  useEffect(() => {
    if (etapId) {
      const activitiesRef = collection(database, "activities");
      const activitiesQuery = query(activitiesRef, where("etap_id", "==", etapId));
      const unsubscribe = onSnapshot(activitiesQuery, (snapshot) => {
        const activitiesCount = snapshot.docs.length;
        const userActivityRef = collection(database, "user_activity");
        const userActivityQuery = query(userActivityRef, where("etap_id", "==", etapId));
        getDocs(userActivityQuery).then((docs) => {
          const userActivityCount = docs.size;
          setIsButtonDisabled(activitiesCount !== userActivityCount);
        });
      });
      return unsubscribe;
    }
  }, [etapId]);

  const sortedEtaps = [...etaps].sort((a: IEtap, b: IEtap) => a.sort - b.sort);

  return (
    <div>
      {sortedEtaps.map((etap: IEtap) => {
        return (
          <button id={etap.id} onClick={() => setEtapId(etap.id)} key={etap.id} disabled={etap.sort !== 1 && isButtonDisabled}>
            <span>{etap.name}</span>
          </button>
        );
      })}
      {etapId && <Activites etapsID={etapId} />}
    </div>
  );
}

export default Etaps;
