import api from "../api.js";

const commentsApi = {
  commentsByWord: async (word) => {
    const res = await api.get(`/comments/${word}`);
    return res.data;
  },
  newComment: async (body, token) => {
    const res = await api.get("/comments/new", body, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  },
};

export default commentsApi;
