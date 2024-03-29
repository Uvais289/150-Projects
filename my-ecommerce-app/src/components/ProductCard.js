// ProductCard.js
import React from 'react';
import { Box, Heading, Text, Link } from '@chakra-ui/react';

function ProductCard({ product }) {
  return (
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
  );
}

export default ProductCard;
