import {
    Box,
    Button,
    Heading,
    Flex,
    HStack,
    useBreakpointValue,
    useColorModeValue,
    IconButton,
    useColorMode,
    
  } from '@chakra-ui/react'
  import { Link } from 'react-router-dom'
  import * as React from 'react'
import { ModalDefaultMenu } from './ModalDefaultMenu.js'
import { SunIcon,MoonIcon } from '@chakra-ui/icons'

  export const DefaultNavBar = () => {
    const isDesktop = useBreakpointValue({
      base: false,
      lg: true,
    })
    const titleColour = useColorModeValue('Black', 'white')
    const { colorMode, toggleColorMode } = useColorMode()

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
            <Flex py={{ base: '4', lg: '5' }} w={'100%'} justifyContent='space-around' >
                  
              <Box p='3'  ><Link to={'/'}><Heading size='md' style={{color:titleColour,fontWeight:'bold ',fontFamily:'monospace',fontSize:'25px', letterSpacing:'2.3px' }}>Anotador de Gastos</Heading></Link></Box>
          
                    {isDesktop ? (
                    <Flex justifyContent='space-evenly' width='65%' display='inline-Flex'  alignItems='center' >
                    
       
                  <HStack spacing="12" >
                  <HStack spacing='12'>
                    <Link to='/login'><Button   variant="ghost" style={{marginLeft:'6em'}}>Sign in</Button></Link>
                  
                  
                    <Link to='register'><Button variant="ghost" >Sign up</Button></Link>
                    </HStack>
                  </HStack>
                  <IconButton background={'transparent'} onClick={toggleColorMode} icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}></IconButton>

                </Flex>
              ) : (
                <ModalDefaultMenu/>
              )}
            </Flex>
        </Box>
      </Box>
    )
  }