import React, { useState } from 'react'
import { Link, Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { MdOutlineMenu } from "react-icons/md";
import Login from './Login';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [loginOpen,setLoginOpen]=useState(false)
    

    const onToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };

    const OpenloginModal=()=>{
      setLoginOpen(true)
    } 

   
  return (
    
    <header className="sticky top-0 z-0  rounded">
    <div className="navbar-color h-14 flex justify-between  rounded sm:justify-end items-center">

      <div className="   font-playball sm:absolute left-0 right-0 sm:mx-auto w-1/4">
        Auto
      </div>
     
             
    
        <div className="flex items-center cursor-pointer">
        
          <Button  onClick={OpenloginModal} className="bg-transparent border-0">Login</Button>
        
        <Link to={'/driverSignup'}>
          <Button className="rounded-full px-3 py-1 text-black bg-white border-0 mr-4 sm:mr-8">
            Signup
          </Button>
        </Link>
      </div>
      <div
      className={`absolute bg-white left-0 top-full w-full items-center px-5 ${isMenuOpen ? "min-h-[35vh]" : "md:min-h-fit"}`}
      style={{ top: 'calc(100% + 0px)' }}  // Adjust to position below the header
    >
      <MdOutlineMenu
        onClick={onToggleMenu}
        className="text-2xl cursor-pointer md:hidden"
      />
      <ul
        className={`flex flex-col md:flex-row items-center gap-[7vw] ${isMenuOpen ? "block" : "hidden"} md:flex`}
      >
       <li>
                 <Link to={'/'} >
                 <a href="#" className=" font-semibold    ">
                   Home
                 </a>
                 </Link>
               </li>
               <li>
                 <Link to={'/driver'} >
                 <a  className=" font-semibold  ">
                   Driver
                 </a>
                 </Link>
               </li>
               <li>
               <Link to={'/'} >
                 <a  className=" font-semibold   ">
                 
                   Ride
                 </a>
                 </Link>
               </li>
               <li>
               <Link to={'/'} >
                 <a  className=" font-semibold   ">
         
                   About
                 </a>
                 </Link>
               </li>
      </ul>
    </div>
      
      
    </div>
    
  
<Login 
  isOpen={loginOpen}
  onRequestClose={() => setLoginOpen(false)}

/>
</header> 
  )
}

export default Header
