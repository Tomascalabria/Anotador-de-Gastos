import React, { useEffect, useState } from 'react';
import { Box, ChakraProvider, Container, useColorMode } from '@chakra-ui/react';
import axios from 'axios';

export const Home = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  // Assign the background color based on colorMode outside of the JSX expression
  const bgColor = colorMode ==='light' ? '#F5F5F5' : '#2A2A2A'

  return (
    <Container bg={bgColor} w={'xl'} h={"xl"}>

    </Container>
  );
};
