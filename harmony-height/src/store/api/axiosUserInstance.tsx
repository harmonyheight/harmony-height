import axios from "axios";
// Create an Axios instance
const axiosUserInstance = axios.create({
    baseURL: 'http://api.harmonyheightsresidences.com:8080/api',
});

// Add a request interceptor to inject the access token
axiosUserInstance.interceptors.request.use(
    (config) => {
        // You can get the access token from your storage or wherever it's stored
        const accessToken = localStorage.getItem("userToken");

        // Set the 'Authorization' header with the access token
        config.headers['Authorization'] = `Bearer ${accessToken}`;

        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
);

export default axiosUserInstance;