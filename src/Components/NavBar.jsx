import React from 'react'

function NavBar() {
  return (
    <>
    <div className="nav-bar-home ">
        <button><img src="/menuSmbl.png" alt="" /></button>
        <img src="" alt='Logo' />
        <div className='search-box-nvbr'>
          <input type='search' placeholder='search for your product here' />
          </div>
        <button className='signout-nvbr'> signout</button>

    </div>
    </>
  )
}

export default NavBar