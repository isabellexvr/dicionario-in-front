import useToken from "../../useToken";
import commentsApi from "../../../api/commentsAi";
import useAsync from "../../useAsync";

export default function usePostComment() {
  const token = useToken();

  const {
    loading: postCommentLoading,
    error: postCommentError,
    connect: postComment,
  } = useAsync((data) => commentsApi.newComment(data, token), false);

  return {
    postCommentLoading,
    postCommentError,
    postComment,
  };
}
