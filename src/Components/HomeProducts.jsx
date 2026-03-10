import React, { useEffect, useState, useMemo, useRef } from 'react'
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
    const [formData, setFormData] = useState({ MCategory: "", SubCategory: "", showHome: false })
    const [desableFlag,setDisableFlag] = useState(false)
    const homePset = useMemo(() => {
        return new Set(homeP)
    }, [homeP])
    const theseProducts = useMemo(() => {
        return product.filter((el, i) => {
            return el.category.T1 === formData.MCategory && el.category.T2 === formData.SubCategory
        })
    }, [product, formData.MCategory, formData.SubCategory])

    const thoseProducts = useMemo(() => {
        return product.filter((el, i) => {
            return el.category.T1 === formData.MCategory
        })
    }, [product, formData.MCategory])
    const showCollections = useMemo(() => {
        return product.filter((el, i) => {
            return homePset.has(el.id)
        })
    }, [product, homePset])


    useEffect(() => {
        getMethod(urlproduct)
            .then(res => { setProduct(res.data) })
            .then(() => { console.log("run now") })
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



        console.log(homeP, "homeP")
    }, [homeP])



    function handleChange(e) {
        let { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
        console.log(formData.showHome, "-----")

    }

    //FUNCTION HOME ADD

    function homeAdd(e, obj) {
        console.log(obj)
       

        if (homePset.has(obj.id)) {
            setPopAlert(true)
            setAlertMsg(`${obj.id} already exists in home page, try another field.`)
            return
        }
        let newArray = [...homeP]
        if (homeP.length >= 20) {
            newArray.shift() //difference betweeen slice and 

        }

        newArray.push(obj.id)

        putMethod(`${urlhomeProduct}/home`, {
            id: "home",
            products: newArray
        })
            .then(res => console.log(res.data))
            .then(() => {
                setAlertMsg(`Added ${obj.name}'s ${obj.id} f0r HomeProduct Page successfully. products count: ${newArray.length}`)
                setPopAlert(true)
                return getMethod(urlhomeProduct)
            })
            .then(res => {
                setHomeP(res.data[0].products)
                return getMethod(urlproduct)
            })
            .then((res) => {

                setProduct(res.data)
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

    function homeRemove(el) {
        let newArray = homeP.filter((elm) => elm !== el.id)
        setDisableFlag(true)
        setTimeout(() => {
            setDisableFlag(false)
        }, 1000)

        putMethod(`${urlhomeProduct}/home`, {
            id: "home",
            products: newArray
        })
            .then(res => console.log(res.data))
            .then(() => {
                setAlertMsg(`  ${el.id}, Product name: ${el.name} has been removed from the home page collection `)
                setPopAlert(true)
                return getMethod(urlhomeProduct)
            })
            .then(res => {
                setHomeP(res.data[0].products)
                return getMethod(urlproduct)
            })
            .then(res => setProduct(res.data))
            .catch(err => {
                setAlertMsg(err.message)
                setPopAlert(true)
            })

    }

    return (
        <>
            <form >
                <select name="MCategory" value={formData.MCategory} required onChange={(e) => {
                    handleChange(e);

                    setFormData(prev => ({ ...prev, SubCategory: "" }))

                }}>
                    <option value=""  >Choose main category</option>
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

                <label style={{ marginLeft: "2%" }}> Show home page collections <input type='checkbox' checked={formData.showHome} onChange={(e) => {
                    setFormData({ ...formData, showHome: e.target.checked })
                    console.log(formData.showHome)
                }} /></label>



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

                                if (homePset.has(el.id)) {
                                    return <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{el.id}</td>
                                        <td>{el.name}</td>
                                        <td>{el.price}</td>
                                        <td style={{ textAlign: "center" }}><img src={el.image} style={{ width: "100px", aspectRatio: "16/9", objectFit: "contain", objectPosition: "center" }} /></td>
                                        <td><button type='button' style={{ background: 'rgba(155, 155, 132, 0.6)', color: "rgb(3, 60, 61)" }} onMouseOut={buttonLeave} onClick={(e) => { homeAdd(e, el) }} disabled={true} >Add</button></td>

                                    </tr>
                                }
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
                            theseProducts?.map((el, i) => {

                                if (homePset.has(el.id)) {
                                    return <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{el.id}</td>
                                        <td>{el.name}</td>
                                        <td>{el.price}</td>
                                        <td style={{ textAlign: "center" }}><img src={el.image} style={{ width: "100px", aspectRatio: "16/9", objectFit: "contain", objectPosition: "center" }} /></td>
                                        <td><button type='button' style={{ background: 'rgba(155, 155, 132, 0.6)', color: "rgb(3, 60, 61)" }} onMouseOut={buttonLeave} onClick={(e) => { homeAdd(e, el) }} disabled={true} >Add</button></td>

                                    </tr>
                                }


                                return <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{el.id}</td>
                                    <td>{el.name}</td>
                                    <td>{el.price}</td>
                                    <td style={{ textAlign: "center" }}><img src={el.image} style={{ width: "100px", aspectRatio: "16/9", objectFit: "contain", objectPosition: "center" }} /></td>
                                    <td><button type='button' onClick={(e) => { homeAdd(e, el) }} disabled={popAlert}>Add</button></td>

                                </tr>
                            })
                        }

                    </tbody>

                </table>

            </form>
            {/* SHOW HOME COLLECTION */}
            {
                formData.showHome &&
                <table className='table-prev-hmprdct' >
                    <thead>
                        <tr>
                            <th>sl.no</th>
                            <th>Id</th>
                            <th>product</th>
                            <th>price</th>
                            <th>Image </th>
                            <th>Remove </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            showCollections.map((el, i) => {
                                return <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{el.id}</td>
                                    <td>{el.name}</td>
                                    <td>{el.price}</td>
                                    <td style={{ textAlign: "center" }}><img src={el.image} style={{ width: "200px", aspectRatio: "16/9", objectFit: "contain", objectPosition: "center" }} /></td>
                                    <td><button type='button'  onClick={() => { homeRemove(el) }} disabled={desableFlag}>Remove</button></td>

                                </tr>

                            })
                        }

                    </tbody>
                </table>

            }

            {popAlert && <div style={{ position: "fixed", top: "0", paddingLeft: "10%", paddingRight: "10%", left: "50%", transform: "translateX(-50%)", marginTop: "5px" }} className="alert alert-info " role="alert">
                {alertMsg} <button onClick={doClose} style={{ position: "absolute", top: "0", right: "0", border: "0", borderRadius: "4px", background: "rgb(187,200,140)" }}>close</button>
            </div>}

        </>
    )
}

export default HomeProducts