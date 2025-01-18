import { mockApi } from './mockApi';

// Use mockApi instead of axios during development
const api = mockApi;

export const setAuthToken = (token: string) => {
  // Mock implementation
  console.log('Setting auth token:', token);
};

export const removeAuthToken = () => {
  // Mock implementation
  console.log('Removing auth token');
};

export default api;