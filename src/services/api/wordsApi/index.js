import api from "../api.js"

const wordsApi = {
    allWords: async () => {
        const res = await api.get("/words");
        return res.data;
    },
    wordById: async (id) => {
        const res = await api.get(`/words/${id}`);
        return res.data;
    },
    wordByName: async(name) => {
        const res = await api.get(`/words/${name}`);
        return res.data;
    }
}

export default wordsApi