import React, { useEffect, useState } from 'react'
import { getMethod } from '../ApiServices/autoMethod'
import { urlmainType, urlproduct } from '../ApiServices/setUrl'
import '../Sryling/HomeProduct.css'

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

          console.log(formData)
    },[product,mainCtgry,wholeC,formData?.MCategory,formData])



    function handleChange(e){
        let {name,value}=e.target;
        setFormData({...formData,[name] : value})
        console.log(formData.MCategory)
        console.log(formData.SubCategory)
        
    }
  return (
    <>
   <form >
    <select name="MCategory"  required onChange={(e)=>{handleChange(e);
       
        setFormData(prev=>({...prev,SubCategory:""}))

    }}>
        <option value="" selected >Choose main category</option>
        {
            mainCtgry.map((el,i)=>{
            return <option value={el} key={i}  >{el}</option>
                
            })
        }
    </select>
    <select name="SubCategory" value={formData.SubCategory} required onChange={(e)=>{handleChange(e);
       
    }} disabled={!formData.MCategory} >
        <option value=""   >Choose Sub category</option>
        {
         wholeC.find((el,i)=>{
           
            return el?.[formData?.MCategory]
          })?.[formData?.MCategory].map((el,i)=>{
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
                <th>remove </th>

            </tr>
        </thead>
      <tbody>
             {
              formData.MCategory&&!formData.SubCategory&& product.filter((el,i)=>{
                return el.category.T1===formData.MCategory 
              })?.map((el,i)=>{
                console.log(el.image)
                return <tr key={i}>
                    <td>{i+1}</td>
                    <td>{el.id}</td>
                    <td>{el.name}</td>
                    <td>{el.price}</td>
                    <td style={{textAlign:"center"}}><img src={el.image} style={{ width:"100px",aspectRatio:"16/9",objectFit:"contain",objectPosition:"center"}}/></td>
                    <td><button>Add</button></td>
                    <td><button>Remove</button></td>
                </tr>
              })
            }
             {

             formData.MCategory && formData.SubCategory && product.filter((el,i)=>{
                return el.category.T1===formData.MCategory && el.category.T2===formData.SubCategory
              })?.map((el,i)=>{
                console.log(el.image)
                return <tr key={i}>
                    <td>{i+1}</td>
                    <td>{el.id}</td>
                    <td>{el.name}</td>
                    <td>{el.price}</td>
                    <td style={{textAlign:"center"}}><img src={el.image} style={{ width:"100px",aspectRatio:"16/9",objectFit:"contain",objectPosition:"center"}}/></td>
                    <td><button>Add</button></td>
                    <td><button>Remove</button></td>
                </tr>
              })
            }
        
        </tbody>
       
    </table>

    
   </form>
    </>
  )
}

export default HomeProducts