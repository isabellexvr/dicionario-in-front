import useAsync from "../../useAsync.js";
import wordsApi from "../../../api/wordsApi/index.js";

export default function useReverseSearch() {
    const {
      data: reverseSearchData,
      loading: reverseSearchLoading,
      error: reverseSearchError,
      connect: reverseSearch,
    } = useAsync((body) => wordsApi.reverseSearch(body), false);
  
    return {
      reverseSearchData,
      reverseSearchLoading,
      reverseSearchError,
      reverseSearch,
    };
  }
  