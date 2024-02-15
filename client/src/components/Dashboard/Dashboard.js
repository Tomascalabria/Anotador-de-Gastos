import { Flex, useColorModeValue, useColorMode, Container } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { Balances } from "./Companies/investments";
import { AuthContext } from "../../Context/AuthContext";
import axios from 'axios';
import { Portfolio } from "./Companies/Portfolio";

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/companies/${user.userInfo._id}/`);
      console.log(response.data);
      setCompanies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

useEffect(()=>{
fetchCompanies()
},[])


  // Dashboard.js
return (
<Flex
  h={{ base: "auto", md: "120vh" }}
  bg={useColorModeValue("white", "#rgb(26,27,32)")}
  w="100%"
  flexDirection="row"
  flexWrap="wrap"
>
  <Container
    maxW={{ base: "100%", md: "container.xl" }}
    height={{ base: "auto", md: '20%' }}
    borderBottom={useColorModeValue("solid rgb(26,27,32) 1PX", "solid white 1px")}
    display="flex"
    justifyContent="center"
  >
    {companies.map((company) => (
      <Balances company={company} key={company.id} />
    ))}
  </Container>
  <Flex
    width="100%"
    justifyContent="flex-start"
    display="flex"
    height={{ base: "auto", md: '55%' }}
  >
    <Container
      width={{ base: "100%", md: "container.xl" }}
      height="100%"
      display="inline-flex"
      justifyContent="space-evenly"
      justifyItems="flex-start"
    >
      {companies.map((company) => (
        <Portfolio company={company} key={company.id} />
      ))}
    </Container>
  </Flex>
</Flex>
);

      }
    