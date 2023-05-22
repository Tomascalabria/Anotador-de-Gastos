import React from 'react';
import {
  Box,
  Button,
  Heading,
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
import icon from '../../../Icons/image-em8mmKxnS-transformed-removebg-preview.png'

import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export const DefaultNavBar = () => {
  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  });
  const titleColor = useColorModeValue('primary', 'white');
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="section"
      w="100%"
      display="inline-flex"
      justifyContent="center"
      alignContent={'center'}
      pb={{
        base: '12',
        md: '18',
      }}
    >
      <Box
        as="nav"
        bg={useColorModeValue('background', 'dark.background')}
        w="100%"
        justifyContent="center"
        display="inline-flex"
        boxShadow={useColorModeValue('sm', 'sm-dark')}
      >
        <Flex py={{ base: '4', lg: '5' }} w="100%" justifyContent="space-around" alignContent={'center'}>
          <Box p="3">
            <Link to="/"><ButtonGroup justifyContent="space-evenly" h={'100%'} display="inline-flex" alignItems="center" alignContent={'center'}><img width={'150px'} height={'150px'} src={icon}></img></ButtonGroup>
                
            
            </Link>
          </Box>

          {isDesktop ? (
            <Flex justifyContent="space-evenly" width="65%" display="inline-flex" alignItems="center" alignContent={'center'}>
              <HStack spacing="12">
                <Link to="/login">
                  <Button variant="ghost" style={{ marginLeft: '6em' }}>
                    Sign in
                  </Button>
                </Link>

                <Link to="register">
                  <Button variant="ghost">Sign up</Button>
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

