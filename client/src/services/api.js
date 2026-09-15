import axios from 'axios';
const defaultBaseURL = import.meta.env.PROD ? '/api' : 'http://localhost:5000/api';
export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || defaultBaseURL, withCredentials: true });
