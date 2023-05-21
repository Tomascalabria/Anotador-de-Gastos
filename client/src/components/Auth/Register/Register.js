import {Box,Button,Container,FormControl,FormLabel,Heading,HStack,Input,Stack,Alert,AlertDescription,AlertIcon,AlertTitle,Text,useBreakpointValue,Flex,Icon,chakra} from '@chakra-ui/react'
import axios from 'axios'
import React,{ useContext, useRef, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthContext'
import { PasswordField } from '../PasswordField'
 
export const Register = () =>{
const navigate=useNavigate()
const [status,setStatus]=useState('')
const [response,setResponse]=useState('')
const {isFetching}=useContext(AuthContext)


const handleChange=()=>{
  console.log ({Username:username.current.value.length})
 
}
const username=useRef()
const email=useRef()
const password=useRef()
const handleSubmit=async(e)=>{
  e.preventDefault()
try{
  
  const res=await axios.post('https://controladorgastosapi.herokuapp.com/users/register',{username:(username.current.value).toLowerCase(),email:(email.current.value).toLowerCase(),password:password.current.value})
  console.log(isFetching)

  setStatus(res.status)
setResponse(res.data)
res.status===201?setTimeout(() => {
  navigate('/login', {replace: true});
}, 4000):<></>
  
  }
  catch(err){
    console.log(err)
  }
}




    return (
    
        <Container
        maxW="lg"
        py={{
            base: '12',
            md: '24',
        }}
        px={{
            base: '0',
            sm: '8',
        }}
        >
        <Heading size={useBreakpointValue({
            base: 'm',
            md: 'xl',
        })} textAlign={'center'} marginTop={'-2em'} >Registrate</Heading>
        <Stack spacing="8">
        <Stack spacing="6">
        
          <Stack
            spacing={{
                base: '2',
                md: '3',
            }}
            textAlign="center"
            >
           
            <HStack spacing="1" justify="center">
              <Text color="muted">Ya tenes cuenta?</Text>
             <Link to='/login' > <Button variant="link" colorScheme="blue">
                Logueate ashe pa
              </Button></Link>
            </HStack>
          </Stack>
        </Stack>
        <Box
          py={{
              base: '0',
              sm: '8',
            }}
            px={{
                base: '4',
                sm: '10',
            }}
            bg={useBreakpointValue({
                base: 'transparent',
                sm: 'bg-surface',
            })}
            boxShadow={'dark-lg'}
            borderRadius={{
                base: 'none',
                sm: 'xl',
            }}
            >
            
          <form onSubmit={handleSubmit}> 
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input id="username" type="username" name='username' onChange={handleChange} ref={username} />
              </FormControl >
              <FormControl>
              
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" type="email" name='email' ref={email} />
              </FormControl>
              <PasswordField ref={password}  />
              
            </Stack>
            
            <Stack spacing="6">
              <Button type={'submit'} fontWeight='bold' variant="primary" _hover={{background:'##F8FB', color:'black',border:'solid 0.2px black'}}>Registrarme</Button>
               

            </Stack>
          </Stack>
          </form>
                  </Box>
      {status===201?
      <Alert
      status='success'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='200px'
    >
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        Felicitaciones!
      </AlertTitle>
      <AlertDescription maxWidth='sm'>
        Su usuario ha sido registrado exitosamente.
      </AlertDescription>
    </Alert>:status===401?
     <Flex  marginTop='-16rem'
        justifyContent='center'
          maxW="sm"
          w="full"
          mx="auto"
          bg="transparent"
          _dark={{
            bg: "darkAlpha",
          }}
          rounded="lg"
          overflow="hidden"
        >
          <Flex justifyContent="center" alignItems="center" w={12} bg="red.500"  >
            <Icon  color="white" boxSize={6} />
          </Flex>
      
          <Box mx={-3} py={2} px={4}>
            <Box mx={3}>
              <chakra.span
                color="red.500"
                _dark={{
                  color: "red.400",
                }}
                fontWeight="bold"
              >
                Sorry
              </chakra.span>
              <chakra.p
                color="gray.600"
                _dark={{
                  color: "gray.200",
                }}
                fontSize="sm"
                fontWeight={'bold'}
              >
                {response.response}
              </chakra.p>
            </Box>
          </Box>
        </Flex>:<></>}
    
</Stack>
</Container>

         )} 