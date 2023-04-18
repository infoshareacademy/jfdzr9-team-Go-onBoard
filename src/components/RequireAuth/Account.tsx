import { useUser } from "./context/AuthContext";

import ButtonLogout from "./ButtonLogout";

const Account = () => {
  const user = useUser();

  return (
    <div>
      <h2>Account</h2>
      <p>User Email: {user?.email}</p>
      <ButtonLogout />
    </div>
  );
};
export default Account;
