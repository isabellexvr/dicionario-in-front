import useAsync from "../../useAsync.js";
import wordsApi from "../../../api/wordsApi/index.js";

export default function useSearch() {
    const {
      data: searchData,
      loading: searchLoading,
      error: searchError,
      connect: search,
    } = useAsync((body, query) => wordsApi.search(body, query), false);
  
    return {
      searchData,
      searchLoading,
      searchError,
      search,
    };
  }
  