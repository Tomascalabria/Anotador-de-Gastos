import { ChakraProvider, Box, IconButton, Text } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { FaSyncAlt } from 'react-icons/fa';

import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';

export const Investments = () => {
  const { user } = useContext(AuthContext);
  const [balance, setBalance] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const fetchParams = async () => {
    try {
      const response = await axios.get('http://localhost:8000/parameters');
      const { cocos_username, cocos_password } = response.data;
      setUsername(cocos_username);
      setPassword(cocos_password);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/balance/', {
        params: {
          username: username,
          password: password,
        },
      });
      setBalance(response.data.balance);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchParams();
  }, []);

  useEffect(() => {
    if (username && password) {
      fetchData();
    }
  }, [username, password]);

  return (
    <ChakraProvider>
      <Box w="s" h="200px" bg="whiteAlpha.400" borderRadius="md" p={4}>
        <Text>Cocos Capital</Text>
        <Text fontSize="1.4rem" color="White" mb={4}>
          Balance: ${balance}
        </Text>
        <Box display="flex" alignItems="center" mb={2}>
          <Text fontSize="12px" mr={2}>
            Last Updated:
          </Text>
          <Text fontSize="sm" fontWeight="bold" mr={2}>
            {lastUpdated}
          </Text>
          <IconButton size={'12px'} icon={<FaSyncAlt />} aria-label="Update Balance" onClick={fetchData} />
        </Box>
      </Box>
    </ChakraProvider>
  );
};
    