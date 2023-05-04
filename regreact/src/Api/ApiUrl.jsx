import axios from 'axios';

let axiosInstance = axios.create({
    baseUrl: process.env.REACT_APP_API_URL
});

export default axiosInstance;