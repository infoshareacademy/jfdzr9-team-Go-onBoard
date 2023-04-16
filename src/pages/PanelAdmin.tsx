import { useState } from "react";
import AddActivity from "../adminControl/AddActivity";
import AddUser from "../adminControl/AddUser";
import ProgressUser from "../adminControl/ProgressUser";

import ButtonLogout from "../components/RequireAuth/ButtonLogout";

function PanelAdmin() {
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showProgressUser, setShowProgressUser] = useState(false);

  const handleShowAddActivity = () => {
    setShowAddActivity(true);
    setShowAddUser(false);
    setShowProgressUser(false);
  };

  const handleShowAddUser = () => {
    setShowAddActivity(false);
    setShowAddUser(true);
    setShowProgressUser(false);
  };

  const handleShowProgressUser = () => {
    setShowAddActivity(false);
    setShowAddUser(false);
    setShowProgressUser(true);
  };

  return (
    <>
      <h1>PanelAdmina</h1>
      <div>
        <button onClick={handleShowAddActivity}>AddActivity</button>
        <button onClick={handleShowAddUser}>AddUser</button>
        <button onClick={handleShowProgressUser}>ProgressUser</button>
        <ButtonLogout />
      </div>
      {showAddActivity && <AddActivity />}
      {showAddUser && <AddUser />}
      {showProgressUser && <ProgressUser />}
    </>
  );
}

export default PanelAdmin;
