import React, { useState } from 'react'
import { useSignupMutation,useOtpMutation,useResendotpMutation } from '../../slices/driverSlice'
import { useNavigate } from 'react-router-dom'

import DriverOtp from './DriverOtp'
function Signup() {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [ConfirmPassword,setConfirmPassword]=useState('')
  const [otpModalOpen, setOtpModalOpen] = useState(false)
  const [error, setError] = useState('')
  const [otpError,setOtpError]=useState('')

  const navigate = useNavigate()

  const[Signup,{isLoading:isSignupLoading}]=useSignupMutation()
  const[OTP,{isLoading:isOtpLoading}]=useOtpMutation()
  const [resendOtp,{isLoading:isResendLoading}]=useResendotpMutation()


  const submithandler=async(e)=>{
  e.preventDefault()
  if (password !== ConfirmPassword) {
    setError('Passwords do not match')
    return
  }
  try {
  const res=await Signup({email,password}).unwrap()
  console.log(res);
  setOtpModalOpen(true)
  } catch (error) {
    console.log(error);
  }
  }



  const handleOtpSubmit = async (otp) => {
    try {
      console.log('hwloo')
      const res = await OTP({ email, otp }).unwrap()
      console.log(res);
      navigate('/Verification',{state:{email:email}})
    } catch (error) {
      console.log(error?.data?.message)
      if (error?.data && error?.data?.message) {
        setOtpError(error.data.message)
      }
    }
  }


  /*////OTP resend*//////////////////////////////////////////


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
    <

      
    >
    
   <div className='absolute inset-0 navbar-color opacity-5 z-0'  ></div>
   
  <div className='h-screen flex md:flex-row  flex-col items-center relative  '  >
   
   <div className='  bg-cover bg-center  items-center  justify-center w-full footer-color md:h-full h-96  relative position-relative' style={{ backgroundImage: 'url(./Signupbanner.jpg)  ' }}>
   
    <div className='text-center mb-28 mt-28 
    '>
      <h1 className='font-robot-bold text-5xl'>Sign Up</h1>
      <div className='mt-2 flex items-center justify-center text-white'>
        <p>Already have an account?</p>
        <p className='ml-2 text-blue-500 cursor-pointer'>Log in</p>
      </div>
    </div>
    </div>
    <div className='flex flex-col  items-center w-full max-w-4xl'>
      <div className='lg:w-1/2 p-4'>
        {/* Email and Password Form */}
        <form onSubmit={submithandler} className='space-y-4'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-black'>
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name='email'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Your email address'
            />
          </div>
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-black'>
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name='password'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Your password'
            />
          </div>
          <div>
            <label htmlFor='confirm-password' className='block text-sm font-medium text-black'>
              Confirm Password
            </label>
            <input
              type='password'
              id='confirm-password'
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name='confirm-password'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Confirm your password'
            />
          </div>
          <button
            type='submit'
            className='w-full navbar-color text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Sign Up
          </button>
        </form>
      
      </div>
       
      <div className="w-full flex items-center justify-center ">
    {/* Horizontal line */}
    <hr className="w-1/3 border-t border-black-300" />
    <span className="px-4 text-gray-500">or</span>
    <hr className="w-1/3 border-t border-black-300" />
  </div>
    
      <div className='lg:w-1/2 p-4 flex flex-col items-center space-y-4'>
        <div className='relative w-full text-center'>
          <div className='absolute inset-x-0 flex items-center'>
    
           
          </div>
        </div>

        <button className='w-full  rounded  flex items-center justify-center'>
          <div className='flex-shrink-0 border-1 border-blue-500  h-10 flex items-center justify-center px-2'>
            <img
              src='https://img.icons8.com/color/48/000000/google-logo.png'
              alt='Google icon'
              className='w-5 h-5'
            />
          </div>
          <div className='bg-blue-500 w-full text-center text-white  py-2 flex items-center justify-center'>
            Continue with Google
          </div> 
        </button>

        <button className='w-full rounded   flex items-center justify-center'>
          <div className='flex-shrink-0 border-1 border-blue-900   h-10 flex items-center justify-center px-2'>
            <img
              src='https://img.icons8.com/color/48/000000/facebook-new.png'
              alt='Facebook icon'
              className='w-5 h-5'
            />
          </div>
          <div className='bg-blue-900  w-full text-white px-4 py-2 flex items-center justify-center'>
            Continue with Facebook
          </div>
        </button>
      </div>
    </div>
    <DriverOtp
      className="z-0"
      isOpen={otpModalOpen}
      onRequestClose={() => setOtpModalOpen(false)}
      onSubmit={handleOtpSubmit}
      onResendOtp={handleResendOtp}
      error={otpError}
    />
  </div>
 
</>

  
  );
  
}

export default Signup
