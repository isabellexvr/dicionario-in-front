import useAsync from "../../useAsync.js";
import wordsApi from "../../../api/wordsApi/index.js";

export default function useGetWordByName() {
  const {
    data: getWordByNameData,
    loading: getWordByNameLoading,
    error: getWordByNameError,
    connect: getWordByName,
  } = useAsync((id) => wordsApi.wordByName(id), false);

  return {
    getWordByNameData,
    getWordByNameLoading,
    getWordByNameError,
    getWordByName,
  };
}
