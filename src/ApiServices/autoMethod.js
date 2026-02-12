import axios from "axios"

const getMethod=(url)=>{
   return axios.get(url)
}
const postMethod=(url,data)=>{
   return axios.post(url,data)
}
const putMethod=(url,data)=>{
   return axios.put (url,data)
}
export {getMethod,postMethod,putMethod}
