import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Skeleton } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../utils/api';

function SingleProduct() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { product_id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProduct(product_id); // Call the fetchProduct function
      setProduct(data);
      setIsLoading(false);
    };
    fetchData();
  }, [product_id]); // Re-run useEffect when product_id changes

  return (
    <Box p={4}>
      {isLoading ? (
        <Skeleton height="400px" />
      ) : (
        <>
          <Heading as="h2" size="lg" mb={4}>
            {product.name}
          </Heading>
          <Box display="flex" justifyContent="space-between">
            <Text as="strong">Price:</Text>
            <Text>{product.price}</Text>
          </Box>
          <Text mt={4}>{product.description}</Text>
          {/* Add more product details here based on your data structure */}
        </>
      )}
    </Box>
  );
}

export default SingleProduct;
