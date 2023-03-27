import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../utils/firebase/firebase.config";

export const useFirebaseFetch = (collectionName) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const dataCollection = collection(database, collectionName);
    const querySnapshot = await getDocs(dataCollection);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, [data]);
  return data;
};
