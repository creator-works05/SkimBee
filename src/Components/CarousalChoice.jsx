import React, { useEffect,useState } from 'react'
import { getMethod, postMethod, putMethod } from '../ApiServices/autoMethod'
import { urlcarousal } from '../ApiServices/setUrl'

function CarousalChoice() {
    const [formData, setFormData] = useState({ image: "" })
    const [alertMsg, setAlertMsg] = useState("something gone wrong")
    const [popAlert, setPopAlert] = useState(false)
    const [isDisable,setIsDisable]=useState(false)

    const [forImage,setForImage]=useState([])
    useEffect(()=>{
        getMethod(urlcarousal)
        .then(res=>{
            console.log(res.data)
            setForImage(res.data)
        })
    },[])
    function addImage(e){
        e.preventDefault()
        if(!formData.image){
            setAlertMsg("you cant submit empty field")
            popAlert(true)
        }
      
        let arrow;
        let changeImage;
        let theNew=[];
        if(forImage.length!=0){
            theNew=[...forImage[0].img]
            if( forImage[0].img.length>5){   //changed 10 t0 5
            theNew.shift()
            theNew.pop()

             
        }
        }
        
        if(forImage.length===0){
            // forImage.push({id:"here",img:[{link:formData.image}]})
            
            changeImage={id:"here",img:[{link:formData.image}]}
            arrow=true;
            
        }
        else if(theNew.length<5){        //changed 10 t0 5
            // forImage[0].img.push({link:formData.image})
            // let obj=forImage[0].img
            // forImage.splice(0,1,{id:"here",img:obj})
            let temp=[...theNew]
            temp.push({link:formData.image})
            changeImage={id:"here",img:temp}
            arrow=false;
        }
        else if(theNew.length>=5){  //changed 10 to 5
            // forImage[0].img.splice(1,1)                                
            // forImage[0].img.push({link:formData.image})
            // let last=forImage[0].img[forImage[0].img.length-1]
            // let first=forImage[0].img[0]
            // forImage[0].img.splice(0,0,last)
            // forImage[0].img.push(first)
             let temp=[...theNew]
             temp.splice(0,1)
             temp.push({link:formData.image})
             let last=temp[temp.length-1]
             let first=temp[0]
             temp.splice(0,0,last)
             temp.push(first)
             changeImage={id:"here",img:temp}

            arrow=false;
            
        }
        setIsDisable(true)
        if(arrow){
            postMethod(urlcarousal,changeImage)
            .then(res=>setForImage([changeImage]))
            .catch(err=>console.log(err))
             .finally(()=>{
            setIsDisable(false)
            })
        }
        else{
            putMethod(urlcarousal+"/here",changeImage)
            .then(res=>{console.log("Updated",res.data)
                setForImage([changeImage]);
                setPopAlert(true)
                setAlertMsg("Image added successfully")
                setFormData({...formData,image:""})
            })
            .catch(err=>{console.log(err)
                setPopAlert(true)
                setAlertMsg("Something went wrong. Error is thrown.")
            })
            .finally(()=>{
            setIsDisable(false)
            })
        }

    }

    function changeInput(e){
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
        setPopAlert(false)
        setIsDisable(false)
      
    }
    function doClose(){
    setPopAlert(false)
}
    return (
        <>
            <form onSubmit={addImage} onReset={()=>{ setFormData({...formData,image:""})}} >
                <label>Carousal Image url:</label><br />
                <input onChange={changeInput} value={formData.image} type="text" name="image" pattern="^\S+$" title="No spaces allowed"   />
                <br /><br />
                <button type='submit' onMouseOut={()=>{setPopAlert(false)}} disabled={isDisable}> Post image </button>
                <button type="reset"> clear </button>

            </form>
             {popAlert&&<div style={{position:"fixed",top:"0",paddingLeft:"10%",paddingRight:"10%",left:"50%",transform:"translateX(-50%)",marginTop:"5px"}} className="alert alert-warning signupAlert" role="alert">
  {alertMsg} <button onClick={doClose} style={{position:"absolute",top:"0",right:"0",border:"0",borderRadius:"4px",background:"rgb(187,200,140)"}}>close</button>
</div>}
{
   forImage.length>0 && <div style={{display:'grid',gridTemplateColumns:"repeat(3        ,1fr)",width:"100%"}}>
   { forImage[0]?.img?.map((el,i)=>{
       return <img key={i} src={el.link} style={{objectFit:"cover", objectPosition:"center",height:"100%",width:"100%"}} />  })
     } </div> 
}
        </>
    )
}

export default CarousalChoice