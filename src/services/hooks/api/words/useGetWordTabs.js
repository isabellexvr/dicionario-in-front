import useAsync from "../../useAsync.js";
import wordsApi from "../../../api/wordsApi/index.js";

export default function useGetWordTabs() {
  const {
    data: getWordTabsData,
    loading: getWordTabsLoading,
    error: getWordTabsError,
    connect: getWordTabs,
  } = useAsync((name) => wordsApi.tabs(name), false);

  return {
    getWordTabsData,
    getWordTabsLoading,
    getWordTabsError,
    getWordTabs,
  };
}
