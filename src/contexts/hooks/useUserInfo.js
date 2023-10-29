import { useContext } from "react";
import { UserInfoContext } from "../UserInfoContext";

export default function useUserInfo() {
    const context = useContext(UserInfoContext);
    const { userInfo, setUserInfo } = context;
    return { userInfo, setUserInfo };
  }
  