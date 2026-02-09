import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar'
import SubNav from '../Components/SubNav'
import Carousel from './Carousel'

function Home() {
  return (
    <>
    <NavBar/>
    <SubNav/>
    <Carousel/>
    </>
  )
}

export default Home