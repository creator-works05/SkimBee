import React, { useEffect,useState } from 'react'
import { getMethod, postMethod, putMethod } from '../ApiServices/autoMethod'
import { urlcarousal } from '../ApiServices/setUrl'

function CarousalChoice() {
    const [formData, setFormData] = useState({ image: "" })
    const [alertMsg, setAlertMsg] = useState("something gone wrong")
    const [popAlert, setPopAlert] = useState(false)

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
      
        let arrow;
        let changeImage;
        let theNew;
        if(forImage.length!=0){
            theNew=[...forImage[0].img]
            if(forImage[0].img.length>10){
            theNew.shift()
            theNew.pop()

             
        }
        }
        
        if(forImage.length===0){
            // forImage.push({id:"here",img:[{link:formData.image}]})
            
            changeImage={id:"here",img:[{link:formData.image}]}
            arrow=true;
            
        }
        else if(theNew.length<10){
            // forImage[0].img.push({link:formData.image})
            // let obj=forImage[0].img
            // forImage.splice(0,1,{id:"here",img:obj})
            let temp=[...theNew]
            temp.push({link:formData.image})
            changeImage={id:"here",img:temp}
            arrow=false;
        }
        else if(theNew.length>=10){
            // forImage[0].img.splice(1,1)                                
            // forImage[0].img.push({link:formData.image})
            // let last=forImage[0].img[forImage[0].img.length-1]
            // let first=forImage[0].img[0]
            // forImage[0].img.splice(0,0,last)
            // forImage[0].img.push(first)
             let temp=[...theNew]
             temp.splice(1,1)
             temp.push({link:formData.image})
             let last=temp[temp.length-1]
             let first=temp[0]
             temp.splice(0,0,last)
             temp.push(first)
             changeImage={id:"here",img:temp}

            arrow=false;
            
        }
        if(arrow){
            postMethod(urlcarousal,changeImage)
            .then(res=>console.log("posted",res.data))
            .catch(err=>console.log(err))
        }
        else{
            putMethod(urlcarousal+"/here",changeImage)
            .then(res=>console.log("Updated",res.data))
            .catch(err=>console.log(err))
        }

    }

    function changeInput(e){
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
      
    }
    function doClose(){
    setPopAlert(false)
}
    return (
        <>
            <form onSubmit={addImage} >
                <label>Carousal Image url:</label><br />
                <input onChange={changeInput} value={formData.image} type="text" name="image" pattern="^\\S+$" title="No spaces allowed"   />
                <br /><br />
                <button type='submit'> Post image </button>
                <button type="reset"> clear </button>

            </form>
             {popAlert&&<div style={{position:"fixed",top:"0",paddingLeft:"10%",paddingRight:"10%",left:"50%",transform:"translateX(-50%)",marginTop:"5px"}} className="alert alert-warning signupAlert" role="alert">
  {alertMsg} <button onClick={doClose} style={{position:"absolute",top:"0",right:"0",border:"0",borderRadius:"4px",background:"rgb(187,200,140)"}}>close</button>
</div>}
        </>
    )
}

export default CarousalChoice