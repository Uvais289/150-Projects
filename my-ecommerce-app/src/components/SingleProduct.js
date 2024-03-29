import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Skeleton } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../utils/api';

function SingleProduct() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProduct(productId);
        setProduct(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [productId]);

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
