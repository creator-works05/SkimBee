import axios from "axios"

const getMethod=(url)=>{
   return axios.get(url)
}
const postMethod=(url,data)=>{
   return axios.post(url,data)
}
export {getMethod,postMethod}
