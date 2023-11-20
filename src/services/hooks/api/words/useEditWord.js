import useToken from "../../useToken";
import wordsApi from "../../../api/wordsApi";
import useAsync from "../../useAsync";

export default function useEditWord() {
    const token = useToken();
  
    const {
      loading: editWordLoading,
      error: editWordError,
      connect: editWord,
    } = useAsync((params, body) => wordsApi.editWord(params,body, token), false);
  
    return {
      editWordLoading,
      editWordError,
      editWord,
    };
  }
  