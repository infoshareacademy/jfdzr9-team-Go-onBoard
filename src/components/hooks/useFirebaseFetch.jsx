import { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../utils/firebase/firebase.config";

export const useFirebaseFetch = (collectionName) => {
  const [data, setData] = useState([]);

  const dataCollection = useMemo(() => collection(database, collectionName), [collectionName]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(dataCollection);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, [collectionName]);
  return data;
};
