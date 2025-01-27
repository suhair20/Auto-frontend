import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../slices/userSlice'
import { useDispatch,useSelector } from 'react-redux';
import { setCredentials } from '../../slices/Auth.slice';
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



  const [login, { isLoading: loginLoading }] = useLoginMutation()

  const OpenSignup=()=>{
    setSignupOpen(true)
  }

  

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      console.log(res.Token);
      if(res.success){
        dispatch(setCredentials(res.Token)); 
        onRequestClose()
      navigate('/')
     
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
    
      <div className='bg-white navbar-color p-6 rounded shadow-md md:w-[350px]  w-[350px] '>
      <div className="    text-2xl font-bold cursor-pointer" onClick={onRequestClose}>
      <IoClose />
        </div>
        <p className=' font-robot-bold top-4  text-center uppercase text-2xl  '>Login</p>
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
          {error && (
            <div className="text-red-500 text-xs mt-6">
              {error}
            </div>
          )}
          </div>
          <button
            type="submit"
            className="w-full p-3 uppercase navbar-color text-white  rounded flex items-center justify-center "
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
