import { usersApi } from "../../../api/usersApi/index.js";
import useAsync from "../../useAsync.js";

export default function usePostUser() {
  const {
    loading: postUserLoading,
    error: postUserError,
    connect: postUser,
  } = useAsync((data) => usersApi.createNewUser({...data, admin: 0}), false);

  return {
    postUserLoading,
    postUserError,
    postUser,
  };
}
