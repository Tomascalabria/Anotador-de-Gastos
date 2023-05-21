import React, { useContext, useState } from 'react'
import {Editable,EditableInput,EditablePreview,ButtonGroup,useEditableControls,Input,Flex,IconButton} from '@chakra-ui/react'
import {CheckIcon,CloseIcon,EditIcon} from '@chakra-ui/icons'
import { AuthContext } from '../Context/AuthContext'
import axios from 'axios'
export const UsernameEditLabel=()=> {
  const [username,setUsername]=useState('')
  const [response,setResponse]=useState([])
  const{user}=useContext(AuthContext)



const local_edit_username_URL=`http://localhost:5050/users/${user.userInfo._id}/username`
// const edit_username_URL=`https://controladorgastosapi.herokuapp.com/users/${user.userInfo._id}/username`

const handleChange=(e)=>{
  const value=e.target.value

  setUsername(value)
}
const handleUsernameSubmit=async (e)=>{
  e.preventDefault()
const newUsername=await axios.put(local_edit_username_URL,{username:username},{
  headers:{
    token: user.token
  }
})
.then((res)=>{
  setResponse(res.data)
  console.log(response)
  
})
.catch((err)=>{
  setResponse(err)
  console.log(response)
})
 }


    /* Here's a custom control */
    function EditableControls() {
      const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
      } = useEditableControls()
  
      return isEditing ? (
        <ButtonGroup justifyContent='center' size='sm' >
          <IconButton icon={<CheckIcon onClick={handleUsernameSubmit} />} {...getSubmitButtonProps()} />
          <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
          

        </ButtonGroup>
      ) : (
        <Flex justifyContent='left' alignItems={'center'}  display={'inline-flex'}>
          <IconButton marginLeft={'1.2rem'}  size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
        </Flex>
      )
    }
  
    return (
      <Editable
        textAlign='center  '
        defaultValue={user.userInfo.username}
        fontSize='md'
        alignContent={'center'}
        isPreviewFocusable={false}
        
      >
        <EditablePreview  marginLeft={'2rem'} alignItems='center' fontSize={'md'}/>
        {/* Here is the custom input */}
        <Input as={EditableInput} onChange={handleChange} />
        <EditableControls  />
      </Editable>
    )
  }