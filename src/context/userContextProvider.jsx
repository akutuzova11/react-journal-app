import { useState } from "react";
import { UserContext } from "./userContext";

export const UserContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(1);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
