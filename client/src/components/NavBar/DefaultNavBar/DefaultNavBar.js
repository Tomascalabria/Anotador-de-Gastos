import React from 'react';
import {
  Box,
  Button,
Text,
  Flex,
  HStack,
  useBreakpointValue,
  useColorModeValue,
  IconButton,
  useColorMode,
  ButtonGroup,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ModalDefaultMenu } from './ModalDefaultMenu.js';

import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export const DefaultNavBar = () => {
  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  });
  // const titleColor = useColorModeValue('primary', 'white');
  const { colorMode, toggleColorMode } = useColorMode();
  
  const hoverStyle = {
    background: colorMode === "dark" ? "purple.900" : "#b3c0e6db",
    cursor: "pointer",
    opacity: "0.9",
  };

  return (
    <Box
      as="section"
      w="100%"
      display="inline-flex"
      justifyContent="center"
      alignContent={'center'}
      bg={useColorModeValue('white', 'rgb(26,27,32)')}
      pb={{
        base: '12',
        md: '18',
      }}
    >
      <Box
        as="nav"
        bg={useColorModeValue('white', 'rgb(26,27,32)')}
        w="100%"
        justifyContent="center"
        display="inline-flex"
        boxShadow={useColorModeValue('sm', 'sm-dark')}
      >
        <Flex py={{ base: '4', lg: '5' }} borderBottom={'solid gray 0.01px '}  paddingBottom={'0'}  w="100%" justifyContent="space-around" alignContent={'center'}>
          <Box p="3">
            <Link to="/"><ButtonGroup justifyContent="space-evenly" h={'100%'} display="inline-flex" alignItems="center" alignContent={'center'}>      <Text

fontSize="3xl"
ml="1"
color={useColorModeValue('brand.500', 'white')}
fontWeight='bold'
>
FinAnalitycs


</Text></ButtonGroup>
                
            
            </Link>
          </Box>

          {isDesktop ? (
            <Flex justifyContent="space-evenly" width="65%" display="inline-flex" alignItems="center" alignContent={'center'} >
              <HStack spacing="12">
                <Link to="/login" > 
                  <Button variant="ghost" style={{ marginLeft: '6em' }} _hover={hoverStyle}>
                    Sign in
                  </Button>
                </Link>

                <Link to="register">
                  <Button variant="ghost" _hover={hoverStyle}> Sign up</Button>
                </Link>
              </HStack>

              <IconButton
                background="transparent"
                
                onClick={toggleColorMode}
                icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
              />
            </Flex>
          ) : ( 
            <ModalDefaultMenu />
          )}
        </Flex>
      </Box>
    </Box>
  );
};

