import React, { useContext, useRef, useState } from "react"
import { Button,Modal,ModalOverlay,ModalCloseButton,ModalHeader,ModalFooter,ModalContent,ModalBody,FormControl,FormLabel, Avatar, useDisclosure, Input } from "@chakra-ui/react"
// import { FileUpload } from "./FileUpload.js NOT WORKING"
import { AuthContext } from "../../Context/AuthContext"
import axios from "axios"


export const ImageEditModal =()=> {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {user} =useContext(AuthContext)

const editImage=()=>{
  axios.post(`https://controladorgastosapi.herokuapp.com/users/:${user.userInfo._id}`)
  fileInserted?alert(fileInserted[0].name):alert('No file has been inserted. Please insert one and retry')
}
const [fileInserted,setFile]=useState(false)
    const initialRef = useRef(null)
    const finalRef = useRef(null)
  const handleChange=(e)=>{
    const file=e.target.files
    file?setFile(file):<></>
  }
console.log(fileInserted)
  return (
      <>
        <Avatar name={user.username}src={user.userInfo.profile_picture} onClick={onOpen} cursor='pointer' />
  
        <Modal size={'lg'}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit your Profile Picture</ModalHeader>
            <ModalCloseButton  />
            <ModalBody pb={6} >
              <FormControl   width={'100%'} alignItems='center' justifyContent={'center'} display='Flex' flexDir={'column'}>
                <Input onChange={handleChange} style={{ opacity: '0', width: '0.1px', height: '0.1px', position:' absolute'}}  type='file'/>
               <FormLabel  marginTop={'1rem'} style={{  display: 'block',outline:'2px solid transparent',position:' relative',width: '230px',height: '50px',borderRadius:' 10px',background: 'linear-gradient(40deg, rgb(88 166 217), rgb(132 132 162))',boxShadow:'rgb(0 0 0 / 40%) 0px 4px 7px',alignItems: 'center',justifyContent:' center',color: '#fff',fontWeight:' bold',cursor: 'pointer',transition:' transform .4s ease-out'}} >FILE</FormLabel>
            {fileInserted?
                     <FormLabel color={'blackAlpha.600'}>{fileInserted[0].name} </FormLabel> :<></>
                    }
              </FormControl>
            
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue'  type="submit" onClick={editImage}  mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }