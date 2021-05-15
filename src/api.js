import axios from "axios";
import {baseUrl} from "./url.json"
const api = axios.create({
    baseURL: baseUrl
})

export default api
