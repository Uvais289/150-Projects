import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Note the change from 'Switch' to 'Routes'
import { ChakraProvider } from '@chakra-ui/react';
import Home from './components/Home/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import SingleProduct from './pages/SingleProduct';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <PrivateRoute path="/products/:productId" element={<SingleProduct />} />
          <PrivateRoute path="/products" element={<Product />} />
          <PrivateRoute path="/" element={<Home />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;