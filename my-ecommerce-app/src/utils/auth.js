import axios from 'axios';
import { getToken, removeToken, setToken } from './localStorage';

const BASE_URL = 'https://reqres.in/api'; // Change this to your authentication API URL

const api = axios.create({
  baseURL: BASE_URL,
});

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    const { token } = response.data;
    setToken(token);
    return token;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logout = () => {
  removeToken();
};

export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};
