import useToken from "../../useToken";
import wordsApi from "../../../api/wordsApi";
import useAsync from "../../useAsync";

export default function useFilterByTabs() {
    const token = useToken();
  
    const {
      loading: filterByTabsLoading,
      error: filterByTabsError,
      connect: filterByTabs,
    } = useAsync(( body) => wordsApi.filterByTabs(body, token), false);
  
    return {
      filterByTabsLoading,
      filterByTabsError,
      filterByTabs,
    };
  }
  