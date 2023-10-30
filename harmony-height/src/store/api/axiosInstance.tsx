import axios from "axios";
// Create an Axios instance
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
});