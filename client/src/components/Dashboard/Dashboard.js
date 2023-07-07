import { Flex, useColorModeValue, useColorMode } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { Balances } from "./Companies/investments";
import { AuthContext } from "../../Context/AuthContext";
import axios from 'axios';

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
  return (
    <Flex
      h="100vh"
      bg={useColorModeValue('gray.200', '#1A202C')}
      w="xxl%"
      paddingTop="20px"
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="center"
    >
      {companies.map((company) => (
      
          <Balances company={company} />
   
      ))}
    </Flex>
  );
};
