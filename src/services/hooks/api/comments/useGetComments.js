import useAsync from "../../useAsync.js";
import commentsApi from "../../../api/commentsAi/index.js";

export default function useGetComments() {
    const {
      data: getCommentsData,
      loading: getCommentsLoading,
      error: getCommentsError,
      connect: getComments,
    } = useAsync((word) => commentsApi.commentsByWord(word), false);
  
    return {
      getCommentsData,
      getCommentsLoading,
      getCommentsError,
      getComments,
    };
  }
  