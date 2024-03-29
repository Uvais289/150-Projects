// Home.js
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

function Home() {
  return (
    <Box textAlign="center" py={8}>
      <Heading>Welcome to our E-Commerce Application!</Heading>
      <Text mt={4}>Explore our amazing collection of products.</Text>
    </Box>
  );
}

export default Home;
