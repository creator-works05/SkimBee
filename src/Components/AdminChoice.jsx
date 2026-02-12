import React, { useContext, useRef, useState } from 'react'
import { AdminContext } from '../Pages/Admin'
import { postMethod } from '../ApiServices/autoMethod'
import { urlmainType } from '../ApiServices/setUrl'

function AdminChoice() {
  const { choice } = useContext(AdminContext)
  const [formData, setFormData] = useState({ type: "" })

  let inputRef = useRef([])
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
    postMethod(urlmainType,typeData)  //variables are imported from somewhere else
    .then(res=>console.log("success",res.data))
    .catch(err=>console.log(err))
    e.target.reset()
    
  }
  function clearType(){
    setFormData({type:""})
  }
  function commonSubmit(e){
    console.log("hello")
  }
  switch (choice) {
    case "addProduct": return <h1>Add Product Form </h1>
    case "addMainType": return <>
      <form style={{marginTop:"10px",marginLeft:"10px"}} onSubmit={addMainType} onReset={clearType}>

        <label htmlFor="form-usrnm">Broad Type :</label> <input ref={refOb => inputRef.current[0] = refOb} onKeyDown={(e) => { forFocus(e, 0) }} value={formData.type} onChange={getInput} id="form-usrnm" pattern="^[A-Za-z]+(?: (?:& )?[A-Za-z]+)*$" type="text"
          name="type" placeholder=" Only allowed alphabets and white spaces" /><br /><br />
        <button type="submit">Add</button>
        <button type="reset">Clear</button>
      </form>
    </>
    case "addSubType1": return <>

    </>
  }

  return (
    <>
      <h1>Imported {choice}</h1>

    </>
  )
}

export default AdminChoice