import api from "../api.js"

export default async function wordsApi(){
    const res = await api.get("/words");
    console.log(res)
    return res.data
}