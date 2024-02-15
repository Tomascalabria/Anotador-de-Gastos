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
  useColorMode,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";
import { UserProfile } from "../../../UserProfile/UserProfile";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { FriendsContactButton } from "./FriendsContactButton";
import { AccountsContactButton } from "./Accounts";

export const ModalMenu = ({ handleLogout }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { colorMode, toggleColorMode } = useColorMode();

  // const friends = [
  //   { name: "Ver Amigxs", index: 1, route: "/amigos/ver" },
  //   { name: "Agregxr amigos", index: 2, route: "/amigos/agregar" },
  // ];

  const accounts = [
    { name: "Balances", index: 1, route: "/cuentas/balances" },
    { name: "Movimientos", index: 2, route: "/cuentas/movimientos" },
  ];

  return (
    <>
      <IconButton
        background={"transparent"}
        onClick={toggleColorMode}
        icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      />

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
          <DrawerHeader display="inline-flex" w="lg">
            <Text>Menu de Inicio</Text>
          </DrawerHeader>

          <DrawerBody display="flex" flexDir="column" height="100%" alignItems="center">
            <Flex flexDir="column" align="center" justifyContent="space-between" marginTop="2rem" width="100%" h="40%" alignItems="center">
              <ButtonGroup justifyContent="center" variant="link" spacing="8">
                <Link to="/">Inicio</Link>
              </ButtonGroup>

              <ButtonGroup spacing="8">
                <AccountsContactButton props={{ onClose }} accounts={accounts} key={accounts.index} />
              </ButtonGroup>

         
              <ButtonGroup spacing="8">
                <FriendsContactButton props={{ onClose }} friends={friends} key={friends.index} />
              </ButtonGroup>

              <ButtonGroup marginBottom="-12rem">
                <UserProfile />
              </ButtonGroup>
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <ButtonGroup justifyContent="center" w="100%" onClick={onClose}>
              <Button w="%" _hover={{ background: "red.600" }} variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            </ButtonGroup>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
