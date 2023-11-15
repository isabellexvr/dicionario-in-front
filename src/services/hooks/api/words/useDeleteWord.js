import useToken from "../../useToken";
import wordsApi from "../../../api/wordsApi";
import useAsync from "../../useAsync";

export default function useDeleteWord() {
    const token = useToken();
  
    const {
      loading: deleteWordLoading,
      error: deleteWordError,
      connect: deleteWord,
    } = useAsync((params) => wordsApi.deleteWord(params, token), false);
  
    return {
      deleteWordLoading,
      deleteWordError,
      deleteWord,
    };
  }
  