import { useUser } from "./context/AuthContext";

import ButtonLogout from "./ButtonLogout";
import AvatarUploader from "../HomePageComponents/AvatarUploader";

const Account = () => {
  const user = useUser();

  return (
    <div>
      <>
        <AvatarUploader />
        <h2>Account</h2>
        <p>User Email: {user?.email}</p>
        <ButtonLogout />
      </>
    </div>
  );
};
export default Account;
