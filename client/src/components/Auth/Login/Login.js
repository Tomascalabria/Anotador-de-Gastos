import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
    useBreakpointValue,
    Flex,
    Icon,
    chakra,
    Checkbox,
    CheckboxGroup
    
  } from '@chakra-ui/react'
  import  React,{useContext, useRef} from 'react'
  import { Link } from 'react-router-dom'
  import { loginProcess } from '../../../Context/ApiCall'
import { AuthContext } from '../../../Context/AuthContext'
  import { PasswordField } from '../PasswordField'
  
  export const Login = () => {
    const {user,error}=useContext(AuthContext)
    const {dispatch}=useContext(AuthContext)
    const username=useRef()
    const password=useRef()
  


    const handleClick=(e)=>{
      e.preventDefault()

      loginProcess({username:(username.current.value).toLowerCase(),password:password.current.value},dispatch)


    }

 return(
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
              })} textAlign={'center'} marginTop={'-2em'} >Logueate</Heading>
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
              <Text color="muted">Todavia no tenes cuenta?</Text>
             <Link to='/register' > <Button variant="link" colorScheme="blue">
                Registrate ashe pa
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
            <form onSubmit={handleClick}>
      
            <Stack spacing="6">
              <Stack spacing="5">

                <FormControl >
                  <FormLabel htmlFor="username">Usuario</FormLabel>
                  <Input id="username" required='required' type="username" ref={username}  name='username' />
                  </FormControl>
              <PasswordField ref={password} />
            <CheckboxGroup ><Checkbox fontSize={'small'} color='gray.600' >Recordarme</Checkbox></CheckboxGroup>
            </Stack>
            <HStack justify="center " >

              <Button variant="link" colorScheme="blue" size="sm">
                Te olvidaste la pass?
              </Button>
            </HStack>
            <Stack spacing="6">
              <Button variant="primary" type={'submit'} _hover={{background:'##F8FB', color:'black',border:'solid 0.2px black'}} >Loguarme</Button>
               
            </Stack>
            
          </Stack>
          </form>
        </Box>
        {error?
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
               {error.response.data}
              </chakra.span>
              <chakra.p
                color="gray.600"
                _dark={{
                  color: "gray.200",
                }}
                fontSize="sm"
                fontWeight={'bold'}
              >
                {error.response.data}
              </chakra.p>
            </Box>
          </Box>
        </Flex>
      
        
        
        
        
        : <></>
      
}
{
  user? <Flex  marginTop='-16rem'
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
    <Flex justifyContent="center" alignItems="center" w={12} bg="green.500"  >
      <Icon icon=' ✓' color="white" boxSize={6} />
    </Flex>

    <Box mx={-3} py={2} px={4}>
      <Box mx={3}>
        <chakra.span
          color="green.500"
          _dark={{
            color: "green.400",
          }}
          fontWeight="bold"
        >
          Success
        </chakra.span>
        <chakra.p
          color="gray.600"
          _dark={{
            color: "gray.200",
          }}
          fontSize="sm"
          fontWeight={'bold'}
        >
          {!user?<></>:`Bienvenido ${user.username}` }
        </chakra.p>
      </Box>
    </Box>
  </Flex>
:<></>
}
      </Stack>
      
    </Container>
  
        )}