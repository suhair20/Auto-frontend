import React, { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { MdCardTravel } from "react-icons/md";

import  Login from './Login';
import Signup from "./Signup";
import FocusTrap from 'focus-trap-react';

import "./User.css";


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [loginOpen,setLoginOpen]=useState(false)
  const [SignupOpen,setSignupOpen]=useState(false)
  const {isAuthenticated}=useSelector((state)=>state.auth)
  
  const location= useLocation()
  
  const isBookingPage = location.pathname === "/booking";
 

  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const OpenLogin =()=>{
     setLoginOpen(true)
  }
   const closeLoginModal = () => {
    setLoginOpen(false);
  };

  const OpenSignup=()=>{
    setSignupOpen(true)
  }

  return (
    <header className="sticky top-0 z-0  md:rounded">
    <div className=" navbar-color bg-gradient-to-tr from-green-600 to-gray-800 h-12 flex justify-between sm:justify-end items-center sm:px-4 md:px-4 md:rounded">
      <div className="   font-playball sm:absolute left-0 right-0 sm:mx-auto w-1/4">
        Auto
      </div>
      {isAuthenticated?(
         
              <div className="flex items-center p-2 cursor-pointer">
             <Link   to={'/RideHistory'} >
              <MdCardTravel className="text-white mr-5 text-3xl" />
              </Link>
              <Link to={'/profile'}>
              <CgProfile className=" text-white text-3xl" />
              </Link>
            </div>
           
      ):(
        <div className="flex items-center p-2 cursor-pointer">
        
          <Button onClick={OpenLogin} className="bg-transparent border-0 animate-bounce ">Login</Button>
        
          <Button  onClick={OpenSignup} className="rounded-full px-3 py-1 text-black bg-white border-0 mr-4 sm:mr-8  ">
            Signup
          </Button>
        
      </div>

      )}
        <div
  className={`absolute bg-white left-0 top-full w-full items-center px-5 
  ${isBookingPage ? "min-h-[1vh]" : isMenuOpen ? "min-h-[35vh]" : "md:min-h-[1vh]"}`}
  style={{ top: 'calc(100% + 0px)' }}
>
      {!isBookingPage && (
      <MdOutlineMenu
        onClick={onToggleMenu}
        className=" text-2xl cursor-pointer md:hidden"
      />
    )}
     <ul
  className={`flex flex-col md:flex-row items-center      gap-[7vw] 
    ${isBookingPage ? "flex" : isMenuOpen ? "flex" : "hidden"} md:flex`}
>
        {location.pathname==='/'?(
           <>
           <li>
           <Link to={'/'} >
           <a href="#" className=" font-semibold   text-sm   ">
             Home
           </a>
           </Link>
         </li>
         <li>
           <Link to={'/driver'} >
           <a  className=" font-semibold  text-sm ">
             Driver
           </a>
           </Link>
         </li>
         <li>
         <Link to={'/'} >
           <a  className=" font-semibold text-sm  ">
           
             Ride
           </a>
           </Link>
         </li>
         <li>
         <Link to={'/'} >
           <a  className=" font-semibold text-sm  ">
   
             About
           </a>
           </Link>
         </li>
         </>
          
        ):(
          <li className="     md:px-52" >
         <a href="#" className="relative font-passion after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full  after:rounded after:h-[3px] after:bg-lime-900 after:animate-[underline_1.5s_infinite]">
  Ride
</a>
        </li>
         
        )}
        
      </ul>
    </div>
    </div>
    
    <Login 
  isOpen={loginOpen}
  onRequestClose={() =>setLoginOpen(false) }

/>
<Signup 
 isOpen={SignupOpen}
 onRequestClose={()=>setSignupOpen(false)}

/>
  </header>
  
  );
}

export default Header;

