import api from "../api.js"

const usersApi = {
    createNewUser: async(body) => {
        const res = await api.post("/users/sign-up", body);
        return res.data;
    }
}

export default usersApi;