import api from "../api.js";

const commentsApi = {
  commentsByWord: async (wordId) => {
    const res = await api.get(`/comments/word/${wordId}`);
    return res.data;
  },
  newComment: async (body, token) => {
    const res = await api.post("/comments/new", body, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  },
};

export default commentsApi;
