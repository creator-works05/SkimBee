import React, { useEffect, useRef, useState } from 'react'
import { getUser } from '../ApiServices/usersApi';
import { genUserId } from '../JsExports/CommonJs';
import { postUserLogs } from '../ApiServices/userLogs';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [formData, setFormData] = useState({ name: "", password: "" })
  const [fetchedUser, setFetchedUser] = useState([])
  const [popAlert, setPopAlert] = useState(false)
  const navTo=useNavigate()
  const [alertMsg, setAlertMsg] = useState("something gone wrong")
  let inputRef = useRef([])
  useEffect(() => {
    getUser()
      .then(res => {
        console.log(res.data)
        setFetchedUser(res.data)
      })
      .catch(err => { console.log(err) })
  }, [])
  function getInput(e) {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }
  function forFocus(e, i) {
    if (e.key === "Enter") {
      e.preventDefault()
      const el = inputRef.current[i + 1]
      if (el) {
        el.focus()
      }
    }
  }
  function submitLogIn(e) {
    e.preventDefault();
    let userId;
    const isAccount = fetchedUser.some((user, i) => {
      userId = user.id;
      return user.name === formData.name && user.password === formData.password
    })
    if (!isAccount) {
      setAlertMsg("Invalid Login")
      setPopAlert(true)
      return
    }
    let genToken = genUserId(Date.now().toString().split("").reverse().join(""), 15)
    console.log(genToken, userId)
    localStorage.setItem("genToken", genToken);
    localStorage.setItem("userNow", userId);
    const logs = {
      id: genToken,
      userId,
      logDate: Date.now()
    }
    console.log(logs)


    postUserLogs(logs)
    .then(()=>navTo("/"))


  }
  function resetForm(e) {
    setFormData({ name: "", password: "" })

  }
  function doClose(){
    setPopAlert(false)
}
  return (
    <>
      <form onSubmit={submitLogIn} onReset={resetForm}>
        <label htmlFor="form-usrnm">Username :</label> <input ref={refOb => inputRef.current[0] = refOb} onKeyDown={(e) => { forFocus(e, 0) }} value={formData.name} onChange={getInput} id="form-usrnm" pattern="[A-Za-z ]+" type="text"
          name="name" placeholder="Username only allowed alphabets and white spaces" /><br /><br />
        <label htmlFor="form-password">Password :</label> <input ref={refOb => inputRef.current[1] = refOb} onKeyDown={(e) => { forFocus(e, 1) }} value={formData.password} onChange={getInput} id="form-password" type="text" name="password"
          placeholder="Password" /><br /><br />
        <button type="submit">Sign up</button>
        <button type="reset">Clear</button>
      </form>
       {popAlert&&<div style={{position:"fixed",top:"0",paddingLeft:"10%",paddingRight:"10%",left:"50%",transform:"translateX(-50%)",marginTop:"5px"}} className="alert alert-warning signupAlert" role="alert">
  {alertMsg} <button onClick={doClose} style={{position:"absolute",top:"0",right:"0",border:"0",borderRadius:"4px",background:"rgb(187,200,140)"}}>close</button>
</div>}
    </>
  )
}

export default Login