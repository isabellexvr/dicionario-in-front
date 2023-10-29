import { createContext } from "react";
import useLocalStorage from "./hooks/useLocalStorage.js"

export const UserInfoContext = createContext();

export default function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useLocalStorage('userInfo', {});
  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
}

