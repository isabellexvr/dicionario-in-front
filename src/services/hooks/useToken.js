import useUserInfo from "../../contexts/hooks/useUserInfo";

export default function useToken() {
  const { userInfo } = useUserInfo();

  if (Object.keys(userInfo).length !== 0) {
    return userInfo;
  }
  return null;
}
