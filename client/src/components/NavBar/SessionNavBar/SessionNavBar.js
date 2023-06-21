import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  Stack,
  Image,
  Button,
  Heading,
  BoxProps,
  Drawer,
  DrawerContent,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  useColorModeValue,
  useColorMode
  
} from '@chakra-ui/react';

// Here we have used react-icons package for the icons
import { FaBell } from 'react-icons/fa';
import { AiOutlineTeam, AiOutlineHome } from 'react-icons/ai';
import { BsFolder2, BsCalendarCheck } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { RiFlashlightFill } from 'react-icons/ri';
import {Home} from '../../Home/Home'
import { UserProfile } from '../../../UserProfile/UserOptionsTab';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Link, NavLink } from 'react-router-dom';

export const  Index=()=> {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

const closeSideBarAfterRouting=()=>{
  setTimeout(() => {
    onClose()
  }, 1000);
}

  return (
    <Box as="section" background={useColorModeValue('gray.100', 'gray.800')} borderBottom={`solid 1px ${useColorModeValue('gray', 'white')}`} marginLeft={'0px'} h={'100%'} w={'100%' } justifyContent={'space-between'} alignContent={'center'} display={'flex'}>
        <IconButton marginLeft={'4px'} marginTop={'5px'} border={`solid 0.1px ${useColorModeValue('black', 'white')}`}
            aria-label="Menu"
            onClick={onOpen}
            icon={<FiMenu />}
            size="md"
          /> 
      <Drawer isOpen={isOpen} onClose={onClose} is placement="left" >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent  w="full" borderRight="none"  />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition="3s ease">
  
        <Flex
          as="header"
          align="center"
          justify={{ base: 'space-between', md: 'flex-end' }}
          w="100%"
          px="4"
          borderBottomWidth="1px"
          borderColor={useColorModeValue('inherit', 'gray.700')}
          bg={useColorModeValue('gray.100', 'gray.800')}
          boxShadow="sm"
          h="14"
        >
          
          <Flex align="left" >
            <IconButton background={'transparent'} _hover={{background:'gray.20'}}marginRight={'20px'} color={useColorModeValue('gray.800', 'white')} icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}  onClick={toggleColorMode} cursor="pointer" />
            <UserProfile/>
          </Flex>
        </Flex>

</Box>
    
    </Box>
  );
}

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
const SidebarContent = ({ ...props }) => (
  <Box
    as="nav"
    pos="fixed"
    top="0"
    left="0"
    zIndex="sticky"
    h="full"
    w={'40'}
    pb="10"
    overflowX="hidden"
    overflowY="hidden"
    bg={useColorModeValue('gray.100', 'gray.800')}
    borderColor={useColorModeValue('inherit', 'gray.700')}
    borderRightWidth="2px"
    {...props}
  >
    <Flex px="4" py="5" align="center">
      <Text

        fontSize="3xl"
        ml="1"
        color={useColorModeValue('brand.500', 'white')}
        fontWeight='bold'
      >
        PIANL
      </Text>
    </Flex>
    <Flex direction="column" justifyContent={'left'} alignItems={'left'} textAlign={'left'} as="nav" fontSize="md" color="gray.600" aria-label="Main Navigation">
      <NavItem route={'/'}   icon={AiOutlineHome}>Dashboard</NavItem>
      <NavItemGroup title="Cuentas">
        {accounts.map((item) => (
          <NavItem key={item.index} route={item.route}>{item.name}</NavItem>
        ))}
      </NavItemGroup>
      <NavItemGroup title="Gastos">
        {expenses.map((item) => (
          <NavItem key={item.index} route={item.route}>{item.name}</NavItem>
        ))}
      </NavItemGroup>
      <NavItemGroup title="Amigxs">
        {friends.map((item) => (
          <NavItem key={item.index} route={item.route}>{item.name}</NavItem>
        ))}
      </NavItemGroup>
    </Flex>
  </Box>
);

const NavItem = ({ route ,icon, children }) => {
  const color = useColorModeValue('gray.600', 'gray.300');

  return (
    <NavLink to={route}  >

    <Flex
      align="center"
      px="4"
      py="3"
      cursor="pointer"
      role="group"
      fontWeight="semibold"
      transition=".15s ease"
      color={useColorModeValue('inherit', 'gray.400')}
      _hover={{
        bg: useColorModeValue('gray.200', 'gray.900'),
        color: useColorModeValue('gray.900', 'gray.200')
      }}
    >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: color
            }}
            as={icon}
          />
        )}
        {children}
    </Flex>
      </NavLink>
  );
};

const NavItemGroup = ({ title, children }) => (
  <>
    <Flex px="4" py="2" align="center" color="gray.500" fontSize="sm">
      <Text>{title}</Text>
    </Flex>
    {children}
  </>
);
