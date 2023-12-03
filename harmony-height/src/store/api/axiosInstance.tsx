import axios from "axios";
// Create an Axios instance
export const axiosInstance = axios.create({
    baseURL: 'http://api.harmonyheightsresidences.com/api',
});