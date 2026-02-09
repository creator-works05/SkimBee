import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRouter from './RouteMedium/PrivateRouter'
import Home from './Pages/Home'
import Login from './Pages/Login'
import NavBar from './Components/NavBar'
import SubNav from './Components/SubNav'
import UserAuth from './RouteMedium/UserAuth'

function App() {
  return (
    <>
   <Routes>
    <Route path='/' element={<PrivateRouter Home={<Home/>} />}/>
    <Route path='/auth' element={<UserAuth/>}/>
    <Route path='/login' element={<UserAuth/>}/>
   </Routes>
    </>
  )

}

export default App