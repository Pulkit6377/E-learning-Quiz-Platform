import axios from 'axios';

const api = axios.create({
    baseURL:"https://e-learning-quiz-platform-1mgb.onrender.com/api"
})

api.interceptors.request.use((req)=>{
    const token = localStorage.getItem("token");
    if(token){
        req.headers.Authorization = token;
    }
    return req;
})

export default api;
