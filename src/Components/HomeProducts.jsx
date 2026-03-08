import React, { useEffect, useState,useMemo } from 'react'
import { getMethod, putMethod } from '../ApiServices/autoMethod'
import { urlhomeProduct, urlmainType, urlproduct } from '../ApiServices/setUrl'
import '../Sryling/HomeProduct.css'
import axios from 'axios'

function HomeProducts() {
    const [product, setProduct] = useState([])
    const [wholeC, setWholeC] = useState([])
    const [mainCtgry, setMainCtgry] = useState([])
    const [homeP, setHomeP] = useState([])
    const [popAlert, setPopAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState("something gone wrong")
    const [formData, setFormData] = useState({ MCategory: "", SubCategory: "" })

     const theseProducts= useMemo(()=>{
                              return  product.filter((el, i) => {
                                return el.category.T1 === formData.MCategory && el.category.T2 === formData.SubCategory
                            })
                            },[product,formData])
     const thoseProducts= useMemo(()=>{
                              return  product.filter((el, i) => {
                                return el.category.T1 === formData.MCategory 
                            })
                            },[product,formData])

    useEffect(() => {
        getMethod(urlproduct)
            .then(res => { setProduct(res.data) })
            .catch(err => { console.log(err.message) })
    }, [])
    useEffect(() => {
        getMethod(urlhomeProduct)
            .then(res => { setHomeP(res.data[0].products) })
            .catch(err => { console.log(err.message) })

    }, [])
   
    useEffect(() => {
        getMethod(urlmainType)
            .then(res => {
                let temp = []
                res.data.map((el, i) => {
                    Object.keys(el).map((field, j) => {
                        if (j === 1) {
                            temp = [...temp, field]
                        }
                    })
                })
                setMainCtgry(temp)
                setWholeC(res.data)
            })
            .catch(err => { console.log(err.message) })
    }, [])

    useEffect(() => {

        // console.log(product[1]);
        // console.log(mainCtgry);
        console.log(wholeC)
        let temp = wholeC.find((el, i) => {

            return el?.[formData?.MCategory]
        })?.[formData?.MCategory].map((el, i) => {
            return el.subType
        })

        console.log(homeP, "homeP")
    }, [product, mainCtgry, wholeC, formData?.MCategory, formData, homeP])



    function handleChange(e) {
        let { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
        console.log(formData.MCategory)
        console.log(formData.SubCategory)

    }

    //FUNCTION HOME ADD

    function homeAdd(e, obj) {
        console.log(obj)
        

        if (homeP.length >= 20) {
            homeP.pop()
            homeP.push(obj.id)
        }
        else {
            homeP.push(obj.id)
        }
        putMethod(`${urlhomeProduct}/home`, { products: homeP })
            .then(res => console.log(res.data))
            .then(() => setHomeP(homeP))
            .then(() => {
                setAlertMsg(`Added ${obj.name}'s ${obj.id} f0r HomeProduct Page successfully. products count: ${homeP.length}`)
                setPopAlert(true)

            })
            .catch(err => {
                setAlertMsg(err.message)
                setPopAlert(true)

            })
    }

    function doClose() {
        setPopAlert(false)
    }
    function buttonLeave() {
        setAlertMsg('')
        setPopAlert(false)
    }

    return (
        <>
            <form >
                <select name="MCategory" required onChange={(e) => {
                    handleChange(e);

                    setFormData(prev => ({ ...prev, SubCategory: "" }))

                }}>
                    <option value="" selected >Choose main category</option>
                    {
                        mainCtgry.map((el, i) => {
                            return <option value={el} key={i}  >{el}</option>

                        })
                    }
                </select>
                <select name="SubCategory" value={formData.SubCategory} required onChange={(e) => {
                    handleChange(e);

                }} disabled={!formData.MCategory} >
                    <option value=""   >Choose Sub category</option>
                    {
                        wholeC.find((el, i) => {

                            return el?.[formData?.MCategory]
                        })?.[formData?.MCategory].map((el, i) => {
                            return <option key={i} value={el.subType} >{el.subType}</option>

                        })


                    }

                </select>




                <table className='table-hmprdct' >
                    <thead>
                        <tr>
                            <th>sl.no</th>
                            <th>Id</th>
                            <th>product</th>
                            <th>price</th>
                            <th>Image </th>
                            <th>add </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            formData.MCategory && !formData.SubCategory && 
                            thoseProducts?.map((el, i) => {
                                console.log(el.image)
                                return <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{el.id}</td>
                                    <td>{el.name}</td>
                                    <td>{el.price}</td>
                                    <td style={{ textAlign: "center" }}><img src={el.image} style={{ width: "100px", aspectRatio: "16/9", objectFit: "contain", objectPosition: "center" }} /></td>
                                    <td><button type='button' onMouseOut={buttonLeave} onClick={(e) => { homeAdd(e, el) }} disabled={popAlert} >Add</button></td>

                                </tr>
                            })
                        }
                        {

                            formData.MCategory && formData.SubCategory &&
                           theseProducts ?.map((el, i) => {
                                console.log(el.image)
                                return <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{el.id}</td>
                                    <td>{el.name}</td>
                                    <td>{el.price}</td>
                                    <td style={{ textAlign: "center" }}><img src={el.image} style={{ width: "100px", aspectRatio: "16/9", objectFit: "contain", objectPosition: "center" }} /></td>
                                    <td><button type='button' onClick={(e) => { homeAdd(e, el) }} onMouseOut={buttonLeave} disabled={popAlert}>Add</button></td>

                                </tr>
                            })
                        } 

                    </tbody>

                </table>


            </form>

            {popAlert && <div style={{ position: "fixed", top: "0", paddingLeft: "10%", paddingRight: "10%", left: "50%", transform: "translateX(-50%)", marginTop: "5px" }} className="alert alert-info " role="alert">
                {alertMsg} <button onClick={doClose} style={{ position: "absolute", top: "0", right: "0", border: "0", borderRadius: "4px", background: "rgb(187,200,140)" }}>close</button>
            </div>}

        </>
    )
}

export default HomeProducts