import axios from 'axios';
import { getToken } from './tokenStorage';

const api = axios.create({
  baseURL: 'https://food-lpc9.onrender.com/',
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }else{
    console.log(`no token found`);
  }
  return config;
});

export default api;