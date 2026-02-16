import React, { useEffect, useRef, useState } from 'react'
import { getMethod, postMethod } from '../ApiServices/autoMethod'
import { urlmainType, urlproduct } from '../ApiServices/setUrl'
import { genNumberValue, genUserId } from '../JsExports/CommonJs'

function ProductAdd() {
  const [rowUpdate, setRowUpdate] = useState([1])
  let defDesc = `This product is designed to offer reliable performance and everyday convenience for a wide range of needs.
Built with quality materials, it combines functionality and value in a simple, practical design`
  const [formData, setFormData] = useState({ image: "", name: "", price: "", stock: "", offer: "", stockMin: 8, stockMax: 100, priceMin: 150, priceMax: 5000, desc:"", mainChoice: "", subChoice: "" })
  const [spec, setSpec] = useState([{ spec: "" }])
  const [specValue, setSpecValue] = useState([{ val: "" }])
  const [brd, setBrd] = useState([])
  const [mainCtgry, setMainCtgry] = useState([])
  const [subCtgry, setSubCtgry] = useState([])
  const [alertMsg, setAlertMsg] = useState("something gone wrong")
  const [popAlert, setPopAlert] = useState(false)

  
  let inputRef = useRef([])

  useEffect(() => {
    getMethod(urlmainType)
      .then(res => setMainCtgry(res.data))

  }, [])
  useEffect(() => {
    const temp = []
    const broad = []
    for (let t = 0; t < mainCtgry.length; t++) {
      Object.keys(mainCtgry[t]).forEach((field, k) => {
        if (k === 1) {
          mainCtgry[t][field].forEach((role) => {
            // broad.push({[field]:role})

            Object.keys(role).forEach((obj, c) => {
              if (c === 0) {
                broad.push({ [field]: role[obj] })
              }
              c === 0 && temp.push(role[obj])
            })



          })
        }
      })


    }

    setSubCtgry(temp)
    setBrd(broad)
  }, [mainCtgry])




  function forFocus(e, i) {
    if (e.key === "Enter") {
      e.preventDefault()
      const el = inputRef.current[i + 1]
      console.log(el, i + 1)
      if (el) {
        el.focus()
      }
    }
  }
  function formSubmit(e) {
    e.preventDefault()
    let { image, name, price, stock, offer, stockMin, stockMax, priceMin, priceMax, desc, mainChoice, subChoice }=formData
    if(!image||!price||!stock||!desc||!offer){
      image="/noImage.png"
      offer=0
      price=genNumberValue(Number(priceMin),Number(priceMax))
      stock=genNumberValue(Number(stockMin),Number(stockMax))
      desc=defDesc
    }
    const id=genUserId(name,15)
    const payload={
      id,
      name,
      image,
      price,
      stock,
      offer,
      category:{T1:mainChoice,T2:subChoice},
      desc,
      specInfo:spec,
      specDesc:specValue

    }
    console.log("=> -- ",payload)
    postMethod(urlproduct,payload)
    .then(res=>{
      console.log(res.data);
      let convetD=Object.entries(payload).reduce((acc,[key,value])=>{
        if(key==="specInfo"||key==="specDesc"){
          return acc
        }
        if(key==="category"){
          return acc+`Category{ T1: ${value.T1} , T2: ${value.T2} }`

        }
        return acc+`${key} : ${value} , \n`}," ")
      setFormData({...formData,image:"",name:""})
      setPopAlert(true)
      setAlertMsg(`Product Added SuccessFully : ${convetD} .`)
    })
    .catch(err=>{setPopAlert(true)
      setAlertMsg(`Adding product failed => ${err.message}`)
    })
    

  }
  function changeInputOne(e, i) {
    const { value } = e.target;

    setSpec(prev => {
      const updated = [...prev];
      updated[i] = { spec: value };
      return updated;
    });
  }

  function changeInputTwo(e, i) {
    const { value } = e.target;

    setSpecValue(prev => {
      const updated = [...prev];
      updated[i] = { val: value };
      return updated;
    });
  }

  function changeInputThree(e) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    console.log(formData)
    if(popAlert){
      setPopAlert(false)
      setSpec([{spec:""}])
      setSpecValue([{val:""}])
      
    }

  }
  function doClose(){
    setPopAlert(false)
}
  function formResetClick(e){
    setFormData({ image: "", name: "", price: "", stock: "", offer: "", stockMin: 8, stockMax: 100, priceMin: 150, priceMax: 5000, desc:"", mainChoice: "", subChoice: "" })

    
  }
  return (<>
    <form style={{ margin: "10px 20px" }} onSubmit={formSubmit} onReset={formResetClick} >
      <br />
      <label>Product Image url:</label><br />
      <input onChange={changeInputThree} value={formData.image} type="text" name="image" pattern="^\\S+$" title="No spaces allowed" ref={refOb => inputRef.current[0] = refOb} onKeyDown={(e) => { forFocus(e, 0) }} />
      <br /><br />
      {/* Selection----------------------------------------------------- */}

      <select name="mainChoice" value={formData.mainChoice} onChange={changeInputThree} required >
        <option value="" >Choose Main Category of Product </option>
        {mainCtgry.map((el, i) => {
          return Object.keys(el).map((field, j) => {

            return j === 1 && <option key={j} value={field}>{field}</option>
          })

        })}
      </select>
      <select name="subChoice" value={formData.subChoice} onChange={changeInputThree} required disabled={!formData.mainChoice}>
        <option value="" >Choose the sub category </option>
        {brd.map((item) =>
          Object.entries(item)
            .filter(([key]) => key === formData.mainChoice)
            .map(([_, value], i) =>{  return ( <option key={i} value={value}> {value} </option> )})
        )}

      </select>






      {/* Selection----------------------------------------------------- */}


      <br />
      <label>Product Name:</label><br />

      <input onChange={changeInputThree} value={formData.name} type="text" name="name" required pattern="^[A-Za-z0-9 ]{3,100}$" title="Only letters, numbers and spaces (3-100 characters)" ref={refOb => inputRef.current[1] = refOb} onKeyDown={(e) => { forFocus(e, 1) }} />
      <br />
      <label>Price:</label><br />
      <input onChange={changeInputThree} value={formData.price} type="number" name="price" min="0" step="1.0" ref={refOb => inputRef.current[2] = refOb} onKeyDown={(e) => { forFocus(e, 2) }} /> <input onChange={changeInputThree} value={formData.priceMin} type='number' name="priceMin" min={500} /><label>-</label><input onChange={changeInputThree} value={formData.priceMax} type='number' name="priceMax"  />
      <br /><br /><br />
      <label>Offer Percentage:</label><br />
      <input onChange={changeInputThree} value={formData.offer} type="number" name="offer" min="0" max="100" ref={refOb => inputRef.current[3] = refOb} onKeyDown={(e) => { forFocus(e, 3) }} />
      <br /><br /><br />
      <label>Stock:</label><br />
      <input onChange={changeInputThree} value={formData.stock} type="number" name="stock" min="0" ref={refOb => inputRef.current[4] = refOb} onKeyDown={(e) => { forFocus(e, 4) }} /> <input onChange={changeInputThree} value={formData.stockMin} type='number' name="stockMin" min={8} /><label>-</label><input onChange={changeInputThree} value={formData.stockMax} type='number' name="stockMax"max={2000} />

      <br /><br /><br />
      <textarea onChange={changeInputThree} value={formData.desc} name="desc" maxLength="250" ref={refOb => inputRef.current[5] = refOb} onKeyDown={(e) => { forFocus(e, 5) }} ></textarea>
      <br /><br /><br />
      <table>
        <thead>
          <tr>
            <th>Specification</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          {rowUpdate.map((el, i) => {
            //  let j=i+1;
            const baseIndex = 6 + i * 2
            return <tr key={i}>
              <td><textarea onChange={(e) => changeInputOne(e, i)} value={spec[i].spec} maxLength={200} name={`spec[${i}]`} placeholder="Specification" ref={refOb => inputRef.current[baseIndex] = refOb} onKeyDown={(e) => { forFocus(e, baseIndex) }}> </textarea></td>
              <td><textarea onChange={(e) => changeInputTwo(e, i)} value={specValue[i].val} name={`value[${i}]`} placeholder="Value" ref={refOb => inputRef.current[baseIndex + 1] = refOb} onKeyDown={(e) => { forFocus(e, baseIndex) }}>  </textarea></td>
            </tr>
          })}
        </tbody>
      </table>
      <button type="button" onClick={() => {
        if (rowUpdate.length <= 10) {
          setRowUpdate(prev => [...prev, Math.random()])
          setSpec(prev => [...prev, { spec: "" }])
          setSpecValue(prev => [...prev, { val: "" }])
        }
      }} >+</button>
      <button type='button' onClick={() => {
        if (rowUpdate.length !== 1) {
          setRowUpdate(prev => prev.slice(0, -1))
          setSpec(prev => prev.slice(0, -1))
          setSpecValue(prev => prev.slice(0, -1))
        }
      }} >-</button>
      <br /><br /><br />

      <button onMouseLeave={()=>{popAlert&&setPopAlert(false)}} type="submit">Submit</button>
      <button type="reset" >Clear</button>
    </form>
     {popAlert&&<div style={{color:"indigo",position:"fixed",top:"0",paddingLeft:"10%",paddingRight:"10%",left:"50%",transform:"translateX(-50%)",marginTop:"5px"}} className="alert alert-warning signupAlert" role="alert">
  {alertMsg} <button onClick={doClose} style={{position:"absolute",top:"0",right:"0",border:"0",borderRadius:"4px",background:"rgb(187,200,140)"}}>close</button>
</div>}
  </>
  )
}

export default ProductAdd