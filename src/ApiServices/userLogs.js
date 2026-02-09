import axios from "axios"

const url="http://localhost:3000/userLogs"
export const getUserLogs=()=>axios.get(url);
export const postUserLogs=(data)=>axios.post(url,data);