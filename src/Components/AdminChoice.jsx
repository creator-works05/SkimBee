import React, { useContext, useEffect, useRef, useState } from 'react'
import { AdminContext } from '../Pages/Admin'
import { getMethod, postMethod, putMethod } from '../ApiServices/autoMethod'
import { urlmainType } from '../ApiServices/setUrl'
import ProductAdd from './ProductAdd'

function AdminChoice() {
  const { choice } = useContext(AdminContext)
  const [formData, setFormData] = useState({ type: "",subType:"",mainChoice:"" })

  let inputRef = useRef([])
  const [mainCtgry,setMainCtgry]=useState([])
  useEffect(()=>{
    getMethod(urlmainType)
    .then((res)=>{setMainCtgry(res.data)
      console.log("fetched data",res.data)
    })
    .catch(err=>console.log(err))
  },[])
  function forFocus(e, i) {
    if (e.key === "Enter") {
      e.preventDefault()
      const el = inputRef.current[i + 1]
      if (el) {
        el.focus()
      }
    }
  }
  function getInput(e) {
    let { name, value } = e.target;
    
    setFormData({ ...formData, [name]: value })
  }
  function addMainType(e) {
    e.preventDefault()
    const typeData = { [formData.type]: [] }
    postMethod(urlmainType, typeData)  //variables are imported from somewhere else
      .then(res => console.log("success", res.data))
      .catch(err => console.log(err))
    e.target.reset()

  }
  function clearType() {
    setFormData({ type: "",subType:"" })
  }
  function commonSubmit(e,importFun,difData={},flag,itrObj={}) {
    e.preventDefault()
    if(flag){
      let innerLoc;
      let loc=itrObj.find((el,i)=>{
        
        return Object.keys(el).some((field)=>{
          innerLoc=field
          return field===formData.mainChoice
        })
      })
      loc[innerLoc].push(difData)
      let idUrl=urlmainType+`/${loc.id}`
      console.log(idUrl)
      importFun(idUrl,loc)
      .then(res=>console.log(res.data,"success"))
    }
  }
  switch (choice) {
    case "addProduct": return <>
    <h3>Add products</h3>
    <ProductAdd/>
    </>
    case "addMainType": return <>
      <form style={{ marginTop: "10px", marginLeft: "10px" }} onSubmit={addMainType} onReset={clearType}>

        <label htmlFor="form-usrnm">Broad Type :</label> <input ref={refOb => inputRef.current[0] = refOb} onKeyDown={(e) => { forFocus(e, 0) }} value={formData.type} onChange={getInput} id="form-usrnm" pattern="^[A-Za-z]+(?: (?:& )?[A-Za-z]+)*$" type="text"
          name="type" placeholder=" Only allowed alphabets and white spaces" /><br /><br />
        <button type="submit">Add</button>
        <button type="reset">Clear</button>
      </form>
    </>
    case "addSubType1": return <>

      <form style={{ marginTop: "10px", marginLeft: "10px" }} onSubmit={(e)=>commonSubmit(e,putMethod,{subType:formData.subType,subTier2:[]},true,mainCtgry)} onReset={clearType}> 
         <select name="mainChoice" value={formData.mainChoice} onChange={getInput} required >
                <option value="" >Select a top tier category </option>
            {mainCtgry.map((e,i)=>{
              return Object.keys(e).map((field,j)=>{
                 
                 return j===1 && <option key={j} value={field}>{field}</option>
              })
               
            })}    
          </select>  

        <label htmlFor="form-usrnm">  Subsidiary Type Tier 1:</label> <input ref={refOb => inputRef.current[0] = refOb} onKeyDown={(e) => { forFocus(e, 0) }} value={formData.subType} onChange={getInput} id="form-usrnm" pattern="^[A-Za-z]+(?:[ \-](?:& )?[A-Za-z]+)*$" type="text"
          name="subType" placeholder=" Only allowed alphabets,ampersand and white spaces" required /><br /><br />
        <button type="submit">Add</button>
        <button type="reset">Clear</button>
      </form>

    </>
  }

  return (
    <>
      <h1>Imported {choice}</h1>

    </>
  )
}

export default AdminChoice