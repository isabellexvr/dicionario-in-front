import api from "../api.js";

const wordsApi = {
  allWords: async () => {
    const res = await api.get("/words");
    return res.data;
  },
  wordById: async (id) => {
    const res = await api.get(`/words/${id}`);
    return res.data;
  },
  wordByName: async (name) => {
    const res = await api.get(`/words/${name}`);
    return res.data;
  },
  editWord: async (params, token) => {
    const res = await api.put(`words/edit-word/${params}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  },
  deleteWord: async (params, token) => {
    const res = await api.delete(`words/delete-word/${params}`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  },
  newWord: async (body, token) => {
    const res = await api.post(`words/new-word`, body, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data;
  },
  search: async (query) => {
    const res = await api.get(`words/search?input=${query}`);
    return res.data;
  }
};

export default wordsApi;
