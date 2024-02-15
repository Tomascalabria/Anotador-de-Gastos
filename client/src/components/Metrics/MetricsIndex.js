import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { SplitwiseAuth } from './SplitwiseAuth';
import { Box, useColorModeValue } from '@chakra-ui/react';

export const Metrics = () => {

  const {user}= useContext(AuthContext)
 const isAuthenticated=user
  return (
    
    <Box style={{ bg: useColorModeValue('#ffff', 'rgb(26,27,32)  '), width: '100vhh', height: '100vh', margin: '0', padding: '0' }}>
      {isAuthenticated ? (
        // Render your metrics content when the user is authenticated
        <div>
          <SplitwiseAuth/>
          {/* Render your metrics components here */}
        </div>
      ) : (
        // Render the SplitwiseAuthentication component when the user is not authenticated
        <SplitwiseAuth/>      )}
    </Box>
  );
};

