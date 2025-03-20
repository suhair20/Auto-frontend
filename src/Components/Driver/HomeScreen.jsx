import React, { useEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Login from './Login'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaUserTie, FaTaxi,FaFileAlt, FaStar, FaUserPlus } from 'react-icons/fa';

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
   
   

    <div className='bg-center bg-cover h-[80vh] position-relative footer-color items-center min-w-10 relative' style={{ backgroundImage: 'url(./banner2.jpg)  ' }}>
      <div className="bg-black absolute inset-0 md:opacity-90 opacity-80 z-0"></div>

      <div className='justify-center animate-slide-down fixed-top items-center lg:ml-16 md:py-6 md:w-11/12 ml-15 sm:w-11/12'  >
          <Header  />
          </div>
      <div className='flex flex-col h-full justify-center items-center relative'>
        
      <h1 className="bg-clip-text bg-gradient-to-tl text-4xl text-transparent animate-slide-down font-passion from-green-600 md:text-6xl pt-14 to-gray-800">
  Drive at your pace
</h1>

        <h1 className='text-4xl text-center animate-slide-up font-passion md:text-6xl mr-4 relative'>
    earn at your place
  </h1>
 
  
  <button
    type="submit"
    onClick={OpenLoginModal}
    className="navbar-color bg-gradient-to-br border-0 p-1 rounded shadow-lg text-white animate-pulse font-robot-bold from-green-600 mr- mt-6 px-4 relative to-gray-800"
  >
    Start
  </button>
      </div>
     
    </div>

    <div className='bg-gradient-to-l justify-center p-3 from-green-600 items-center min-h-screen to-gray-800' >
        <div className='px-36' >
            <p className='text-4xl text-white font-bold md:p-3' >Why drive with us ?</p>
        </div>
       <div className='px-8' >
       <div className='bg-center h-[70vh] items-center'  >
       <img src="/pp-t-removebg-preview.png" alt="Image" className="h-[60vh] mx-auto" />
      </div>

      
      <div className="flex flex-col justify-center gap-5 items-center md:flex-row md:items-start md:ml-20 md:px-8">
  
  {/* Box 1 */}
  <div className="flex flex-col h-40 justify-center rounded text-center w-full items-center md:items-start md:text-left md:w-1/3 p">
    <FaTaxi className="text-3xl text-white mb-3 md:mr-auto" /> 
    <p className="text-2xl text-white">Set your own hours</p>
    <p className="text-white">You decide when and how often you drive</p>
  </div>

  {/* Box 2 */}
  <div className="flex flex-col h-40 justify-center rounded text-center w-full items-center md:items-start md:text-left md:w-1/3 p">
    <FaMoneyBillWave className="text-3xl text-white mb-3 md:mr-auto" />
    <p className="text-2xl text-white">Get paid fast</p>
    <p className="text-white">Weekly payments in your bank account.</p>
  </div>

  {/* Box 3 */}
  <div className="flex flex-col h-40 justify-center rounded text-center w-full items-center md:items-start md:text-left md:w-1/3 p">
    <FaUserTie className="text-3xl text-white mb-3 md:mr-auto" />
    <p className="text-2xl text-white">Get support at every turn</p>
    <p className="text-white">If there’s anything that you need, you can reach us anytime.</p>
  </div>

</div>




       </div>

       <div className='md:px-16 mt-12' >
            <p className='p-3 text-4xl text-white font-bold' >Here's what you need to sign up</p>
        </div>
        <div  className='flex flex-col gap-5 md:flex-row md:ml-28 md:px-8' >
         <div  className='flex flex-col h-40 justify-center rounded items-center md:p-4 md:w-1/3' >
         < FaStar className='text-3xl text-white mb-3' />
         <p className='text-2xl text-white' >Requirements</p>
         <p className='text-gray-300 md:ml-8' >  • Be at least 18 years old</p>
         <p className='text-gray-300 md:ml-8' > • Clear a background screening</p>
         </div>
         

         <div  className='flex flex-col h-40 justify-center rounded items-center md:p-4 md:w-1/3' >
         <FaFileAlt className='text-3xl text-white mb-3' />
         <p className='text-2xl text-white' >Documents</p>
         <p className='text-gray-300 md:ml-8' > • Valid driver's license (private or commercial), if you plan to drive</p>
         <p className='text-gray-300 md:ml-8' > • Proof of residency in your city, state or province</p>
         <p className='text-gray-300 md:ml-8' > • Auto documents such as commercial insurance, vehicle registration certificate, permit</p>
         </div>


         <div  className='flex flex-col h-40 justify-center rounded items-center md:p-4 md:w-1/3' >
         <FaUserPlus className='text-3xl text-white mb-3' />
         <p className='text-2xl text-white' >Signup process</p>
         <p className='text-gray-300 md:ml-8' > • Submit documents and photo </p>
         <p className='text-gray-300 md:ml-8' > • Provide information for a background check </p>
         </div>

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
