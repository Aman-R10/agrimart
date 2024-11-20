import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.107:5000/api/auth', // Replace with your actual backend IP address
});

export default api;
