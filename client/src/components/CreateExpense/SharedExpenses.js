import React,{useContext, useEffect, useState} from "react";
import { Flex, FormControl, FormHelperText, FormLabel, Text, useColorModeValue } from "@chakra-ui/react";
import {Link} from 'react-router-dom'
import {
  AutoComplete,
  AutoCompleteTag,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { AuthContext } from "../../Context/AuthContext";
import axios from 'axios'

export const SharedExpenses=({props})=> {
  const [friends,setFriends]=useState([])
const {user }=useContext(AuthContext)
const route=''
  const getFriends=async ()=>{
    const friends =await axios.get(`https://controladorgastosapi.herokuapp.com/${user.userInfo._id}/search`)
    .then((res)=>{
      setFriends(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    getFriends()
  },[])
  return (
    <Flex  justify="center" align="center" w="full" direction="column">
    <FormControl id="email" w="60">
      <FormLabel >Que no se te hagan las ratas... <Text fontSize={'12px'}>Agrega tus amigxs</Text></FormLabel>
      
      <AutoComplete openOnFocus multiple onChange={(vals)=>{{props.setFriendsToShare(vals)}}}>
        <AutoCompleteInput autoComplete="off" placeholder="Search..."  variant="filled">
          {({ tags }) =>
            tags.map((tag, tid) => (
              
              <AutoCompleteTag
                key={tid}
                label={tag.label}
                onRemove={tag.onRemove}
              />
              
              ))

          }
        </AutoCompleteInput >
        <AutoCompleteList>
          {friends.map((friend) => (
            <AutoCompleteItem 
              key={`option-${friend.friend_id}`}
              value={friend.friend_username}
              textTransform="capitalize"
              _selected={{ bg: "whiteAlpha.50" }}
              _focus={{ bg: "whiteAlpha.100" }}
              
              
         >
          {friend.friend_username}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
      <FormHelperText>No encontras a alguien?<Link to={'/amigos/agregar'}><Text color={useColorModeValue('blue','lightblue')} >Agregalo a tus amigos!</Text></Link></FormHelperText>
    </FormControl>
  </Flex>
  );
}


