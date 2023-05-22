import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Button,
  Icon,
  Text,
  Heading,
  Stack,
  useColorMode,
  Img,
  Container,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaSyncAlt } from "react-icons/fa";
import axios from 'axios'
export const Balances = ({ company }) => {
  const { colorMode } = useColorMode(); // Get the current color mode
  const [balances, setBalances] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  const { name, type, logo, about } = company;

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:8080/${company.id}/balances`);
  //     setBalances(response.data.balance);
  //     setLastUpdated(new Date().toLocaleTimeString());
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

    const hoverStyle = {
      background: colorMode === "dark" ? "#2d2f38" : "#e7eee2",
      cursor: "pointer",
      opacity: "0.9",
    };

    const cardStyle = {
      transition: "background 0.6s",
    };

    const cardProps = {
      borderWidth: "1.2px",
      borderColor: colorMode === "dark" ? "gray.900" : "gray.200",
      _hover: hoverStyle,
      background: colorMode === "dark" ? "#2a2a2" : "#fffffef",
      style: cardStyle,
    };

    return (
      <>
      <Card w="400px" h={'200px'} {...cardProps}>
        <CardBody w="370px" h={"100%"}>
          <Container display={"flex"} flexDir={"column"} justifyContent={"center"}>
            <Stack
              width={"100%"}
              h={"80%"}
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "0",
                justifyContent: "flex-start",
              }}
            >
              <Img
                src={logo}
                color={colorMode === "dark" ? "dark.text" : "light.text"}
                width={"100px"}
                marginLeft={"-2.5"}
                height={"80px"}
                marginBottom={'20px'}
                marginTop={"-25px"}
                justifySelf={"flex-start"}
              />
            </Stack>
          </Container>
            <Text marginTop={"5px"} color={colorMode === "dark" ? "dark.text" : "light.text"}style={{ fontWeight: "bold", fontSize: "19px" }} letterSpacing={'2px'} >$ {balances} </Text>
        </CardBody>
        <Divider />
        <CardFooter display="inline-flex" w="100%" justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="gray.500">
            Ult. Actulización: {lastUpdated}
          </Text>
          <Button size="sm" title="Refrescar balances" background="transparent" onClick={'fetchData'} colorScheme="blue">
            <Icon as={FaSyncAlt} boxSize={4} color="blue.500" />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
