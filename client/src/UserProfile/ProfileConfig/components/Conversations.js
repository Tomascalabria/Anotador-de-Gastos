// Chakra imports
import {
  Avatar,
  Button,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets





// Custom ././components
import Card from "./././components/Card/Card";
import CardBody from "././components/Card/CardBody";
import CardHeader from "././components/Card/CardHeader";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";

const Conversations = ({ title }) => {
  const textColor = useColorModeValue("gray.700", "white");
  const [friends,setFriends]=useState([])
const {user }=useContext(AuthContext)
const route=''
  const getFriends=async ()=>{
    const friends =await axios.get(`http://localhost:5050/users/${user.userInfo._id}/`,{
      headers:{
        token:user.token
      }
    })
    .then((res)=>{
      setFriends(res.data.userInfo.friends)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getFriends()
  },[])
  console.log(friends)

  return (
    <Card p='16px'>
      <CardHeader p='12px 5px' mb='12px'>
        <Text fontSize='lg' color={textColor} fontWeight='bold'>
          {title}
        </Text>
      </CardHeader>
      <CardBody px='5px'>
    {friends.map((friend)=>{

    
        <>
         <Flex justifyContent='space-between' mb='21px'>
            <Flex align='center'>
              <Avatar key={friend.friend_id}

                // src={friend.profile_picture}
                w='50px'
                h='50px'
                borderRadius='15px'
                me='10px'
              />
              <Flex direction='column'>
                <Text fontSize='sm' color={textColor} fontWeight='bold'>
                  {friend.friend_username}
                </Text>
                
              </Flex>
            </Flex>
            <Button p='0px' bg='transparent' variant='no-hover'>
              <Text
                fontSize='sm'
                fontWeight='600'
                color='teal.300'
                alignSelf='center'>
                Ver
              </Text>
            </Button>
          </Flex>
      </>
  })}
      </CardBody>
    </Card>
  );
};

export default Conversations;
