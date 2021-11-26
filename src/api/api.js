import axios from 'axios'


const url = 'https://petra-backend.herokuapp.com/'
const api = axios.create({
    baseURL: url
})

axios.defaults.withCredentials = true


api.interceptors.request.use(async config => {
    return config
})

api.interceptors.response.use(response => {
    let data = response.data
    return data
})

export default api
