import axios from "axios";
// Create an Axios instance
export const axiosInstance = axios.create({
    baseURL: 'http://195.35.8.116/api',
});