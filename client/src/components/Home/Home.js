import React, { useEffect, useState } from 'react';
import { Box, ChakraProvider,Text, Container, useColorMode, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';

export const Home = () => {

  // Assign the background color based on colorMode outside of the JSX expression
  

  return (
    <Container background={useColorModeValue('white', 'gray.800')} minWidth={'100%'} w={'100%'} h={"xl"}>

    </Container>
  );
};
