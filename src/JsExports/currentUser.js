
import { getUserLogs } from "../ApiServices/userLogs";

export function currentUser(genToken,userId){

    return getUserLogs()
    .then(res=>{
        let check=res.data.some((el,_)=>genToken===el.id&&userId===el.userId)
        return check
        
    })
    .catch(err=>{console.log(err)
        return false
    })
}