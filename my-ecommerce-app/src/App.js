import React, { useState, createContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Login from './components/Login';
import Products from './components/Product';
import SingleProduct from './components/SingleProduct';
import Logout from './components/Logout';
 

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
      <AuthContext.Provider value={value}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<Products />} /> {/* Assuming Products component is accessible */}
            <Route path="/products/:product_id" element={<SingleProduct />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}
 
export default App;