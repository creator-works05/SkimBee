import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRouter({Home}) {
    let isLogin=localStorage.getItem("isLogin")
    console.log(isLogin==="true","----")
  return (
    <>
    {isLogin==="true"?Home:<Navigate to='/auth' />}
    {/* <h1>hello</h1> */}

    </>
  )
}

export default PrivateRouter