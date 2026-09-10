import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// Create generic Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // For Sanctum CSRF cookies if needed
});

// Add a request interceptor to attach the auth token
api.interceptors.request.use(
  (config) => {
    // We can get the token directly from localStorage or from zustand
    const authStore = useAuthStore.getState();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
