import React,{useContext} from 'react'
  import {
        Box,Button,ButtonGroup,WrapItem,Flex,useBreakpointValue,Heading, useColorMode, useColorModeValue, color, IconButton} from '@chakra-ui/react'
      import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthContext'
import { logoutProcess } from '../../../Context/ApiCall'
import { ExpensesContactButon } from './ExpensesContactButon.js'
import { UserProfile } from '../../../UserProfile/UserProfile'
import { ModalMenu } from './ModalMenu'
import { FriendsContactButton } from './FriendsContactButton'
import {  MoonIcon, SunIcon } from '@chakra-ui/icons'
    
export const SessionNavBar = () => {
  const navigate=useNavigate()
  const {dispatch} =useContext(AuthContext)
  const handleLogout=()=>{
    logoutProcess(dispatch)
    navigate('/')
  }

  const { colorMode, toggleColorMode } = useColorMode()
  const titleColour = useColorModeValue('Black', 'white')


  const friends=[{name:'Ver Amigxs',index:1,route:'/amigos/ver'},{name:'Agregar amigxs',index:2,route:'/amigos/agregar'}]

  const expenses=[{name:'Crear Gasto',index:0,route:'/gastos/crear'},{name:'Ver gastos',index:1,route:'/gastos/ver'}]

        const isDesktop = useBreakpointValue({
          base: false,
          lg: true,
        })


        return (
          <Box 
          as="section"
          w={'100%'}
          display={'inline-flex'}
          justifyContent='flex-start'
          pb={{
              
            base: '12',
            md: '18',
          }}
        >
          <Box as="nav" bg="bg-surface" w={'100%'} justifyContent='flex-start' display={'inline-flex'}   boxShadow={useColorModeValue('sm', 'sm-dark')} >
            <Flex py={{ base: '4', lg: '5' }} w={'100%'} justifyContent='space-evenly' >
              <Box p='3'  ><Heading size='md' style={{color:titleColour,fontWeight:'bold ',fontFamily:'monospace',fontSize:'25px', letterSpacing:'2.3px' } }>Anotador de Gastos</Heading></Box>
          
                    {isDesktop ? (
                    <Flex justifyContent='space-evenly' width='65%' display='inline-Flex'  alignItems='center' >
                      <ButtonGroup variant="link" spacing="8">
                    
              
                          <Link to={'/'}>
                          Inicio
                          </Link>

                      </ButtonGroup>
                   
                        <ButtonGroup spacing="2">
                      <ExpensesContactButon expenses={expenses}key={expenses.index}/>
                      </ButtonGroup>
       
       
                      <ButtonGroup spacing="8" >
                      <FriendsContactButton  friends={friends}key={friends.index}/>
                      </ButtonGroup>

                      <ButtonGroup spacing="4" marginRight={'3rem'} >
                        
                        <WrapItem>
                     
                        <UserProfile/>
                        </WrapItem>
                        <Button variant="ghost" onClick={handleLogout} >Logout</Button>
                        </ButtonGroup>
                        
                   <IconButton background={'transparent'} onClick={toggleColorMode} icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}></IconButton>
                    </Flex>
                  ) : (
                    <ModalMenu props={{handleLogout}}/>                  )}

                    
              </Flex>
            </Box>
          </Box>
        )
      }