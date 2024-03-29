import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Grid, Skeleton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AuthContext } from  './AuthContext'
import { fetchProducts } from '../utils/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = React.useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (!isAuthenticated) {
    return (
      <Box textAlign="center" py={4}>
        <Text fontSize="lg">Please Login to view products</Text>
      </Box>
    );
  }

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
            <Link key={product.id} to={`/products/${product.id}`}>
              <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={3}
              >
                <Box h="200px" bgSize="cover" bgImage={product.image}>
                  {/* Replace with actual image loading */}
                </Box>
                <Box mt={2}>
                  <Heading as="h5" size="md">
                    {product.name}
                  </Heading>
                  <Text>{product.price}</Text>
                </Box>
              </Box>
            </Link>
          ))
        )}
      </Grid>
    </Box>
  );
}

export default Products;
