
const genUserId=(name,length)=>{
    let str1=name.split(" ").join("").slice(0,10)
    let str2=Number(Date.now().toString().split("").reverse().join("")).toString(36).slice(0,3)
    let clen=str1.length+str2.length
    return str1+str2+Math.random().toString(36).slice(2,(length-clen)+2)
}

export {genUserId}