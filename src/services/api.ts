import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Will be configured later with actual API URL
});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const removeAuthToken = () => {
  delete api.defaults.headers.common['Authorization'];
};

export default api;