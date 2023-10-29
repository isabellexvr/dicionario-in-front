import api from "../api.js"

export const usersApi = {
    createNewUser: async(body) => {
        const res = await api.post("/users/sign-up", body);
        return res.data;
    },
    signInUser: async(body)=>{
        const res = await api.post("/auth/sign-in", body);
        return res.data;
    }
}

