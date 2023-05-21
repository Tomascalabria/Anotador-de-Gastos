import axios from "axios";


export const loginProcess=async(userCrentials,dispatch)=>{
    dispatch({type:'LOGIN_START'})
    try{
     const response=await axios.post('https://controladorgastosapi.herokuapp.com/users/login',userCrentials)
        dispatch({type:'LOGIN_SUCCESS',payload:response.data},window.localStorage.setItem('token',JSON.stringify(response.data.token)))

    }
    catch(err){
        dispatch({type:'LOGIN_FAILURE',payload:err,})
        


    }
}

export const logoutProcess=async(dispatch)=>{
    try{
        dispatch({type:'LOGIN_START',payload:'null'})
        window.localStorage.setItem('token',null)
    }
    catch(err){
        console.log(err)
    }
}