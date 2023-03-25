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
      etapsData.forEach(async (doc) => {
        const etap = {
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

  const sortedEtaps = [...etaps].sort((a, b) => a.sort - b.sort);

  return (
    <div>
      {sortedEtaps.map((etap) => {
        return (
          <button
            id={etap.id}
            onClick={() => setEtapId(etap.id)}
            key={etap.id}>
            <span>
              <img
                src={etap.icon}
                className="icons"
              />

              {etap.name}
            </span>
          </button>
        );
      })}
      {etapId && <Activites etapsID={etapId} />}
    </div>
  );
}

export default Etaps;
