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
import { Link } from "react-router-dom";

export const Balances = ({ company }) => {
  const { user } = useContext(AuthContext);
  const { colorMode } = useColorMode();
  const [balance, setBalance] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { name, type, logo, about, id } = company;

  const fetchCredentials = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/credentials/${id}/${user.userInfo._id}/`);
      response.data?
      setCredentials({ ...credentials, username: response.data.username, password: response.data.password }):console.log('')
      fetchData()
    } catch (error) {
      console.log(error);
    }
  };
  
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/balance/${id}/${user.userInfo._id}/`, {
        headers: {
          Accept: '*/*',
          ContentType: 'application/json',
          origin:''
          },
        data: {
          user_id: user.userInfo._id,
          company_id: id,
          username: credentials.username,
          password: credentials.password,
        },
      });
      
      console.log(response.data)
      setBalance(response.data.balance);
      setLastUpdated(response.data.lastUpdated);
    } catch (error) {
      console.log(error);
    }
  }


  const updateData = async () => {
    try {
      const payload = {
        username: credentials.username,
        password: credentials.password,
        user_id: user.userInfo.id,
        company_id: id,
      };
  
      const response = await axios.get(`http://127.0.0.1:8000/balance/update/${id}/${user.userInfo._id}/`, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: payload,
      });
      setBalance(response.data);
      setLastUpdated(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCredentials();
  
  }, []);

console.log(credentials)
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
    margin: '20px'
  };

  return (
    <>
      <Card w="400px" h={'200px'} {...cardProps}>
        <CardBody w="370px" h={"100%"}>
          <Link key={company.id} to={`/companies/${name}`}>
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
            <Text marginTop={"5px"} color={colorMode === "dark" ? "dark.text" : "light.text"}style={{ fontWeight: "bold", fontSize: "19px" }} letterSpacing={'2px'} >$ {balance} </Text>
          </Link>
        </CardBody>
        <Divider />
        <CardFooter display="inline-flex" w="100%" justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="gray.500">
            Ult. Actualización: {lastUpdated}
          </Text>
          <Button size="md" title="Refrescar balances" background="transparent" marginTop={'-10px'}  colorScheme="blue">
            <Icon alignContent={'center'} onClick={updateData}  justifyContent={'center'} display={'flex'}  as={FaSyncAlt} boxSize={4} color="blue.500" marginBottom={'5px'} />
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
