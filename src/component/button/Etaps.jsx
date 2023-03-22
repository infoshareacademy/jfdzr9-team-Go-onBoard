import * as allIcons from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import { database } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Activites from "../activities/Activities";

function Etaps() {
  const [etaps, setEtaps] = useState([]);
  const [etapId, setEtapId] = useState(null);

  useEffect(() => {
    const getEtaps = async () => {
      const etapsRef = collection(database, "etaps");
      const etapsData = await getDocs(etapsRef);
      const etapsArray = [];
      etapsData.forEach((doc) => {
        etapsArray.push({
          id: doc.id,
          name: doc.data().name,
          icon: doc.data().icon,
          sort: doc.data().sort,
        });
      });
      setEtaps(etapsArray);
    };
    getEtaps();
  }, []);

  const sortedEtaps = [...etaps].sort((a, b) => a.sort - b.sort); // clone the etaps array and sort it by the "sort" value from firebase

  return (
    <div>
      {sortedEtaps.map((etap) => {
        const Icon = allIcons[etap.icon]; // create icon from @tabler/icons-react
        return (
          <button
            id={etap.id}
            onClick={() => setEtapId(etap.id)}
            key={etap.id}>
            <span>
              <Icon size={26} />
              {etap.name}
            </span>
          </button>
        );
      })}
      {/* Hihde activities list before button click  */}
      {etapId && <Activites etapsID={etapId} />}
    </div>
  );
}

export default Etaps;
