import React, { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { MdCardTravel } from "react-icons/md";
import { logout } from "../../slices/Auth.slice";
import  Login from './Login';
import Signup from "./Signup";
import FocusTrap from 'focus-trap-react';

import "./User.css";


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch=useDispatch()
  const [loginOpen,setLoginOpen]=useState(false)
  const [SignupOpen,setSignupOpen]=useState(false)
  const userToken=useSelector((state)=>state.auth.userToken)

  
   const logouthandler=async(req,res)=>{
    try {
      
    dispatch(logout())
      Navigate('/')
      
    } catch (error) {
      console.log(error);
    }
   }
 

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
    <div className=" navbar-color h-14 flex justify-between sm:justify-end items-center sm:px-4 md:px-4 md:rounded">
      <div className="   font-playball sm:absolute left-0 right-0 sm:mx-auto w-1/4">
        Auto
      </div>
      {userToken?(
         
              <div className="flex items-center  cursor-pointer">
             
              <MdCardTravel  onClick={logouthandler} className="text-white mr-5 text-3xl" />
              
              <Link to={'/profile'}>
              <CgProfile className=" text-white text-3xl" />
              </Link>
            </div>
           
      ):(
        <div className="flex items-center cursor-pointer">
        
          <Button onClick={OpenLogin} className="bg-transparent border-0">Login</Button>
        
          <Button  onClick={OpenSignup} className="rounded-full px-3 py-1 text-black bg-white border-0 mr-4 sm:mr-8">
            Signup
          </Button>
        
      </div>

      )}
        <div
      className={`absolute  bg-white left-0 top-full  w-full items-center px-5  ${isMenuOpen ? "min-h-[35vh]" : "md:min-h-fit"}  `}
      style={{ top: 'calc(100% + 0px)' }}  // Adjust to position below the header
    >
      <MdOutlineMenu
        onClick={onToggleMenu}
        className=" text-2xl cursor-pointer md:hidden"
      />
      <ul
        className={`flex flex-col px-3 md:flex-row items-center   gap-[7vw] ${isMenuOpen ? "block" : "hidden"} md:flex`}
      >
        <li>
          <a href="#" className=" font-passion    ">
            Home
          </a>
        </li>
        <li>
          <Link to={'/driver'} >
          <a  className=" font-passion rounded ">
            Driver
          </a>
          </Link>
        </li>
        <li>
          <a  className=" font-passion ">
          
            Ride
          </a>
        </li>
        <li>
          <a  className=" font-passion ">
          
            About
          </a>
        </li>
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

