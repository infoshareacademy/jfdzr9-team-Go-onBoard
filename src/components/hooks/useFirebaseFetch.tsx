import { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../../utils/firebase/firebase.config";

interface Data {
  id: string;
  [key: string]: any;
}

export const useFirebaseFetch = (collectionName: string): Data[] => {
  const [data, setData] = useState<Data[]>([]);

  const dataCollection = useMemo(() => collection(database, collectionName), [collectionName]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(dataCollection);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Data[];
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, [collectionName]);
  return data;
};
