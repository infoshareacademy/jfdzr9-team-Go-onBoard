import React, { useState, useEffect } from "react";
import { database } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Activites from "../activities/Activities";

function Etaps() {
  const [etaps, setEtaps] = useState([]);
  const [etapId, setEtapId] = useState(null);

  // take etaps from firebase and push it into buttons
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
        });
      });
      setEtaps(etapsArray);
    };
    getEtaps();
  }, []);

  const handleClick = (event) => {
    setEtapId(event.target.id);
  };

  return (
    <div>
      {etaps.map((etap) => (
        <button
          id={etap.id}
          onClick={handleClick}
          key={etap.id}>
          <span>{etap.name}</span>
          <img
            src={etap.icon}
            alt={etap.name}
          />
        </button>
      ))}
      {etapId && <Activites etapsID={etapId} />}
    </div>
  );
}

export default Etaps;
