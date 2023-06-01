import React, { useRef } from "react";
import {
  Button,
  Drawer,
  IconButton,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  DrawerFooter,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Flex,
  ButtonGroup,
  Text,
  Container,
  useColorModeValue
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

export const ModalDefaultMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const bg=useColorModeValue('gray.100', 'gray.800')

  return (
    <>
    
      <IconButton
        variant="ghost"
        icon={<FiMenu fontSize="1.25rem" />}
        aria-label="Open Menu"
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
      />

      <Drawer 
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader display="inline-flex" w="lg" background={bg}>
            <Text>Menu de Inicio</Text>
          </DrawerHeader>

          <DrawerBody display="flex" flexDir="column" height="100%" alignItems="center"background={bg}> 
            <Flex flexDir="column" align="center" justifyContent="space-between" marginTop="2rem" width="100%" h="40%" alignItems="center">
              <ButtonGroup justifyContent="center" variant="link" spacing="8">
                <Link to="/">Inicio</Link>
              </ButtonGroup>

              <ButtonGroup spacing="8">
                <Link to="/login">
                  <Button onClick={onClose} variant="ghost" mx={3} py={[1, 2, 2]} px={4} borderRadius={5}>
                    Login
                  </Button>
                </Link>
              </ButtonGroup>

              <ButtonGroup marginBottom="-9rem">
                <Link to="/register">
                  <Button onClick={onClose} variant="ghost" mx={3} py={[1, 2, 2]} px={4} borderRadius={5}>
                    Register
                  </Button>
                </Link>
              </ButtonGroup>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
