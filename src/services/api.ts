import axios from 'axios';
import { mockApi } from './mockApi';

// Use mockApi instead of axios during development
const api = mockApi;

export const setAuthToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const removeAuthToken = () => {
  delete api.defaults.headers.common['Authorization'];
};

export default api;