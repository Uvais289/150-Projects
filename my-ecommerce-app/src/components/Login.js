import React, { useState } from 'react';
import { Box, Heading, VStack, FormLabel, FormControl, Input, Button, Text } from '@chakra-ui/react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Simulate login with a mock API (replace with your actual login logic)
    try {
      const response = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming successful login returns a token
        console.log('Login successful! Token:', data.token); // Handle token appropriately (potentially dispatch an action or store in context)
      } else {
        setError('Login failed');
      }
    } catch (error) {
      console.error(error);
      setError('Login failed');
    }
  };

  return (
    <Box textAlign="center" py={8}>
      <Heading>Login</Heading>
      <VStack spacing={4} mt={8}>
        <FormControl isRequired>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button type="submit" onClick={handleSubmit}>
          Login
        </Button>
        {error && <Text color="red.500">{error}</Text>}
      </VStack>
    </Box>
  );
}

export default Login;
