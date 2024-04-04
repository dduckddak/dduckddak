import axios from 'axios';
import * as SecureStore from 'expo-secure-store';


const apiClient = axios.create({
  baseURL: 'https://j10e203.p.ssafy.io',
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});


apiClient.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
