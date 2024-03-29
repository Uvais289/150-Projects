import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // Change this to your JSON server URL

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Add more API functions as needed
