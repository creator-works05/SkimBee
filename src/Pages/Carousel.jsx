import React, { useEffect, useRef, useState } from 'react'
import "../Sryling/CarouselHme.css"
import { getMethod } from '../ApiServices/autoMethod'
import { urlcarousal } from '../ApiServices/setUrl'

function Carousel() {
  const [crslData, setCrslData] = useState([])
  const [crslInside, setCrslInside] = useState([])
  const frame = useRef(null)
  const [index, setIndex] = useState(0)  //unsed, new upadated version doesnt need this 
  const [scrollSwitch, setScrollSwitch] = useState(true) // yet to be used
  const [scrollDir, setScrollDir] = useState(false) // yet to be used
  const indexRef = useRef(1);
  const timerRef = useRef(null);
  const breakRef =useRef(0)



  // const []
  useEffect(() => {
    getMethod(urlcarousal)
      .then(res => {
        console.log("API DATA:", res.data);
        setCrslData(res.data)
        // if(res.data.length!==0)return 
        let testing = res.data[0].img
        setCrslInside(testing)
      })
      .catch(e => console.log(e))
  }, [])

  //INITIAL SCROLL IS HAPPENING HERE
  useEffect(() => {
    if (crslInside.length === 0) return;

    const slider = frame.current;
    if (!slider) return;

    const width = slider.clientWidth;

    indexRef.current = 1;
    slider.scrollLeft = width;

  }, [crslInside.length]);

  //INDEX UPDATION  WITH SETINTERVAL
  useEffect(() => {
    if (crslInside.length === 0) return;

    const slider = frame.current;
    if (!slider) return;

    const interval = setInterval(() => {

      if (!scrollSwitch) return;

      const width = slider.clientWidth;

      indexRef.current += 1;

      slider.scrollTo({
        left: indexRef.current * width,
        behavior: "smooth"
      });

    }, 2000);

    return () => clearInterval(interval);

  }, [scrollSwitch, crslInside.length]);

  //HANDLE THE SCROLL EVENTS
  useEffect(() => {
    const slider = frame.current;
    if (!slider) return;

    const handleScroll = () => {
      // if (!scrollSwitch) return;
      const width = slider.clientWidth;

      // If reached cloneFirst
      if (slider.scrollLeft >= width * (crslInside.length - 1)) {

        slider.style.scrollBehavior = "auto"; // disable smooth
        slider.scrollLeft = width;            // jump instantly
        indexRef.current = 1;

        requestAnimationFrame(() => {
          slider.style.scrollBehavior = "smooth";
        });
      }


    };

    slider.addEventListener("scroll", handleScroll);

    return () => slider.removeEventListener("scroll", handleScroll);

  }, [crslInside.length]);


  function leftMove(e) {

    console.log(indexRef.current)
    clearTimeout(timerRef.current)
      if(breakRef.current===1){
      setScrollSwitch(false)
    }

    // if(indexRef.current===0){
    //   indexRef.current=crslInside.length-3;
    //   frame.current.style.scrollBehavior="none";
    //   frame.current.scrollLeft=frame.current.width*crslInside.length-3;

    //   return;
    // }
    // requestAnimationFrame(() => {
    //   frame.current.style.scrollBehavior = "smooth";

    // });
    if (indexRef.current <= 1) {
      console.log("hello")
      indexRef.current = crslInside.length - 2;
      frame.current.style.scrollBehavior = "auto";
      // frame.current.scrollLeft=frame.current.clientWidth*crslInside.length-1
      frame.current.scrollTo({
        left: indexRef.current * frame.current.clientWidth,
        behavior: "auto" //instant jump
      });
      console.log(indexRef.current, "after", frame.current.clientWidth * crslInside.length - 1)
      requestAnimationFrame(() => {
        frame.current.style.scrollBehavior = "smooth";
      });

      timerRef.current = setTimeout(() => {
      setScrollSwitch(true)
      console.log("hi")
      breakRef.current=1;
    }, 2000)


      return
    }
    indexRef.current = indexRef.current - 1;
    frame.current.scrollTo({
      left: indexRef.current * frame.current.clientWidth,
      behavior: "smooth"
    });

    timerRef.current = setTimeout(() => {
      setScrollSwitch(true)
      console.log("hi")
      breakRef.current=1;
    }, 2000)

  }
  function rightMove() {
    console.log(indexRef.current)
    clearTimeout(timerRef.current)
    if(breakRef.current===1){
      setScrollSwitch(false)
    }

    indexRef.current = indexRef.current + 1;
    frame.current.scrollTo({
      left: indexRef.current * frame.current.clientWidth,
      behavior: "smooth"
    });
    // scrollSwitch(false)
    timerRef.current = setTimeout(() => {
      setScrollSwitch(true)
      console.log("hi")
      breakRef.current=1;
    }, 2000)
  }

  return (
    <>
      <div className="Container-crsl">

        <div className="carousel-crsl">
          <div className="carousel-window-crsl">
            <div className="slider-crsl" ref={frame} onMouseLeave={() => setScrollSwitch(true)}>
              {
                crslInside.map((el, i) => {
                  return (
                    <img src={el.link} key={i} alt="img" className="slide-crsl" />
                  );
                })
              }
              <div className='pauseHere' onMouseOver={(e) => {
                setTimeout(() => {
                  e.target.style.background = "transparent"
                }, 500); e.target.style.background = "rgba(64, 224, 208, 0.43)"
              }} onClick={
                (e) => {
                  setTimeout(() => {
                    e.target.style.background = "transparent"
                  }, 200); e.target.style.background = "rgba(64, 224, 208, 0.39)";
                  setScrollSwitch(false)
                }

              }></div>
              <button className='LCarrow' onMouseOver={(e) => { setScrollSwitch(false) ;
                 e.target.style.background="rgba(64, 224, 208, 0.39)";
                 setTimeout(()=>{
                 e.target.style.background="transparent";

                 },1000)
               }} onClick={leftMove}><p>⟨</p> </button>
              <button className='RCarrow' onMouseOver={(e) => { setScrollSwitch(false);
                 e.target.style.background="rgba(64, 224, 208, 0.39)";
                 setTimeout(()=>{
                 e.target.style.background="transparent";


                 },1000)
                 console.log(e.target.closest)
               }} onClick={rightMove} ><p>⟩</p> </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Carousel