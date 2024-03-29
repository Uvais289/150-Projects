// Products.js
import React, { useState, useEffect } from 'react';
import { Box, Heading, Grid, Skeleton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../utils/api';
import ProductCard from './ProductCard';

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Products
      </Heading>
      <Grid gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
        {isLoading ? (
          <>
            <Skeleton height="200px" />
            <Skeleton height="200px" />
            <Skeleton height="200px" />
          </>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </Grid>
    </Box>
  );
}

export default Products;
