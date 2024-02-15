// Chakra imports
import {
  Button,
  Flex,
  Grid,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
// Custom ./components
import Card from "./components/Card/Card";
import CardBody from "./components/Card/CardBody";
import CardHeader from "./components/Card/CardHeader";
import React, { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import ProjectCard from "./ProjectCard";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";

const Projects = ({ title, description }) => {
  const { user } = useContext(AuthContext);
  const [companies, setCompanies] = useState([]);


  const fetchCompanies = async (id) => {

    try {
      const response = await axios.get(`http://127.0.0.1:8000/companies/${user.userInfo._id}/`
      );
      console.log(response.data)
      setCompanies(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);
  const textColor = useColorModeValue("gray.700", "white");
const hoverStyle={
  background:useColorModeValue("#b3c0e6db", "#b3c0e6db"),
  textColor: useColorModeValue("rgb(26,27,32)", "white")

}

  return (

    <Flex marginTop={'50px'} background={useColorModeValue("#e1e8fcdb", "gray.700")}
    boxShadow= 'rgba(0, 0, 0, 0.02) 0px 3.5px 5.5px'
    borderRadius=' 15px' minWidth={'100%'} >
    <Card p='16px' my='24px'>
      <CardHeader p='12px 5px' mb='12px'>
        <Flex direction='column'>
          <Text fontSize='lg' color={textColor} fontWeight='bold'>
            {title}
          </Text>
          <Text fontSize='sm' color='gray.500' fontWeight='400'>
            {description}
          </Text>
        </Flex>
      </CardHeader>
      <CardBody px='5px'>
        <Grid
          templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
          templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
          gap='24px'>
       {companies.map((company) => (
        <>
          <ProjectCard
            name={company.name}
            category={company.type}
            description={
              company.about
            }
          />
          
          </>
       ))}
          <Button
            p='0px'
            bg='transparent'
            _hover={hoverStyle}
            color='gray.500'
            marginLeft={'20px'}
            border='1px solid lightgray'
            borderRadius='15px'
            minWidth={{ sm: "180px" }}
            minHeight={{ sm: "180px"}}>
            <Flex direction='column' w={'100%'} justifyContent='center' align='center'>
              <Icon as={FaPlus} fontSize='lg' mb='12px' />
              <Text fontSize='lg' fontWeight='bold' >
                Agregar Compania
              </Text>
            </Flex>
            
          </Button>
          <Button
            p='0px'
            bg='transparent'
            _hover={hoverStyle}
            color='gray.500'
            marginLeft={'20px'}
            border='1px solid lightgray'
            borderRadius='15px'
            minWidth={{ sm: "180px" }}
            minHeight={{ sm: "180px"}}>
            <Flex direction='column' w={'100%'} justifyContent='center' align='center'>
              <Icon as={FaPlus} fontSize='lg' mb='12px' />
              <Text fontSize='lg' fontWeight='bold' >
                Conectar Splitwise
              </Text>
            </Flex>
            
          </Button>
        </Grid>
      </CardBody>
    </Card>
    </Flex>
  );
};

export default Projects;
