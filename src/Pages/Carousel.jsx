import React,{useEffect,useState} from 'react'
import "../Sryling/CarouselHme.css"
import { getMethod } from '../ApiServices/autoMethod'
import { urlcarousal } from '../ApiServices/setUrl'

function Carousel() {
  const [crslData,setCrslData]=useState([])
  useEffect(()=>{
    getMethod(urlcarousal)
    .then(res=>setCrslData(res.data))
    .catch(e=>console.log(e))
  },[])
  return (
    <>
    <div className="Container-crsl">

    <div className="carousel-crsl">
        <div className="carousel-window-crsl">
            <div className="slider-crsl">
                {
                  crslData[0]?.img?.map((el,i)=>{
                    return  <img src={el.link} key={i} alt="img" className='slide-crsl' />
                  })
                 }
               
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Carousel