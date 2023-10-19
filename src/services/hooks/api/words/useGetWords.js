import useAsync from "../../useAsync.js";
import wordsApi from "../../../api/wordsApi/index.js";

export default function useGetWords() {
  const {
    data: getWordsData,
    loading: getWordsLoading,
    error: getWordsError,
    connect: getWords,
  } = useAsync(() => wordsApi.allWords(), false);

  return {
    getWordsData,
    getWordsLoading,
    getWordsError,
    getWords,
  };
}
