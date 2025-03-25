import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../slices/userSlice'
import { useDispatch,useSelector } from 'react-redux';
import { setauthenticated } from '../../slices/Auth.slice';
import { IoClose } from "react-icons/io5";
import Signup from "./Signup";


import Modal from 'react-modal';
Modal.setAppElement('#root'); 
const Login =({isOpen,onRequestClose})=>{


  const navigate = useNavigate()
  const dispatch=useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
   const [SignupOpen,setSignupOpen]=useState(false)

   const validateForm = ( email, password) => {
   
  
    if (!email) {
      setError('Email is required');
      return false;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format regex
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return false;
    }
  
    if (!password) {
      setError('Password is required');
      return false;
    }
  
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
  
    
  
    setError(''); // Clear previous errors if all validations pass
    return true;
  };



  const [login, { isLoading: loginLoading }] = useLoginMutation()

  const OpenSignup=()=>{
    setSignupOpen(true)
  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const isvalid=validateForm(email,password)
      if(isvalid){
      const res = await login({ email, password }).unwrap()
      console.log(res.user);
      if(res.success){
        dispatch(setauthenticated(res.User)); 
        onRequestClose()
      navigate('/')
     
      }
    }
    } catch (error) {
      console.log(error?.data?.message);
      if (error?.data && error?.data?.message) {
        setError(error.data.message)
      }
    }
  }

  return (
    <>
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnOverlayClick={true}
     contentLabel="Login Modal" 
      className="fixed inset-0 flex items-center z-50 justify-center p-4"
      overlayClassName="fixed inset-0 bg-black z-50 bg-opacity-50"
    >
    
      <div className='bg-white  p-6 rounded shadow-md md:w-[350px]  w-[350px] '>
      <div className="    text-2xl font-bold cursor-pointer" onClick={onRequestClose}>
      <IoClose />
        </div>
        <p className=' bg-clip-text text-transparent font-serif  top-4 bg-gradient-to-tr from-green-600 to-gray-900 text-center uppercase text-3xl  '>Login</p>
        <div className=' flex flex-col items-center mt-8' >
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
        <div className="flex gap-2 w-full">
        <label className='  text-xs font-robot-bold   uppercase  '>email</label>
        <label className='  text-xs font-robot-bold   uppercase  ' style={{paddingLeft:'112px'}} >password</label>
        </div>
        <div className="flex gap-2 w-full">

          <input
            type="text"
            value={email}
          
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border-1 w-full border-gray-500 rounded "
            placeholder="Enter your email "
          />
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
             className="p-2 w-full rounded border-1 border-gray-500"
            placeholder="Enter Password"
          />
          
          </div>
          {error && (
            <div className="text-red-500 text-xs text-center  ">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full p-3 uppercase bg-gradient-to-br from-green-600 to-gray-900 text-white  rounded flex items-center justify-center "
            disabled={loginLoading}
          >
            {loginLoading?(
            <span className="loader p-2 ">
  
            </span> 
          ):(
            'Login'
          )}
           
          </button>
          </form>
          <div className='flex gap-2 mt-4 '>
            <p>Not a member?</p>
          
            <button
           onClick={() => {
            onRequestClose(); // Close the login modal
            OpenSignup();     // Open the signup modal
          }}
            
              className="text-blue-500"
            >
              Sign up
            </button>
        
           
          </div>
          <div className="flex items-center my-2 w-full mx-auto">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button
          className="w-full text-black rounded py-2 flex items-center justify-center"
        >
          <img src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="Google icon" className="w-5 h-5 mr-2" />
          Continue with Google
        </button>
        </div>
      </div>
    
    </Modal>
    <Signup 
 isOpen={SignupOpen}
 onRequestClose={()=>setSignupOpen(false)}

/>
    </>
  )
}

export default Login
