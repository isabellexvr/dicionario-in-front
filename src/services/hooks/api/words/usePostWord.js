import useToken from "../../useToken";
import wordsApi from "../../../api/wordsApi";
import useAsync from "../../useAsync";

export default function usePostWord() {
    const token = useToken();
  
    const {
      loading: postWordLoading,
      error: postWordError,
      connect: postWord,
    } = useAsync((body) => wordsApi.newWord(body, token), false);
  
    return {
      postWordLoading,
      postWordError,
      postWord,
    };
  }
  