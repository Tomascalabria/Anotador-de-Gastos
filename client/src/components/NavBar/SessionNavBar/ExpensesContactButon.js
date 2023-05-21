import { useDisclosure,Menu,MenuButton,MenuItem,MenuList,useColorModeValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React from 'react'


export const ExpensesContactButon = ({expenses,props}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
<>
  <Menu isOpen={isOpen}>
            <MenuButton key={expenses.index}
                variant="ghost"
                mx={3}
                py={[1, 2, 2]}
                px={4}
                borderRadius={5}
                _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
                aria-label="Courses"
                fontWeight="normal"
                onMouseEnter={onOpen}
                onMouseLeave={onClose}
            
            >
            Gastos
                 
                
            </MenuButton>
            <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
            {expenses.map((item)=>{return(<Link to={item.route} >  <MenuItem onClick={()=>props.onClose()}  key={item.index}>{item.name}</MenuItem></Link>)})}
            </MenuList>
        </Menu>
</>
)
}
