import React, { useState } from 'react'

function NavBar() {
  const [sample,setSample]=useState("no refresh")
  function doSignout(){
    
    setSample("do refresh")
    localStorage.removeItem("genToken")
    localStorage.removeItem("userNow")
    window.location.reload()

  }
  return (
    <>
    <div className="nav-bar-home ">
        <button><img src="/menuSmbl.png" alt="" /></button>
        <img src="" alt='Logo' />
        <div className='search-box-nvbr'>
          <input type='search' placeholder='search for your product here' />
          </div>
        <button className='signout-nvbr' onClick={doSignout}> signout</button>

    </div>
    </>
  )
}

export default NavBar