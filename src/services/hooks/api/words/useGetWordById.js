import useAsync from "../../useAsync.js";
import wordsApi from "../../../api/wordsApi/index.js";

export default function useGetWordById() {
  const {
    data: getWordByIdData,
    loading: getWordByIdLoading,
    error: getWordByIdError,
    connect: getWordById,
  } = useAsync((id) => wordsApi.wordById(id), false);

  return {
    getWordByIdData,
    getWordByIdLoading,
    getWordByIdError,
    getWordById,
  };
}
