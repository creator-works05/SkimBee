import axios from "axios"

const url="http://localhost:3000/users"
const getUser=()=>{
    return axios.get(url)
}
const postUser=(user)=>{
    return axios.post(url,user)
}
export {getUser,postUser}