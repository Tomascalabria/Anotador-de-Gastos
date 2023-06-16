import { Button, useDisclosure,Avatar ,Drawer,DrawerOverlay,DrawerContent,DrawerHeader,DrawerBody,DrawerFooter,DrawerCloseButton,
  Text,
  FormLabel,
  Flex,
  Menu,
  MenuList,
  MenuGroup,
  MenuItem,
  MenuDivider,
  MenuButton,} from '@chakra-ui/react'
import React, { useContext, useRef} from 'react'
import { AuthContext } from '../Context/AuthContext'
import { logoutProcess } from '../Context/ApiCall'
import { EmailEditLabel } from './EmailEditLabel'
// import { FileUpload } from './ProfileImageEdit.js/FileUpload'
import { ImageEditModal } from './ProfileImageEdit.js/ImageEditModal'
import {  UsernameEditLabel } from './UsernameEditLabel'
import {  useNavigate } from 'react-router'

export const UserProfile = () => {
    const {user,dispatch} =useContext(AuthContext)
    const Navigate=useNavigate()

    console.log(user.userInfo)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    // const email=useRef()
    // const username=useRef()
    const handleLogout=()=>{
      logoutProcess(dispatch)
      Navigate('/')
  }
      return (
        <>
      
         
      <Menu>
  <MenuButton as={Avatar} name={user.username} src={user.userInfo.profile_picture} cursor="pointer" />
  <MenuList>
    <MenuGroup title="Cuenta">
      
      <MenuItem>Mi perfil</MenuItem>
      <MenuItem>Ajustes</MenuItem>
    </MenuGroup>
    <MenuDivider />
    <MenuGroup title="">
      <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
    </MenuGroup>
  </MenuList>
</Menu>
      
        </>
      )
    }  
