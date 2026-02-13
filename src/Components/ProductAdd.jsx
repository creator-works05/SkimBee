import React, { useRef, useState } from 'react'

function ProductAdd() {
    const [rowUpdate,setRowUpdate]=useState([1])
    let defDesc=`This product is designed to offer reliable performance and everyday convenience for a wide range of needs.
Built with quality materials, it combines functionality and value in a simple, practical design`
    const [formData,setFormData]=useState({image:"",name:"",price:"",stock:"",offer:"",stockMin:8,stockMax:100,priceMin:150,priceMax:5000,desc:defDesc})
    const [spec,setSpec]=useState([{spc:""}])
    const [specValue,setSpecValue]=useState([{val:""}])
    const [count,setCount]=useState(5)

    

    
  let inputRef = useRef([])

  function forFocus(e, i) {
    if (e.key === "Enter") {
      e.preventDefault()
      const el = inputRef.current[i + 1]
      console.log(el,i+1)
      if (el) {
        el.focus()
      }
    }
  }
  function formSubmit(e){
    e.preventDefault()
  }
  function changeInputOne(e,i){ //change i as normal array
    const {name,value}=e.target
    
       if(i===0){
         setSpec([{[name]:value}])
       }
       else{
         setSpec([{[name]:value}])
       }
    
  }
  function changeInputTwo(e){
    const {name,value}=e.target
    setFormData({...formData,[name]:value})
  }
  function changeInputThree(e){
    const {name,value}=e.target
    setFormData({...formData,[name]:value})
  }
  return (<>
   <form style={{margin:"10px 20px"}} onSubmit={formSubmit}>
    <br/>
     <label>Product Image url:</label><br/>
  <input value={formData.image} type="text" name="image" pattern="^\\S+$" title="No spaces allowed" ref={refOb => inputRef.current[0]=refOb} onKeyDown={(e) => { forFocus(e, 0) }} />
    <br/><br/>
    <label>Product Name:</label><br/>
  
  <input  value={formData.name} type="text" name="name" required pattern="^[A-Za-z0-9 ]{3,100}$" title="Only letters, numbers and spaces (3-100 characters)"  ref={refOb => inputRef.current[1]=refOb} onKeyDown={(e) => { forFocus(e, 1) }} />
  <br/>
  <label>Price:</label><br/>
  <input value={formData.price} type="number" name="price" min="0" step="1.0" ref={refOb => inputRef.current[2]=refOb} onKeyDown={(e) => { forFocus(e, 2) }} /> <input value={formData.priceMin} type='number' name="priceMin"  /><label>-</label><input value={formData.priceMax} type='number' name="priceMax"  />
  <br/><br/><br/>
  <label>Offer Percentage:</label><br/>
  <input value={formData.offer} type="number" name="offer"  min="0" max="100" ref={refOb => inputRef.current[3]=refOb} onKeyDown={(e) => { forFocus(e, 3) }} />
  <br/><br/><br/> 
  <label>Stock:</label><br/>
  <input value={formData.stock} type="number" name="stock"  min="0" ref={refOb => inputRef.current[4]=refOb} onKeyDown={(e) => { forFocus(e, 4) }} /> <input value={formData.stockMin} type='number' name="stockMin" min={8} /><label>-</label><input value={formData.stockMax} type='number' name="stockMax"  />

  <br/><br/><br/>
  <textarea value={formData.desc} name="desc" maxLength="250" ref={refOb => inputRef.current[5]=refOb} onKeyDown={(e) => { forFocus(e, 5) }} ></textarea>
  <br/><br/><br/>
   <table>
    <thead>
    <tr>
      <th>Specification</th>
      <th>value</th>
    </tr>
    </thead>
    <tbody>
  {rowUpdate.map((el,i)=>{
    //  let j=i+1;
    const baseIndex = 6 + i * 2 
    return   <tr key={i}>
      <td><textarea value={spec[i].spc} maxLength={200}  name={`spec[${i}]`} placeholder="Specification" ref={refOb => inputRef.current[baseIndex]=refOb} onKeyDown={(e) => { forFocus(e, baseIndex) }}> </textarea></td>
      <td><textarea value={specValue[i].val}  name={`value[${i}]`} placeholder="Value" ref={refOb => inputRef.current[baseIndex+1]=refOb} onKeyDown={(e) => { forFocus(e, baseIndex) }}>  </textarea></td>
    </tr>
  })}
    </tbody>
  </table> 
  <button type="button" onClick={()=>{
  if(rowUpdate.length <= 10){
    setRowUpdate(prev => [...prev, Math.random()])
    setSpec(prev => [...prev, {spc:""}])
    setSpecValue(prev => [...prev, {val:""}])
  }
}} >+</button>
  <button type='button' onClick={()=>{
  if(rowUpdate.length !== 1){
    setRowUpdate(prev => prev.slice(0,-1))
    setSpec(prev => prev.slice(0,-1))
    setSpecValue(prev => prev.slice(0,-1))
  }
}} >-</button>
 <br/><br/><br/>

   <button type="submit">Submit</button>
   <button type="reset">Clear</button>
   </form>
  </>
  )
}

export default ProductAdd