import React, { useEffect,useRef, useState } from 'react'
import { getUser} from '../ApiServices/usersApi';


function Login() {
  const [formData,setFormData]=useState({name:"",password:""})
  const [fetchedUser,setFetchedUser]=useState([])
  let inputRef=useRef([])
  localStorage.setItem("isLogin", true)// no need
  useEffect(()=>{
        getUser()
        .then(res=>{console.log(res.data)
            setFetchedUser(res.data)
        })
        .catch(err=>{console.log(err)})
    },[])
 function getInput(e){
  let {name,value}=e.target;
  setFormData({...formData,[name]:value})
 }
function forFocus(e,i){
  if(e.key==="Enter"){
    e.preventDefault()
    const el=inputRef.current[i+1]
    if(el){
      el.focus()
    }
  }
}
function submitLogIn(e){
    e.preventDefault();
    fetchedUser.some((user,i)=>{
      return user.name===formData.name&&user.password===formData.password})


  
}
  return (
    <>
    <form onSubmit={submitLogIn}>
      <label htmlFor="form-usrnm">Username :</label> <input ref={refOb => inputRef.current[0] = refOb} onKeyDown={(e) => { forFocus(e, 0) }} value={formData.name} onChange={getInput} id="form-usrnm" pattern="[A-Za-z ]+" type="text"
        name="name" placeholder="Username only allowed alphabets and white spaces" /><br /><br />
      <label htmlFor="form-password">Password :</label> <input ref={refOb => inputRef.current[1] = refOb} onKeyDown={(e) => { forFocus(e, 1) }} value={formData.password} onChange={getInput} id="form-password" type="text" name="password"
        placeholder="Password" /><br /><br />
      <button type="submit">Sign up</button>
      <button type="reset">Clear</button>
    </form>
    </>
  )
}

export default Login