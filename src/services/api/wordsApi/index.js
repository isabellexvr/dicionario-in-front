import api from "../api.js";

const wordsApi = {
  allWords: async () => {
    const res = await api.get("/words/all");
    return res.data;
  },
  wordById: async (id) => {
    const res = await api.get(`/words/id/${id}`);
    return res.data;
  },
  wordByName: async (name) => {
    const res = await api.get(`/words/name/${name}`);
    return res.data;
  },
  wordsByFirstChar: async (char) => {
    const res = await api.get(`/words/char/${char}`);
    return res.data;
  },
  editWord: async (params, body, token) => {
    const res = await api.put(`words/edit-word/${params}`, body, {
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
  simpleSearch: async (body, query) => {
    const res = await api.post(`words/simple-search?input=${query}`, body);
    return res.data;
  },
  reverseSearch: async (body) => {
    const res = await api.post("words/reverse-search", body);
    return res.data;
  },
  tabs: async (word) => {
    const res = await api.get(`words/tabs/${word}`);
    console.log(word);
    return res.data;
  },
};

export default wordsApi;
