import React, { useContext, useRef, useState } from 'react'
import axios from 'axios'
import {Box,Button,Container,FormControl,FormLabel,Heading,Select,Input,Stack,useBreakpointValue,Alert,AlertIcon,AlertTitle,AlertDescription, Checkbox} from '@chakra-ui/react'
import { AuthContext } from '../../Context/AuthContext'
import { SharedExpenses } from './SharedExpenses'
export const CreateExpense = () => {
const {user}=useContext(AuthContext)
const title=useRef()
const tipo=useRef()
const monto=useRef()
const categoria=useRef()
const [friendsToShare,setFriendsToShare]=useState([])
const [status,setStatus]=useState(false)
const [sharedExpense,setSharedExpense]=useState(false)

// const local_url="http://localhost:5050/expenses/create"
const prod_url='https://controladorgastosapi.herokuapp.com/expenses/create'
const submitGasto=(e)=>{

  e.preventDefault()
  console.log({title:title.current.value,amount:monto.current.value,type:tipo.current.value,category:categoria.current.value,creator:user.userInfo.username,participants:friendsToShare})
axios.post(`${prod_url}`,{title:title.current.value,amount:monto.current.value,type:tipo.current.value,category:(categoria.current.value.charAt(0).toUpperCase()+categoria.current.value.slice(1).toLowerCase()),creator:user.userInfo.username,participants:friendsToShare})
.then((res)=>{ setTimeout(()=>{
  
  setStatus(res.status)}
)},[3300])


.catch((err)=>{
  console.log(err)
})
}

  return (
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
        })} textAlign={'center'} marginTop={'-2em'} >Crear Gasto</Heading>
        <Stack spacing="8">
        <Stack spacing="6">
        
          <Stack
            spacing={{
                base: '2',
                md: '3',
            }}
            textAlign="center"
            >
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
          <form onSubmit={submitGasto}> 
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="text">Titulo</FormLabel>
                <Input id="title" type="text" name='title' ref={title} />
              </FormControl >
           
              <FormControl>
                <FormLabel htmlFor="text">Categoria</FormLabel>
                <Input id="category" type="text" name='category' ref={categoria} />
              </FormControl >
           
              <FormControl>
                <Select ref={tipo} placeholder='Tipo de gasto' required='True'>
                  <option  type='ingreso' id='ingreso' name='ingreso'>Ingreso</option>
                  <option type='text'id='egreso' name='egreso'>Egreso</option>
                </Select>
              </FormControl >
            
              <FormControl>
                <FormLabel htmlFor="number">Monto</FormLabel>
                <Input id="monto" type="number" name='monto' ref={monto} />
              </FormControl >
              <FormControl>
              
            <Checkbox onChange={()=>{sharedExpense===true?setSharedExpense(false):setSharedExpense(true)}}>Gasto compartido?</Checkbox>
              </FormControl>
            {sharedExpense===true?<SharedExpenses props={{setFriendsToShare}} />:<></>}
            </Stack>
            
            <Stack spacing="6">
              <Button type={'submit'} fontWeight='bold' variant="primary" _hover={{background:'##F8FB', color:'black',border:'solid 0.2px black'}}>Crear Gasto</Button>
               
            </Stack>
          </Stack>
          </form>
                  </Box>
                  {status===200?
      <Alert
      status='success'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='200px'
    >
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        Felicitaciones!
      </AlertTitle>
      {sharedExpense=true&&status!=false?<AlertDescription maxWidth='sm'>
        Su gasto ha compartido sido creado exitosamente. 
      </AlertDescription>:<AlertDescription maxWidth='sm'>
        Su gasto ha sido creado exitosamente.
      </AlertDescription>}
    </Alert>:<></>}
</Stack>
</Container>



)

}
