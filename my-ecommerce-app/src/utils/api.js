export const fetchProducts = async () => {
  // ... existing logic to fetch products ...
};

export const fetchProduct = async (productId) => {
  try {
    const response = await fetch(`https://your-api-endpoint.com/products/${productId}`);
    if (response.ok) {
      const data = await response.json();
      return data; // Assuming the API returns a single product object
    } else {
      throw new Error('Failed to fetch product');
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};
