import React, { useEffect, useState } from 'react';
import { Box, ChakraProvider,Text, Container, useColorMode, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';

export const Home = () => {

  // Assign the background color based on colorMode outside of the JSX expression
  const bg=useColorModeValue('gray.100', 'gray.800')

  return (
    <Container bg={bg} w={'100%'} h={"xl"}>

    </Container>
  );
};
