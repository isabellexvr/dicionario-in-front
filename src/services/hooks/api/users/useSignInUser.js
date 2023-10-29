import { usersApi } from "../../../api/usersApi";
import useAsync from "../../useAsync";

export default function useSignInUser() {
    const {
      loading: signInUserLoading,
      error: signInUserError,
      connect: signInUser,
    } = useAsync((data) => usersApi.signInUser(data), false);
  
    return {
      signInUserLoading,
      signInUserError,
      signInUser,
    };
  }
  