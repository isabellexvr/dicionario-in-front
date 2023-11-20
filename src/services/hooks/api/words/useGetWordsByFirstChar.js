import useAsync from "../../useAsync.js";
import wordsApi from "../../../api/wordsApi/index.js";

export default function useGetWordByFirstChar() {
  const {
    data: getWordByFirstCharData,
    loading: getWordByFirstCharLoading,
    error: getWordByFirstCharError,
    connect: getWordByFirstChar,
  } = useAsync((id) => wordsApi.wordsByFirstChar(id), false);

  return {
    getWordByFirstCharData,
    getWordByFirstCharLoading,
    getWordByFirstCharError,
    getWordByFirstChar,
  };
}
