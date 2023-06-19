// Chakra imports
import { Flex, Switch, Text, useColorModeValue } from "@chakra-ui/react";
// Custom ./components
import Card from "./components/Card/Card";
import CardBody from "./components/Card/CardBody";
import CardHeader from "./components/Card/CardHeader";
import React from "react";

const PlatformSettings = ({ title, subtitle1, subtitle2 }) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card p='16px'>
      <CardHeader p='12px 5px' mb='12px'>
        <Text fontSize='lg' color={textColor} fontWeight='bold'>
          {title}
        </Text>
      </CardHeader>
      <CardBody px='5px'>
        <Flex direction='column'>
          <Text fontSize='sm' color='gray.500'  width='220px' fontWeight='600' mb='20px'>
            {subtitle1}
          </Text>
          <Flex align='center' mb='20px'>
            <Switch colorScheme='teal' me='10px' />
            <Text   fontSize='md' color='gray.500'  width='220px'  fontWeight='400'>
              Notificarme cuando ingrese una nueva transación
            </Text>
          </Flex>
          <Flex align='center' mb='20px'>
            <Switch colorScheme='teal' me='10px' />
            <Text   fontSize='md' color='gray.500'  width='220px' fontWeight='400'>
              Notificarme cuando haga un gasto
            </Text>
          </Flex>
          <Flex align='center' mb='40px'>
            <Switch colorScheme='teal' me='10px' />
            <Text  fontSize='md' color='gray.500'  width='220px' fontWeight='400'>
            Notificarme cuando este por vencer un pago
            </Text>
          </Flex>
          <Text
            fontSize='sm'
            color='gray.500'  width='220px'
            fontWeight='600'
            m='6px 0px 20px 0px'>
            {subtitle2}
          </Text>
          <Flex align='center' mb='20px' w={'200px'}>
            <Switch colorScheme='teal' me='10px' />
            <Text   fontSize='md' color='gray.500'  width='220px' fontWeight='400'>
            Notificarme cuando varie el precio de una acción mas de 5%
            </Text>
          </Flex>
          <Flex align='center' mb='20px'>
            <Switch colorScheme='teal' me='10px' />
            <Text   fontSize='md' color='gray.500'  width='220px' fontWeight='400'>
            Notificarme cuando haya un movimiento extraño
            </Text>
          </Flex>
          <Flex align='center' mb='20px'>
            <Switch colorScheme='teal' me='10px' />
            <Text   fontSize='md' color='gray.500'  width='220px' fontWeight='400'>
            Notificarme cuando agregue nuevas cuentas
            </Text>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default PlatformSettings;
