import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSignupMutation, useOtpMutation, useResendotpMutation } from '../../slices/userSlice'
import OTPModal from './OTPModal';
import Header from './Header';
import Modal from 'react-modal';
import  Login from './Login'
import { IoClose } from "react-icons/io5";








const Signup = ({isOpen,onRequestClose})=>{





  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otpModalOpen, setOtpModalOpen] = useState(false)
  const [loginOpen,setLoginOpen]=useState(false)
  const [error, setError] = useState('')
  const [otpError, setOtpError] = useState('')




  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [signup, { isLoading: isSignupLoading }] = useSignupMutation()
  const [OTP, { isLoading: isOtpLoading }] = useOtpMutation()
  const [resendOtp, { isLoading: isResendLoading }] = useResendotpMutation()

  const validateForm = (name, email, password, confirmPassword) => {
    if (!name) {
      setError('Name is required');
      return false;
    }
  
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
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
  
    setError(''); // Clear previous errors if all validations pass
    return true;
  };
  





  const submitHandler = async (e) => {
    e.preventDefault();
   
    try {

      const isvalid=validateForm(name,email,password,confirmPassword)
      console.log("jiii");
      if(isvalid){
      const response = await signup({ name, email, password }).unwrap();
      
      e
      
      if (response && response.success) {
        onRequestClose();
        setOtpModalOpen(true);  
      } else {
        console.log('Signup was not successful:', response); 
      }
    }
    } catch (error) {
      console.error('Error during signup:', error); 
      if (error?.data && error?.data?.message) {
        setError(error.data.message);
      } else {
        console.log(error);
        
        setError('An unexpected error occurred'); 
      }
    }
  }



  

  const handleOtpSubmit = async (otp) => {
    try {
      console.log('hwloo')
      const res = await OTP({ email, otp }).unwrap()
      console.log(res);
      
      setOtpModalOpen(false)
      
      setLoginOpen(true)

    } catch (error) {
      console.log(error?.data?.message)
      if (error?.data && error?.data?.message) {
        setOtpError(error.data.message)
      }
    }
  }

  const handleResendOtp = async () => {
    try {
      await resendOtp({ email }).unwrap()
    } catch (error) {
      console.log(error?.data?.message)
      if (error?.data && error?.data?.message) {
        setOtpError(error.data.message)
      }
    }
  }

  return (
    <>
    
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
     contentLabel="Signup Modal"
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black z-50 bg-opacity-50"
    >
      <div className="bg-white p-2 rounded shadow-md max-w-md w-[400px]">
      <div className="  text-2xl  font-bold cursor-pointer" onClick={onRequestClose}>
       <IoClose />
        </div>
        <h1 className="bg-clip-text text-transparent font-serif  top-4 bg-gradient-to-tr from-green-600 to-gray-900  text-center uppercase text-3xl py-4 ">Signup</h1>
        <div className=' flex flex-col items-center ' ></div>
        <form onSubmit={submitHandler} className="flex flex-col p-4  gap-2  w-full">
        <div className=' flex flex-row    gap-2 w-full ' >
        <div  className='flex-col w-1/2 ' >
        <label className='  text-xs font-robot-bold  uppercase  '>Name</label>
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 w-full  border-1 border-gray-500 rounded text-black font-robot placeholder-gray-400 "
            placeholder="Enter your name "
          />
        </div>
           
          
        <div  className='flex-col  w-1/2 ' >
        <label className='  text-xs  font-robot-bold  uppercase'>email</label>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2  w-full  border-1 border-gray-500 text-black font-robot rounded "
            placeholder="Enter your email "
          />
        </div>
        </div>
        <div className=' flex flex-row gap-2 w-full ' >
        <div  className='flex-col w-1/2  ' >
        <label className='  text-xs  font-robot-bold  uppercase '>Password</label>
        <input
            type="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2  w-full border-1 border-gray-500 text-black font-robot rounded "
            placeholder="Password "
          />
        </div>
           
          
          <div  className='flex-col  w-1/2 ' >
        <label className='  text-xs font-robot-bold    uppercase '>Confirm password</label>
        <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="p-2 w-full border-1 border-gray-500 text-black font-robot  rounded   "
            placeholder="Confirm password"
          />
        </div>
        </div>
          {error && (
            <div className="text-red-500 text-xs mt-2">
              {error}
            </div>
          )}
        <button
        type="submit"
  className="w-full bg-gradient-to-br from-green-600 to-gray-800 uppercase text-white rounded p-3 flex items-center justify-center"
  disabled={isSignupLoading} // Disable the button while loading
>
  {isSignupLoading ? (
    <span className="loader p-2 ">
  
  </span> // Replace with your preferred loading spinner
  ) : (
    'Continue'
  )}
</button>
        </form>
        <div className="flex items-center my-2 w-full mx-auto">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 ">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button
          className="w-full text-black rounded mb-8 flex items-center justify-center"
        >
          <img src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="Google icon" className="w-5 h-5 mr-2" />
          Continue with Google
        </button>
      </div>
      
      </Modal>
      <OTPModal
        isOpen={otpModalOpen}
        onRequestClose={() => setOtpModalOpen(false)}
        onResendOtp={handleResendOtp}
        onSubmit={handleOtpSubmit}
        error={otpError}
      />

  {loginOpen && (
  <Login 
    isOpen={loginOpen}
    onRequestClose={() => setLoginOpen(false)}
  />
)}
    
    </>
  )
}

export default Signup



