import useAsync from "../../useAsync.js";
import wordsApi from "../../../api/wordsApi/index.js";

export default function useSimpleSearch() {
    const {
      data: simpleSearchData,
      loading: simpleSearchLoading,
      error: simpleSearchError,
      connect: simpleSearch,
    } = useAsync((body, query) => wordsApi.simpleSearch(body, query), false);
  
    return {
      simpleSearchData,
      simpleSearchLoading,
      simpleSearchError,
      simpleSearch,
    };
  }
  