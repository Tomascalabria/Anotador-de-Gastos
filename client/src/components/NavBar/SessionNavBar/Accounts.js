import { useDisclosure, Menu, MenuButton, MenuItem, MenuList, Box, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';

export const AccountsContactButton = ({ accounts }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box as="div">
      <Menu isOpen={isOpen} onClose={onClose} placement="bottom-start">
        <MenuButton
          variant="#ghost"
          mx={3}
          py={[1, 2, 2]}
          px={4}
          borderRadius={5}
          _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
          aria-label="Courses"
          fontWeight="normal"
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          Cuentas
        </MenuButton>
        <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
          {accounts.map((item) => (
            <Link to={item.route} key={item.index}>
              <MenuItem onClick={onClose}>{item.name}</MenuItem>
            </Link>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
