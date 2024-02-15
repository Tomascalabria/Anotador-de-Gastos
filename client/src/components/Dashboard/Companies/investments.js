  import React, { useState, useEffect, useContext } from "react";
  import axios from "axios";
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
    Flex,
    TabList,
    Tabs,
    Tab,
    TabPanel,
    flexbox,
    SimpleGrid,
    useColorModeValue,
    background,
  } from "@chakra-ui/react";
  import { FaSyncAlt } from "react-icons/fa";
  import { AuthContext } from "../../../Context/AuthContext";
  import { Link } from "react-router-dom";
import MiniStatistics from "../Portfolio/Ministats/Ministats";
import { CartIcon, DocumentIcon, GlobeIcon, WalletIcon } from "../Portfolio/Ministats/icons";

  export const Balances = ({ company }) => {
    const { user } = useContext(AuthContext);
    const { colorMode } = useColorMode();
    const [balanceData, setBalanceData] = useState({
      balance_ars: "",
      last_updated: null,
    });
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const { name, type, logo, about, id } = company;

    const fetchCredentials = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/credentials/${id}/${user.userInfo._id}/`
        );
        if (response.data) {
          setCredentials({
            ...credentials,
            username: response.data.username,
            password: response.data.password,
          });
        } else {
          console.log("Credentials not found");
        }
      } catch (error) {
        console.error("Error fetching credentials:", error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/balance/${id}/${user.userInfo._id}/`,
          {
            params: {
              user_id: user.userInfo._id,
              company_id: id,
              username: credentials.username,
              password: credentials.password,
            },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // console.log(response.data);
        const date = new Date(response.data.last_updated);

        // Format the date as a string
        const formattedDate = date.toLocaleString(); // Adjust locale options if needed
        
        setBalanceData({
          balance_ars: response.data.balance_ars,
          last_updated: formattedDate,
          balance_usd:response.data.balance_usd        });

      } catch (error) {
        console.error("Error fetching balance data:", error);
      }
    };
    

    const updateData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/balance/update/${id}/${user.userInfo._id}/`,
          {
            params: {
              username: credentials.username,
              password: credentials.password,
              company_id: id,
              user_id: user.userInfo._id,
            },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const date = new Date(response.data.last_updated);

        // Format the date as a string
        const formattedDate = date.toLocaleString(); // Adjust locale options if needed
        
        setBalanceData({
          balance_ars: response.data.balance_ars,
          last_updated: formattedDate,
          balance_usd:response.data.balance_usd
        });
      } catch (error) {
        console.error("Error updating data:", error);
      }
    };

    useEffect(() => {
      fetchCredentials();
    }, []);

    useEffect(() => {
      fetchData();
      
    }, [credentials]); // Trigger fetchData when credentials change

    // console.log(credentials);
    const iconBoxInside = useColorModeValue("white", "white");

    const hoverStyle = {
      background: colorMode === "dark" ? "rgb(26,27,32)" : "#white",
      cursor: "pointer",
      opacity: "0.9",
    };

    const containerStyle = {
      transition: "background 0.6s",
      bg:'rgb(26,27,32)'
    };

  
    const ContainerProps = {
    };
        
    const cardStyle = {
      transition: "background 0.6s",
    };

    const cardProps = {
      style: {
        ...containerStyle,
        transition: 'background 0.6s ease 0s',
        // boxShadow: 'inset rgba(0, 0, 205, 0.3) -10px 5px 20px 2px',
  
      },
      margin: { base: '5px', md: '10px' },
      w: {base: 'container.sm', md: 'container.sm', lg: '300px' }
    };
    
    return (<>
      <Card  {...cardProps}>
<CardBody w="100%" h={"90%"}  >
  <Link key={company.id} to={`/companies/${name}`}>
    <Container
      display={"flex"}
      h={'100%'}
      flexDir={"column"}
    >
        <Flex
          width="100%"
          height="100%"
          justifyContent={'flex-start'}
          alignItems={'flex-start'}>
          {/* <Img
            src={logo}
            color={colorMode === "dark" ? "dark.text" : "light.text"}
            width="40px"
            marginLeft={'-20px'}
            height="40px"
          /> */}
          <Flex w={'100%'}  justifyContent={'flex-start'} alignSelf={'left'} ><Text marginTop={'0'} fontSize="md" color="gray.100">USD</Text></Flex>
        
        <Text w={'100%'} 
          color={colorMode === "dark" ? "dark.text" : "light.text"}
          style={{ fontWeight: "bold", fontSize: "18px", letterSpacing: "1.6px" }}
          >
          U{balanceData.balance_usd}
        </Text>
          </Flex>
    </Container>
  </Link>
</CardBody>
<Divider />
<CardFooter
  display="flex"
  flexDirection="row"
  alignItems="center"
  width="100%"
  height="40%"
  justifyContent="space-between"
  // Adjust the gap as needed
>
  <Text fontSize="sm" color="gray.500">
    {balanceData.last_updated}
  </Text>
  <Button
    size="md"
    title="Refrescar balances"
    background="transparent"
    color={"white"}
    _hover={{ color: '#66a400', background: 'transparent' }}
  >
    <Icon
      alignContent={"flex-end"}
      onClick={updateData}
      justifyContent={"flex-end"}
      _hover={{ color: '#66a400', background: 'rgb(26,27,32)' }}
      display={"flex"}
      as={FaSyncAlt}
      boxSize={4}
      color="white"
    />
  </Button>
</CardFooter>
</Card>


<Card  {...cardProps}>
<CardBody w="100%" h={"70%"}>
  <Link key={company.id} to={`/companies/${name}`}>
    <Container
      display={"flex"}
      h={'100%'}
      flexDir={"column"}
    >
        <Flex
          width="100%"
          height="100%"
          justifyContent={'flex-start'}
          alignItems={'flex-start'}>
          {/* <Img
            src={logo}
            color={colorMode === "dark" ? "dark.text" : "light.text"}
            width="40px"
            marginLeft={'-20px'}
            height="40px"
          /> */}
         <Flex w={'100%'}  justifyContent={'flex-start'} alignSelf={'left'} ><Text marginTop={'0'} fontSize="md" color="gray.100">
            AR$
          </Text>
        
        </Flex>
        <Text
          w={'100%'} 
          color={colorMode === "dark" ? "dark.text" : "light.text"}
          style={{ fontWeight: "bold", fontSize: "18px", letterSpacing: "1.6px" }}
        >
          {balanceData.balance_ars}
        </Text>
        </Flex>
    </Container>
  </Link>
</CardBody>
<Divider />
<CardFooter
  display="flex"
  flexDirection="row"
  alignItems="center"
  width="100%"
  height="40px"
  justifyContent="space-between"
  // Adjust the gap as needed
>
  <Text fontSize="sm" color="gray.500">
    {balanceData.last_updated}
  </Text>
  <Button
    size="md"
    title="Refrescar balances"
    background="transparent"
    color={"white"}
    _hover={{ color: '#66a400', background: 'transparent' }}
  >
    <Icon
      alignContent={"flex-end"}
      onClick={updateData}
      justifyContent={"flex-end"}
      _hover={{ color: '#66a400', background: 'rgb(26,27,32)' }}
      display={"flex"}
      as={FaSyncAlt}
      boxSize={4}
      color="white"
    />
  </Button>
</CardFooter>
  </Card>
  </>
    )}
     
//  <Flex flexDirection='column' pt={{ base: "180px", md: "50px" }} borderBottom={'solid 1PX WHITE'}   >
//       <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='44px' >

//       </SimpleGrid>
// </Flex>
//     )}
//     <MiniStatistics
//     title={"ARS"}
//     amount={balanceData.balance_ars}
//     percentage={''}
//     // icon={<WalletIcon h={"24px"} w={"24px"}  color={iconBoxInside} />}
//   />
//   <MiniStatistics
//     title={"USD"}
//     amount={balanceData.balance_usd}
//     percentage={5}
//     icon={<FaSyncAlt/>}
//   />
//   <MiniStatistics
//     title={"New Clients"}
//     amount={"+3,020"}
//     percentage={-14}
//     // icon={<DocumentIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
//   />
//   <MiniStatistics
//     title={"Total Sales"}
//     amount={"$173,000"}
//     percentage={8}
//     // icon={<CartIcon h={"24px"} w={"24px"} color={iconBoxInside} />}
//   />