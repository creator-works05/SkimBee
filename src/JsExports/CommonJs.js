
const genUserId=(name,length)=>{
    let str1=name.split(" ").join("").slice(0,10)
    let str2=Number(Date.now().toString().split("").reverse().join("")).toString(36).slice(0,3)
    let clen=str1.length+str2.length
    return str1+str2+Math.random().toString(36).slice(2,(length-clen)+2)
}
const genNumberValue=(min,max)=>{
    let genValue=Math.random()*max+min+1;
    let support= Math.random()*10;
    support=Math.round(support);
    if(support===0){
        support+=1;
        support+=Math.random()*10;
        support=Math.round(support);
    }
    
  console.log("support :",support,"min and max",min,max,"")
  console.log("if greater than max:",Math.ceil((min+max)/support+1),Math.ceil((min+max)/(support+1)),"else:",Math.ceil(genValue) )

    return genValue>=max? Math.ceil(min+Math.random()*(max-min)):Math.ceil(genValue)
    
}

export {genUserId,genNumberValue}    