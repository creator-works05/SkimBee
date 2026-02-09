import React, { useEffect, useRef, useState } from 'react'


function Signup() {
    const [formData,setFormData]=useState({name:"",email:"",pass:"",cpass:""})
    const inputRef=useRef([]);
    useEffect(()=>{console.log(formData)},[formData])
    
   
    function getInput(e){
        let {name,value}=e.target
        setFormData(prev=>({...prev,[name]:value}))
        

    }
function forFocus(e,index){
    if(e.key==="Enter"){
        e.preventDefault();
        const nextInput=inputRef.current[index+1];
        if(nextInput){
            nextInput.focus()
        }
    }
    if(e.target.name==="email"){
        if(e.key==="@"){
         setTimeout(()=>{
            setFormData(prev=>({...prev,email:prev.email+"gmail.com"}))

         },200)

        }
    }
}

function submitSignup(e){
    e.preventDefault();
    let takeField;
    let {name,email,pass,cpass}=formData;
    if(Object.keys(formData).some(key=>{takeField=key;
    
         return !formData[key]})){
        console.log(takeField,"cant be empty")

    }
   
}
  
  return (
    <>
   <form id="sign-up" onSubmit={submitSignup}>
        <label htmlFor="form-usrnm">Username :</label> <input ref={refOb=>inputRef.current[0]=refOb} onKeyDown={(e)=>{forFocus(e,0)}} value={formData.name} onChange={getInput} id="form-usrnm" pattern="[A-Za-z ]+" type="text"
            name="name" placeholder="Username only allowed alphabets and white spaces" /><br/><br/>
        <label htmlFor="form-eml">Email :</label> <input ref={refOb=>inputRef.current[1]=refOb} onKeyDown={(e)=>{forFocus(e,1)}} value={formData.email}  onChange={getInput} id="form-eml" type="email" name="email"
            placeholder=" Email" /><br/><br/>
        <label htmlFor="form-pass">Password :</label> <input ref={refOb=>inputRef.current[2]=refOb} onKeyDown={(e)=>{forFocus(e,2)}} value={formData.pass} onChange={getInput} id="form-pass" type="text" name="pass"
            placeholder="Password" /><br/><br/>
        <label htmlFor="form-cpass">Confirm password :</label> <input ref={refOb=>inputRef.current[3]=refOb} onKeyDown={(e)=>{forFocus(e,3)}} value={formData.cpass} onChange={getInput} id="cpass" type="text" name="cpass"
            placeholder="Confirm password" /><br/><br/>
        <button type="submit">Sign up</button>
        <button type="reset">Clear</button>
    </form>
    </>
  )
}

export default Signup