import { Box, Stack,FormControl,Input, Flex, Table, Thead, Tbody,Tr,Td, Th, IconButton, useColorModeValue,Text, ButtonGroup} from '@chakra-ui/react'
import {AddIcon, CheckIcon, SearchIcon} from '@chakra-ui/icons'
import axios from 'axios'
import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'

export const AddFriends = () => {
const [friends,setFriends]=useState([])
const [response,setResponse]=useState([])
const [addedFriend,setAddedFriend]=useState([])
const friend=useRef()
const {user,dispatch}=useContext(AuthContext)

const url_friends_add='https://controladorgastosapi.herokuapp.com/friends/add'
const url_friends_get=`https://controladorgastosapi.herokuapp.com/friends/${user.userInfo._id}/search`
// const local_url_friends_add='http://localhost:5050/friends/add'
// const local_url_friends_get=`http://localhost:5050/friends/${user.userInfo._id}/search`


/**
* Submits an API call with the search values. Once the response is returned 2 states are setted. One with the actual response and another one with the friends that the user has already added.
*
 
 * @returns searched value || '   '.
 */

const handleSubmit=async(e)=>{
  e.preventDefault()
  const request=await axios.post(`${url_friends_get}`,
  {search:friend.current.value.toLowerCase(),
  },{headers:{
    token:user.token,

  }})
  .then((response)=>{

    setFriends(response.data.data)
    
    console.log(addedFriend)
    console.log(friends)
  })

}
/**
* Submits a request to the BackEnd and returns the refreshed state from our current user.
*
 
 * @returns User.
 */

const refreshUser = async () => {
  try {
    dispatch({ type: "UPDATE_USER" });
  } catch (err) {
    console.log(err);
  }
}

/**
* Submits an API call with the friend you have previously searched for and you wish to add. Once the response is returned we set a state with the response and we clear it after 3 seconds. 
*
* @param id   Type: Number -  id of the user you are adding. It takes the value from the button _key.
* @returns searched value || '   '.
*/

const handleClick=async (id,e)=>{
    e.preventDefault()
  const newFriend= await axios.post(`${url_friends_add}`,{
    friend:id,
    id:user.userInfo._id
    },{headers:{
        token:user.token,
        username:user.userInfo.username    
        
      }
    })
    .then((res)=>{
  refreshUser()
  setResponse(res.data)
      })

.catch((err)=>{setResponse( err.response.data)})

setTimeout(()=>{
  setResponse([])
  },3000)

  }


    return (
      <Flex  flexWrap={'wrap'} flexDir='row' w={'90%'} h='100%' justifyContent={'space-evenly'} alignContent='center'>
        <Box 
        w={'42%'} 
        display='flex'
        minW={'350px'}
        marginTop={'2rem'}
        alignContent={'space-evenly'}
        justifyContent='center'
      >
    


    <Stack w={'80%'}>
        <form style={{height:'45%',display:'flex',flexDirection:'column'  ,justifyContent:'center'}}>
        
        <FormControl display={'flex'}  flexDirection='row' alignContent='space-around'  justifyContent={'space-around'} alignItems={'flex-start'}   >
      
          <Input id="friends" required={true} borderRadius='25px' type="text" w={'100%'} title='Ingrese el usuario de su amigx' placeholder='Ingrese el usuario de su amigx' onChange={handleSubmit}  _focus={{ background:useColorModeValue('#B0D1C4','#4a4e69'  ),fontWeight:'semibold'}} ref={friend}  name='friends' />
          <IconButton aria-label='Search database'background={'transparent'} type='submit'  _hover={{background:'transparent'}} icon={<SearchIcon color={useColorModeValue('darkblue','coral')}  marginLeft='5px'/>} />
          </FormControl>
          
         
        
          </form>
          </Stack>
        </Box>
        <Box w={'100%'} justifyContent='flex-start 'alignItems={'center'} alignContent='center' display={'flex'} flexDir='column'   maxW='950px' h='md'  marginTop={'2rem'}>
  <Table  display='table'  justifyContent={'center'} textAlign='center' variant={'simple'} background={useColorModeValue('transparent','gray.800')}>

    <Thead   color={useColorModeValue('blackAlpha.800','blue.400')}>
    <Tr color="gray.400">
   
      <Th color={useColorModeValue("blackAlpha.800",'white')}>Username</Th>
      <Th color={useColorModeValue("blackAlpha.800",'white')}>Email</Th>
      
    </Tr>
  </Thead>
  <Tbody w={'xl'}> 
    {    
 friends.map((row) => {
  
  return (
    <>
<Tr >
  <Td >{row.username}</Td>
  <Td>{row.email}</Td>
  <Td cursor={'pointer'} >  <AddIcon  key={row._id} onClick={(e)=>handleClick(row._id,e)}/>{response.status!=='Success'?<Text marginTop={'0.5rem'} color={'red.500'}>{response.message}</Text>:<ButtonGroup><CheckIcon color={'green.600'}/><Text color={'green.500'}>{response.message}</Text></ButtonGroup> }</Td>
  </Tr>      
 
</>
  
  )
}
 )}
  
  </Tbody>
</Table>


        </Box>
        </Flex>
  )
}
