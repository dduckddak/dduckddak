import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://j10e203.p.ssafy.io',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
