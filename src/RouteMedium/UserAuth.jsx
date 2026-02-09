import React, { useState } from 'react'
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import { Button} from 'bootstrap';

function UserAuth() {
    const [typeAuth,setTypeAuth]=useState(true);
    function ifLOgin(){
        setTypeAuth(true)
        
    }
    function ifSignUp(){
        setTypeAuth(false)
    }
  return (
    <>
   {typeAuth?<button className='btn btn-primary' onClick={ifSignUp}>Sign up</button>:<button className=' btn btn-secondary' onClick={ifLOgin}>Log in</button>}
   {typeAuth?<Login/>:<Signup/>}
    </>
  )
}

export default UserAuth