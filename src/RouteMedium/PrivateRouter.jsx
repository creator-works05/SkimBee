import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { currentUser } from '../JsExports/currentUser'

function PrivateRouter({Home}) {
    let [isLogin,setIsLogin]=useState(false)
    let [isLoading,setIsLoading]=useState(true);

   

    let genToken=localStorage.getItem("genToken")
    let userId=localStorage.getItem("userNow")
    useEffect(()=>{
      if(!genToken||!userId){
      localStorage.removeItem("genToken")
      localStorage.removeItem("userNow")
      setIsLoading(false)
      return 
    }
    else{
     
     currentUser(genToken,userId)
     .then(check=>{
      
        setIsLoading(false)
        setIsLogin(check)
      
     })
     .catch(()=>{setIsLoading(false);
      setIsLogin(false)
     })
    
    }

    },[genToken,userId])
    
    if(isLoading){
      return <h3 style={{position:"fixed",top:"50%",left:"50%",transform:"translateX(-50%)",color:"red"}}>Loading...</h3>
    }
    
  return (
    <>
    {isLogin?Home:<Navigate to='/auth' />}
    

    </>
  )
}

export default PrivateRouter