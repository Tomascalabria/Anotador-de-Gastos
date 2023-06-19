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
  import { useState, useEffect, useContext } from "react";
  import { FaSyncAlt } from "react-icons/fa";
  import axios from 'axios'
  import { AuthContext } from "../../../Context/AuthContext";

  export const Balances = ({ company }) => {
    const { user } = useContext(AuthContext);
    const { colorMode } = useColorMode();
    const [balances, setBalances] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(null);
    const { name, type, logo, about, id } = company;
    const fetchCredentials = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/credentials/${id}/${user.userInfo._id}`, {
        
            user_id: user.userInfo._id,
            company_id:id
          
        });
        
        const { username, password } = response.data;
        console.log(response.data)
        fetchData(username, password);
      } catch (error) {
        console.log(error);
      }
    };
    
    const fetchData = async (username, password) => {
      try {
        const response = await axios.post(`http://127.0.0.1:8000/companies/${user.userInfo._id}/`, {
          user_id: user._id,
          company_id: id,
          username,
          password
        });
        setBalances(response.data.balance);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (error) {
        console.log(error);
      }
    };
    console.log(logo)
    useEffect(() => {
      fetchCredentials();
    }, []);

      const hoverStyle = {
        background: colorMode === "dark" ? "purple.900" : "#b3c0e6db",
        cursor: "pointer",
        opacity: "0.9",
      };

      const cardStyle = {
        transition: "background 0.6s",
      };

      const cardProps = {
        borderWidth: "1.2px",
        borderColor: colorMode === "dark" ? "gray.600" : "gray.200",
        _hover: hoverStyle,
        background: colorMode === "dark" ? "#242e40" : "#fffffef",
        style: cardStyle,
        margin:'20px'
      };

      return (
        <>
        <Card w="400px" h={'200px'} {...cardProps} >
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
              Ult. Actualización: {lastUpdated}
            </Text>
            <Button size="sm" title="Refrescar balances" background="transparent" onClick={fetchData} colorScheme="blue">
              <Icon alignContent={'center'} justifyContent={'center'} display={'flex'}  as={FaSyncAlt} boxSize={4} color="blue.500" marginBottom={'5px'} />
            </Button>
          </CardFooter>
        </Card>
      </>
    );
  };