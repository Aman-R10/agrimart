import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.101:5000/api/auth',
});

api.interceptors.request.use(
  (config) => {
    console.log("API Request Config:", config);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("API Response Data:", response.data);
    return response;
  },
  (error) => {
    console.error("API Response Error:", error.response || error.message);
    return Promise.reject(error);
  }
);


export default api;
