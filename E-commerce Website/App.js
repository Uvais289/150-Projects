import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home';
import Login from './pages/Login';
import Product from './pages/Product';
import SingleProduct from './pages/SingleProduct';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/products/:productId" component={SingleProduct} />
          <PrivateRoute path="/products" component={Product} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
