import React, { useEffect, useState } from "react";
import { useUser } from "../RequireAuth/context/AuthContext";
import { useFirebaseFetch } from "../hooks/useFirebaseFetch";
import { Doughnut } from "react-chartjs-2";
import { Chart } from "chart.js";
import { ArcElement, DoughnutController } from "chart.js";

Chart.register(ArcElement, DoughnutController);

interface UsersActivities {
  false: boolean;
  etap_id: string;
  id_course: string;
}
interface Users {
  etap_id: string;
  user_id: String;
}
function ProgressEtap() {
  const user = useUser();
  const activities = useFirebaseFetch<UsersActivities>("activities");
  const userActivitiesData = useFirebaseFetch<Users>("user_activities");
  const [userProgress, setUserProgress] = useState<number | null>(null);

  useEffect(() => {
    if (user && activities.length && userActivitiesData.length) {
      const filteredUserActivities = userActivitiesData.filter(
        (activity) => activity.user_id === user.uid
      );

      const progress =
        (filteredUserActivities.length / activities.length) * 100;
      setUserProgress(progress);
    }
  }, [user, activities, userActivitiesData]);

  const data = {
    datasets: [
      {
        data: [userProgress ?? 0, 100 - (userProgress ?? 0)],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div style={{ border: "1px solid black", position: "relative" }}>
      {user && userProgress !== null ? (
        <div key={user.uid}>
          <Doughnut
            data={data}
            style={{ zIndex: "1" }}
          />
          <div
            style={{
              zIndex: "3",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}>
            {userProgress.toFixed(0)}%
          </div>
        </div>
      ) : (
        <div>Loading user progress...</div>
      )}
    </div>
  );
}

export default ProgressEtap;
