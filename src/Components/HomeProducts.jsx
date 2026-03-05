import React, { useEffect, useState } from 'react'
import { getMethod } from '../ApiServices/autoMethod'
import { urlmainType, urlproduct } from '../ApiServices/setUrl'

function HomeProducts() {
    const [product,setProduct]=useState([])
    const [wholeC,setWholeC]=useState([])
    const [mainCtgry,setMainCtgry]=useState([])
    const [formData,setFormData]=useState({MCategory:"",SubCategory:""})
    useEffect(()=>{
        getMethod(urlproduct)
        .then(res=>{setProduct(res.data)})
        .catch(err=>{console.log(err.message)})
    },[])
    useEffect(()=>{
        getMethod(urlmainType)
        .then(res=>{
            let temp=[]
            res.data.map((el,i)=>{
                Object.keys(el).map((field,j)=>{
                    if(j===1){
                        temp=[...temp,field]
                    }
                })
            })
            setMainCtgry(temp)
            setWholeC(res.data)
        })
        .catch(err=>{console.log(err.message)})
    },[])

    useEffect(()=>{
       
        // console.log(product[1]);
        // console.log(mainCtgry);
        console.log(wholeC)
        let temp= wholeC.find((el,i)=>{
           
            return el?.[formData?.MCategory]
          })?.[formData?.MCategory].map((el,i)=>{
            return el.subType
          })

          console.log(temp)
    },[product,mainCtgry,wholeC,formData?.MCategory])



    function handleChange(e){
        let {name,value}=e.target;
        setFormData({...formData,[name] : value})
        console.log(formData.MCategory)
        console.log(formData.SubCategory)
    }
  return (
    <>
   <form >
    <select name="MCategory" required onChange={handleChange}>
        <option value="" selected >Choose main category</option>
        {
            mainCtgry.map((el,i)=>{
            return <option value={el} key={i}  >{el}</option>
                
            })
        }
    </select>
    <select name="SubCategory" onChange={handleChange} >
        <option value="" selected required >Choose Sub category</option>
        {
         wholeC.find((el,i)=>{
           
            return el?.[formData?.MCategory]
          })?.[formData?.MCategory].map((el,i)=>{
           return <option value={el.subType} >{el.subType}</option>
            
          })
          
          
        }

    </select>
    <table>
        <thead>
            <tr>
                <th>sl.no</th>
                <th>Id</th>
                <th>product</th>
                <th>Image </th>
                <th>add </th>
                <th>remove </th>

            </tr>
        </thead>
        <tbody>
            {
              product.filter((el,i)=>{
                return el.category.T1===formData.MCategory && el.category.T2===formData.SubCategory
              })
            }
        </tbody>
    </table>
   </form>
    </>
  )
}

export default HomeProducts