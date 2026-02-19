import React,{useEffect, useState} from 'react'
import { getMethod } from '../ApiServices/autoMethod'
import { urlmainType } from '../ApiServices/setUrl'

function SubNav() {
  const [fetchedArray,setFetchedArray]=useState([])
  useEffect(()=>{
    getMethod(urlmainType)
    .then(res=>{
     let theNew= res.data.map((el,i)=>{
        
      return Object.keys(el)[1]

      })
      setFetchedArray(theNew)
      console.log(fetchedArray)
    })
    .catch(err=>console.log(err))
  },[])
  return (
    <>
    <div className="sub-nav-sbnv">
        <button className="category-sbnv"><p>category</p></button>
        <div className="inner-one-sbnv">
          {/* <button className='the-first-sbnv'>random</button> */}
          {
            fetchedArray.length>0 && fetchedArray.map((el,i)=>{
              return <button key={i}>{el}</button>
            })
          }
          
        </div>

    </div>
    </>
  )
}

export default SubNav