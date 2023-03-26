import "../../index.css";
import { database } from "../../utils/firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";

export const WelcomeContainer = () => {
  const [userName, setUserName] = useState([]);

  const getUserName = async () => {
    const userCollerction = collection(database, "users");
    const querySnapshot = await getDocs(userCollerction);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUserName(users);
  };

  useEffect(() => {
    getUserName();
  }, []);

  return (
    <div className="greetingsContainer">
      <h2>
        Hej, {""}
        {userName.map(({ id, name }) => (
          <span key={id}>{name}!</span>
        ))}
      </h2>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe fuga, iure sunt enim distinctio accusamus. Aliquam hic minima a, possimus nobis dicta delectus. Provident
        odio officiis voluptas alias soluta est?
      </div>
    </div>
  );
};
