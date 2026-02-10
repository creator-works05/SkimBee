import React, { useEffect, useRef, useState } from 'react'
import "../Sryling/SignupStyle.css"
import { genUserId } from '../JsExports/CommonJs';
import { getUser, postUser } from '../ApiServices/usersApi';
import { postUserLogs } from '../ApiServices/userLogs';


function Signup() {
    const [formData,setFormData]=useState({name:"",email:"",password:"",cpass:""})
    const inputRef=useRef([]);
    const [popAlert,setPopAlert]=useState(false)
    const [alertMsg,setAlertMsg]=useState("something gone wrong")
    const [fetchedUser,setFetchedUser]=useState({})
    useEffect(()=>{console.log(formData)},[formData])

    
    useEffect(()=>{
        getUser()
        .then(res=>{console.log(res.data)
            setFetchedUser(res.data)
        })
        .catch(err=>{console.log(err)})
    },[])
   
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
    let {name,email,password,cpass}=formData;
    if(Object.keys(formData).some(key=>{takeField=key;
    
         return !formData[key] })){
        console.log(takeField,"cant be empty")
        if(takeField==="cpass"){
                setAlertMsg("Confirm Password can't be null")
                setPopAlert(true)
         }
         else{
            setAlertMsg(takeField +" can't be null")
            setPopAlert(true)
         }
        return

    }
    if(formData.password!=cpass){
        setAlertMsg("Password and Confirm Password should be matched")
        setPopAlert(true)
        return
    }
    
    
    let id =genUserId(formData.name,15)
    let checkDup=fetchedUser.some((user,i)=>{console.log("chedking prev");
        return formData.email===user.email&&formData.password===user.password
    })
    if(checkDup){
         setAlertMsg("Similar account already exists, Try login or Have fresh sign up")
        setPopAlert(true)
        return
    }
    else{
        console.log("match not found, you can proceed");
        
    }
    let currentDt=Date.now();
    console.log(currentDt)
    const usrPayLoad={
        id,
        name:formData.name,
        email:formData.email,
        password:formData.password,
        payload:{
            setting:[],
            addresses:[],
            prevOrder:[],
            orderNow:null,
            signedDate:currentDt
        }
    }
    let genToken=genUserId(Date.now().toString(),15)
    console.log(genToken)
    const logs={id:genToken,
        userId:id,
        logDate:currentDt
    }
    
    localStorage.setItem("genToken",genToken);
    localStorage.setItem("userNow",id)
    console.log(usrPayLoad)
    // POSTING USER DETAILS
    postUser(usrPayLoad)
    .then(res=>console.log(res.data)
    ).catch(err=>console.log(err)
    )
    postUserLogs(logs)
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err)
    )
    setFormData({name:"",email:"",password:"",cpass:""})


}
function doClose(){
    setPopAlert(false)
}
function resetForm(e){
     setFormData({name:"",email:"",password:"",cpass:""})
}
  
  return (
    <>
   <form id="sign-up" onSubmit={submitSignup}>
        <label htmlFor="form-usrnm">Username :</label> <input ref={refOb=>inputRef.current[0]=refOb} onKeyDown={(e)=>{forFocus(e,0)}} value={formData.name} onChange={getInput} id="form-usrnm" pattern="[A-Za-z ]+" type="text"
            name="name" placeholder="Username only allowed alphabets and white spaces" /><br/><br/>
        <label htmlFor="form-eml">Email :</label> <input ref={refOb=>inputRef.current[1]=refOb} onKeyDown={(e)=>{forFocus(e,1)}} value={formData.email}  onChange={getInput} id="form-eml" type="email" name="email"
            placeholder=" Email" /><br/><br/>
        <label htmlFor="form-password">Password :</label> <input ref={refOb=>inputRef.current[2]=refOb} onKeyDown={(e)=>{forFocus(e,2)}} value={formData.password} onChange={getInput} id="form-password" type="text" name="password"
            placeholder="Password" /><br/><br/>
        <label htmlFor="form-cpass">Confirm password :</label> <input ref={refOb=>inputRef.current[3]=refOb} onKeyDown={(e)=>{forFocus(e,3)}} value={formData.cpass} onChange={getInput} id="cpass" type="text" name="cpass"
            placeholder="Confirm password" /><br/><br/>
        <button type="submit">Sign up</button>
        <button  type="reset" onClick={resetForm}>Clear</button>
    </form>
    {popAlert&&<div style={{position:"fixed",top:"0",paddingLeft:"10%",paddingRight:"10%",left:"50%",transform:"translateX(-50%)",marginTop:"5px"}} className="alert alert-warning signupAlert" role="alert">
  {alertMsg} <button onClick={doClose} style={{position:"absolute",top:"0",right:"0",border:"0",borderRadius:"4px",background:"rgb(187,200,140)"}}>close</button>
</div>}
    </>
  )
}

export default Signup