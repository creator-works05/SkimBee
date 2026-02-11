import React, { createContext, useEffect, useRef, useState } from 'react'
import { getAdmin } from '../ApiServices/admin'
import AdminChoice from '../Components/AdminChoice'


const AdminContext=createContext()
function Admin() {
    const [formData, setFormData] = useState({ admin: "", password: "" })
    const [fetchedAdmin, setFetchedUser] = useState([])  // unused
    const [popAlert, setPopAlert] = useState(false)
    //   const navTo=useNavigate()
    const [isAdmin,setIsAdmin]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    const [choice,setChoice]=useState("")

    const [alertMsg, setAlertMsg] = useState("something gone wrong")
    let inputRef = useRef([])
    useEffect(() => {
        console.log("storage checked");
       let check= localStorage.getItem("isAdmin")==="true";
       if(check){
        setIsAdmin(true)
        setIsLoading(false)
        
    }
    else{
        setIsAdmin(false)
        localStorage.removeItem("isAdmin")
        setIsLoading(false)
       }
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
        getAdmin()
        .then(res=>{
          return Object.keys(res.data).some((el)=>{
                
                return res.data.name===formData.admin && res.data.password===formData.password
            })
        }).then((msg)=>{
            if(msg){
                localStorage.setItem("isAdmin","true")
            setIsAdmin(true)
            setPopAlert(false)
            }
            else{
                setPopAlert(true)
                setAlertMsg("Invalid login")
            }
        })
        .catch(err=>console.log(err))

    }
    function resetForm(e) {
        setFormData({ admin: "", password: "" })

    }
    function doClose() {
        setPopAlert(false)
    }
    if(isLoading){
        console.log("Loading..........")
        return
    }
    return (
        <>
           {!isAdmin && 
           <form onSubmit={submitLogIn} onReset={resetForm}>
                <label htmlFor="form-usrnm">Admin :</label> <input ref={refOb => inputRef.current[0] = refOb} onKeyDown={(e) => { forFocus(e, 0) }} value={formData.admin} onChange={getInput} id="form-usrnm" pattern="[A-Za-z ]+" type="text"
                    name="admin" placeholder=" Only allowed alphabets and white spaces" /><br /><br />
                <label htmlFor="form-password">Password :</label> <input ref={refOb => inputRef.current[1] = refOb} onKeyDown={(e) => { forFocus(e, 1) }} value={formData.password} onChange={getInput} id="form-password" type="text" name="password"
                    placeholder="Password" /><br /><br />
                <button type="submit">Admin log</button>
                <button type="reset">Clear</button>
            </form>
           }
            {popAlert && <div style={{ position: "fixed", top: "0", paddingLeft: "10%", paddingRight: "10%", left: "50%", transform: "translateX(-50%)", marginTop: "5px" }} className="alert alert-warning signupAlert" role="alert">
                {alertMsg} <button onClick={doClose} style={{ position: "absolute", top: "0", right: "0", border: "0", borderRadius: "4px", background: "rgb(187,200,140)" }}>close</button>
            </div>}
            {isAdmin&& <>
            <h1>Admin Page</h1>
            <select value={choice} onChange={(e)=>setChoice(e.target.value )} required >
                <option value="" >---------MENU--------</option>
                <option value="addProduct" >Add product </option>
                <option value="addMainType" >Add Main Type </option>
                <option value="addSubType1" >Add Sub Type 1 </option>
            </select>
            {choice&&<> 
            
           <AdminContext.Provider value={{choice}}>
            <AdminChoice/>

           </AdminContext.Provider>
            </>}
            {!choice&& <h4> ^ Select any menu Item   </h4>}
            </>}
        </>
    )
}

export default Admin
export {AdminContext};