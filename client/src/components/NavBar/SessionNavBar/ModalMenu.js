import React,{ useRef} from "react"
import { Button, Drawer,IconButton, DrawerCloseButton, DrawerContent, DrawerOverlay,DrawerFooter,DrawerHeader,DrawerBody, useDisclosure, Flex, ButtonGroup,Text, useColorMode} from "@chakra-ui/react"
import { FiMenu } from "react-icons/fi"
import { Link } from "react-router-dom"
import { UserProfile } from "../../../UserProfile/UserProfile"
import { SunIcon,MoonIcon } from '@chakra-ui/icons'

import { FriendsContactButton } from "./FriendsContactButton"
import { ExpensesContactButon } from "./ExpensesContactButon"

export const ModalMenu=({props})=> {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const { colorMode, toggleColorMode } = useColorMode()

        const expenses=[{name:'Crear Gasto',index:0,route:'/gastos/crear'},{name:'Ver gastos',index:1,route:'/gastos/ver'}]

        const friends=[{name:'Ver Amigxs',index:1,route:'/amigos/ver'},{name:'Agregxr amigos',index:2,route:'/amigos/agregar'}]

    return (
      <>
  <IconButton background={'transparent'} onClick={toggleColorMode} icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}></IconButton>

       <IconButton
                      variant="ghost"
                      icon={<FiMenu fontSize="1.25rem" />}
                      aria-label="Open Menu" ref={btnRef} colorScheme='teal' onClick={onOpen}/>

        <Drawer 
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
          
        >
          <DrawerOverlay />
          <DrawerContent >
            <DrawerCloseButton />
            <DrawerHeader display={'inline-flex'} w='lg'>
              <Text>Menu de Inicio</Text>

            </DrawerHeader>
  
            <DrawerBody display={'flex'} flexDir='column' height={'100%'}alignItems='center'>
            <Flex flexDir={'column'} align={'center'}  justifyContent='space-between' marginTop={'2rem'} width='100%'h={'40%'}   alignItems='center' >
                      <ButtonGroup justifyContent='center' variant="link" spacing="8">
                    
              
                          <Link to={'/' }>
                          Inicio
                          </Link>
                      </ButtonGroup>


                      <ButtonGroup spacing="8" >
                      <ExpensesContactButon  props={{onClose}} expenses={expenses}key={expenses.index}/>
                      </ButtonGroup>

                        <ButtonGroup spacing="8" >
                      <FriendsContactButton  props={{onClose}} friends={friends}key={friends.index}/>
                      </ButtonGroup>

                  <ButtonGroup marginBottom={'-9rem'} >
                    <UserProfile />
                  </ButtonGroup>
       </Flex>
            </DrawerBody>
            <DrawerFooter   >
                  <ButtonGroup justifyContent={'center'} w='100%' onClick={onClose}>
                  <Button w={'%'} _hover={{background:'red.600'}} variant="ghost" onClick={props.handleLogout} >Logout</Button>
                  </ButtonGroup>
              
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }