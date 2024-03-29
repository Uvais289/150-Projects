import React, { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Import AuthContext for logout functionality
import { Button } from '@chakra-ui/react';

function Logout() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <Button onClick={handleLogout}>Logout</Button>
  );
}

export default Logout;
