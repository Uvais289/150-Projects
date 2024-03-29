import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './components/Login';
import Products from './components/Product';
import SingleProduct from './components/SingleProduct';
import Logout from './components/Logout';
import AuthContextProvider from './components/AuthContext'; 

export const AuthContext = createContext(null);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsAuthenticated(true);
      setToken(storedToken);
    }
  }, []);

  const login = (newToken) => {
    setIsAuthenticated(true);
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = { isAuthenticated, token, login, logout };

  return (
    <ChakraProvider>
      <AuthContextProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Products />} />
            <Route path="/products/:productId" element={<SingleProduct />} />
            {/* Other routes */}
          </Routes>
        </Router>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;