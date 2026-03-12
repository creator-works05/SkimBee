import React, { useMemo, useState } from 'react'
import { getMethod } from '../ApiServices/autoMethod'
import { urlhomeProduct, urlproduct } from '../ApiServices/setUrl'
import "../Sryling/HomeCollection.css"

function HomeCollection() {
    const [product,setProduct]=useState([])
    const [homeP,setHomeP]=useState([])
    const homePSet=useMemo(()=>{
        return new Set(homeP)
    },[homeP])

    const filterProduct=useMemo(()=>{
        return product.filter((el,i)=>{
            return homePSet.has(el.id)
        })
        
    },[product,homePSet])
    useState(()=>{
        getMethod(urlproduct)
        .then((res)=>setProduct(res.data))
        .catch(err=>console.log(err.message))
        
    },[])
    useState(()=>{
        getMethod(urlhomeProduct)
        .then((res)=>setHomeP(res.data[0].products))
        .catch(err=>console.log(err.message))
        
    },[])
     return (
    <>
    <div className="collection-hmclctn">
        {
            filterProduct.map((el,i)=>{
                let j=i+1;
                if(j<=4){
                    if(j===1){
                        return <div className='big-hmclctn'>
                            <img src={el.image} />
                            <h4>{el.name}</h4>
                            <p>{el.desc}</p>
                           <h5>₹ {el.price}</h5>
                        </div>
                    }
                    if(j===2){
                        return <div className='small-hmclctn'>
                            <img src={el.image} />
                            <h4>{el.name}</h4>
                            <p>{el.desc}</p>
                           <h5>₹ {el.price}</h5>
                        </div>

                    }
                    if(j===3){
                        return <div className='big-hmclctn'>
                            <img src={el.image} />
                            <h4>{el.name}</h4>
                            <p>{el.desc}</p>
                           <h5>₹ {el.price}</h5>
                        </div>

                    }
                    if(j===4){

                        return <div className='flex-hmclctn' style={{gridColumn:"span 4"}}>
                            <img src={el.image} />
                            <h4>{el.name}</h4>
                            <p>{el.desc}</p>
                           <h5>₹ {el.price}</h5>
                        </div>
                    }
                }
                else if(j<=8){
                     if(j===5 || j===6){
                        return <div className='mid-hmclctn'>
                            <img src={el.image} />
                            <h4>{el.name}</h4>
                            <p>{el.desc}</p>
                           <h5>₹ {el.price}</h5>
                        </div>
                    }
                    if(j===7){
                        return <div style={{gridColumn:"span 4"}} className='flex-hmclctn'>
                            <img src={el.image} />
                            <h4>{el.name}</h4>
                            <p>{el.desc}</p>
                           <h5>₹ {el.price}</h5>
                        </div>

                    }
                    if(j===8){

                        return <div className='big-hmclctn'>
                            <img src={el.image} />
                            <h4>{el.name}</h4>
                            <p>{el.desc}</p>
                           <h5>₹ {el.price}</h5>
                        </div>
                    }
                }
                else if(j<=12){
                     if(j===9|| j===12){
                        return <div className='small-hmclctn'>
                             <img src={el.image} />
                            <h4>{el.name}</h4>
                            <p>{el.desc}</p>
                           <h5>₹ {el.price}</h5>

                        </div>
                    }
                    if(j===10||j===11){
                        return <div style={{gridColumn:"span 6"}} className='flex-hmclctn'>
                            <img src={el.image} />
                            <h4>{el.name}</h4>
                            <p>{el.desc}</p>
                           <h5>₹ {el.price}</h5>
                        </div>

                    }
                    
                }
                else if(j<=16){
                     if(j===13  ){
                        return <div className='big-hmclctn'>
                            <img src={el.image} />
                            <h4>{el.name}</h4>
                            <p>{el.desc}</p>
                           <h5>₹ {el.price}</h5>
                        </div>
                    }
                    if(j===14 ||j===16){
                        return <div className='mid-hmclctn'>
                            <img src={el.image} />
                            <h4>{el.name}</h4>
                            <p>{el.desc}</p>
                           <h5>₹ {el.price}</h5>

                        </div>

                    }
                    if(j===15){

                        return <div style={{gridColumn:"span 4"}} className='flex-hmclctn'>
                            <img src={el.image} />
                            <h4>{el.name}</h4>
                            <p>{el.desc}</p>
                           <h5>₹ {el.price}</h5>
                        </div>
                    }
                }
                else{
                     if(j===17||j===20){
                        return <div className='big-hmclctn'>
                            <img src={el.image} />
                            <h4>{el.name}</h4>
                            <p>{el.desc}</p>
                           <h5>₹ {el.price}</h5>
                        </div>
                    }
                    if(j===18){
                        return <div style={{gridColumn:"span 4"}} className='flex-hmclctn'>
                            <img src={el.image} />
                            <h4>{el.name}</h4>
                            <p>{el.desc}</p>
                           <h5>₹ {el.price}</h5>
                        </div>

                    }
                    if(j===19){

                        return <div className='small-hmclctn'>
                            <img src={el.image} />
                            <h4>{el.name}</h4>
                            <p>{el.desc}</p>
                           <h5>₹ {el.price}</h5>

                            
                        </div>
                    }
                }

            })
        }

    </div>
    </>
  )
}

export default HomeCollection