import React, { useState, useEffect } from "react";
import { database } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

function Activites(props) {
  const [activites, setActivites] = useState([]);
  const etap = props.etapsID;
  useEffect(() => {
    const getActivites = async () => {
      const activitesRef = collection(database, "activities");
      const activitesData = await getDocs(activitesRef);
      const activitesArray = [];
      activitesData.forEach((doc) => {
        activitesArray.push({
          id: doc.id,
          name: doc.data().name,
          type: doc.data().type,
          etap_id: doc.data().etap_id,
        });
      });
      setActivites(activitesArray);
    };
    getActivites();
  }, []);
  console.log(props);
  return (
    <div>
      {activites
        .filter((activit) => activit.etap_id === etap)
        .map((filteredEtap) => (
          <button key={filteredEtap.id}>
            <span>{filteredEtap.name}</span>
            <img
              src={filteredEtap.type}
              alt={filteredEtap.name}
            />
          </button>
        ))}
    </div>
  );
}

export default Activites;
