import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Components/NavBar'
import SubNav from '../Components/SubNav'
import Carousel from './Carousel'
import HomeCollection from '../Components/HomeCollection'

function Home() {
  return (
    <>
    <NavBar/>
    <SubNav/>
    <Carousel/>
    <HomeCollection/>
    </>
  )
}

export default Home