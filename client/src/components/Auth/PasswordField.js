import  React from 'react'
import {
    FormControl,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    useDisclosure,
  } from '@chakra-ui/react'
  import { HiEye, HiEyeOff } from 'react-icons/hi'
  
  export const PasswordField = React.forwardRef((props, ref) => {
    const { isOpen, onToggle } = useDisclosure()
    const inputRef = React.useRef(null)
    
    const onClickReveal = () => {
      onToggle()
  
      if (inputRef.current) {
        inputRef.current.focus({
          preventScroll: true,
        })
      }
    }
  
    return (
      <FormControl >
        <FormLabel htmlFor="password" >Password</FormLabel>
        <InputGroup >
          <InputRightElement>
            <IconButton
              variant="link"
              aria-label={isOpen ? 'Mask password' : 'Reveal password'}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={onClickReveal}
            />
          </InputRightElement>
          <Input
            id="password"
            ref={ref}
            name="password"
            type={isOpen ? 'text' : 'password'}
            autoComplete="current-password"
            required
            {...props}
        
            
          />
        </InputGroup>
      </FormControl>
      
    )
  })
  PasswordField.displayName = 'PasswordField'