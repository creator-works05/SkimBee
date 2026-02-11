import axios, { Axios } from "axios"

const url ="http://localhost:3000/admin"
const getAdmin=()=>axios.get(url)
export {getAdmin}