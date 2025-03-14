import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Login from './Login'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
function HomeScreen() {
  console.log("driver");
  const {isAuthenticated}=useSelector((state)=>state.driverAuth)
  const [loginOpen,SetLoginOpen]=useState(false)
 const navigate=useNavigate()
  const OpenLoginModal=()=>{
    SetLoginOpen(true)
  }
useEffect(()=>{
  if(isAuthenticated){
      navigate('/dashboard')
  }
},[navigate,isAuthenticated])


  return (
    <>
   
   

    <div className='  bg-cover bg-center min-w-10 items-center   footer-color h-[80vh] relative position-relative' style={{ backgroundImage: 'url(./banner2.jpg)  ' }}>
      <div className="absolute  inset-0 bg-black md:opacity-90 opacity-80 z-0"></div>

      <div className=' fixed-top  ml-15 lg:ml-16 sm:w-11/12 md:py-6  md:w-11/12 items-center justify-center animate-slide-down '  >
          <Header  />
          </div>
      <div className='relative flex flex-col items-center justify-center h-full  '>
        
        <h1 className='font-passion navbar-color pt-14  text-3xl bg-transparent   md:text-6xl animate-slide-down '>Drive at your pace</h1>
        <h1 className='font-passion  text-3xl md:text-6xl mr-4  text-center relative   animate-slide-up '>
    earn at your place
  </h1>
 
  
  <button
    type="submit"
    onClick={OpenLoginModal}
    className="p-1 font-robot-bold mr- border-0 text-white navbar-color rounded px-4 mt-6 relative  shadow-lg animate-3d-button  "
  >
    Start
  </button>
      </div>
     
    </div>
  

<Login isOpen={loginOpen} />
<div className=''>
        <Footer className='' />
      </div>
</>
  )
}

export default HomeScreen
