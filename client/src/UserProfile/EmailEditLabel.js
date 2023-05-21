import React, { useContext } from 'react'
import {
    Editable,
    EditableInput,
    EditablePreview,
    ButtonGroup,useEditableControls,Input,Flex,IconButton
  } from '@chakra-ui/react'
import {CheckIcon,CloseIcon,EditIcon} from '@chakra-ui/icons'
import { AuthContext } from '../Context/AuthContext'

export const EmailEditLabel=()=> {
    const{user}=useContext(AuthContext)
    /* Here's a custom control */
    function EditableControls() {
      const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
      } = useEditableControls()
  
      return isEditing ? (
        <ButtonGroup justifyContent='center' size='sm'>
          <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
          <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
        </ButtonGroup>
      ) : (
        <Flex justifyContent='left' alignItems={'center'} marginLeft='0.8rem'  display={'inline-flex'}>
          <IconButton    size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
        </Flex>
      )
    }
  
    return (
      <Editable
        textAlign='center  '
        defaultValue={user.userInfo.email}
        fontSize='md'
 
        alignContent={'center'}
        isPreviewFocusable={false}
      >
        <EditablePreview  marginLeft={'2rem'} alignItems='center' fontSize={'md'}/>
   
        <Input as={EditableInput}  />
        <EditableControls  />
      </Editable>
    )
  }