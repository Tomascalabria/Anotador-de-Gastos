import {
    Box,
    Button,
    ButtonGroup,
    WrapItem,
    Flex,
    useBreakpointValue,
    Heading,
    useColorMode,
    useColorModeValue,
    IconButton,
    ChakraProvider,
    ColorModeProvider,
    Icon,
  } from '@chakra-ui/react';
  import { Link, useNavigate } from 'react-router-dom';
  import icon from '../../../Icons/image-em8mmKxnS-transformed-removebg-preview.png'
  import { AuthContext } from '../../../Context/AuthContext';
  import { logoutProcess } from '../../../Context/ApiCall';
  import { ExpensesContactButon } from './ExpensesContactButon.js';
  import { UserProfile } from '../../../UserProfile/UserProfile';
  import { ModalMenu } from './ModalMenu';
  import { FriendsContactButton } from './FriendsContactButton';
  import { MoonIcon, SunIcon } from '@chakra-ui/icons';
  import { AccountsContactButton } from './Accounts';
  import { useContext } from 'react';
  
  export const SessionNavBar = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);
    const handleLogout = () => {
      logoutProcess(dispatch);
      navigate('/');
    };
  
    const { colorMode, toggleColorMode } = useColorMode();
    const titleColor = useColorModeValue('black', 'white');
  
    const friends = [
      { name: 'Ver Amigxs', index: 1, route: '/amigos/ver' },
      { name: 'Agregar amigxs', index: 2, route: '/amigos/agregar' },
    ];
    const accounts = [
      { name: 'Balances', index: 1, route: '/cuentas/balances' },
      { name: 'Movimientos', index: 2, route: '/cuentas/movimientos' },
      { name: 'Configuración', index: 3, route: '/cuentas/configuracion' },
    ];
    const expenses = [
      { name: 'Crear Gasto', index: 0, route: '/gastos/crear' },
      { name: 'Ver gastos', index: 1, route: '/gastos/ver' },
    ];
  
    const isDesktop = useBreakpointValue({
      base: false,
      lg: true,
    });
  
    return (
      <Box
        as="nav"
        bg={useColorModeValue('#e9fbfb', '##000')}
        w="100%"
        justifyContent="flex-start"
        boxShadow={useColorModeValue('sm', 'sm-dark')}
        borderBottom={useColorModeValue('solid .9px #a7eaff','solid .9px #515151')}
      >
        <Flex
          py={{ base: 4, lg: 5 }}
          w="100%"
          justifyContent="space-around"
          align="center"
          px={{ base: 4, lg: 8 }}
        >
        
          {isDesktop ? (
            <Flex alignItems="center" justifyContent={'space-around'} width={'80%'}>
              <ButtonGroup variant="link" spacing="8">
                <Link to="/"><IconButton ><img width={'150px'} height={'150px'} src={icon}></img></IconButton> </Link>
              </ButtonGroup>
              <ButtonGroup>
                <AccountsContactButton accounts={accounts} />
              </ButtonGroup>
              <ButtonGroup spacing="2">
                <ExpensesContactButon expenses={expenses} />
              </ButtonGroup>
              <ButtonGroup spacing="8">
                <FriendsContactButton friends={friends} />
              </ButtonGroup>
              <ButtonGroup spacing="4">
                <WrapItem>
                  <UserProfile />
                </WrapItem>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </ButtonGroup>
              <IconButton
                key="color-mode-toggle"
                background="transparent"
                onClick={toggleColorMode}
                icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
              />
            </Flex>
          ) : (
            <ModalMenu handleLogout={handleLogout} />
          )}
        </Flex>
      </Box>
    );
  };
  
  