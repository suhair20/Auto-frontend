import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../slices/userSlice'
import { useDispatch,useSelector } from 'react-redux';
import { setCredentials } from '../../slices/Auth.slice';
import { IoClose } from "react-icons/io5";


import Modal from 'react-modal';
Modal.setAppElement('#root'); 
const Login =({isOpen,onRequestClose})=>{


  const navigate = useNavigate()
  const dispatch=useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')




  const [login, { isLoading: loginLoading }] = useLoginMutation()



  const userToken=useSelector((state)=>state.auth.userToken)
  useEffect(()=>{
    if(userToken){
      navigate('/')
    }
  })

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
    
      <div className='bg-white p-6 rounded shadow-md max-w-md w-full'>
      <div className="   text-black text-2xl font-bold cursor-pointer" onClick={onRequestClose}>
      <IoClose />
        </div>
        <p className=' font-robot-bold top-4 text-black text-center uppercase text-2xl  '>Login</p>
        <div className=' flex flex-col items-center mt-8' >
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
        <label className=' text-black text-xs font-robot-bold mr-8  uppercase  '>email</label>
          <input
            type="text"
            value={email}
          
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border-1 w-full border-gray-500 rounded "
            placeholder="Enter your email "
          />
          <label className=' text-black text-xs font-robot-bold mr-8  uppercase  '>password</label>
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
          <button
            type="submit"
            className="w-full p-3 uppercase bold-navbar text-white rounded  "
          >
            Login
          </button>
          </form>
          <div className='flex gap-2 mt-4 '>
            <p>Not a member?</p>
            <button
              onClick={() => navigate('/signup')}
              className="text-blue-500"
            >
              Sign up
            </button>
           
          </div>
        
        </div>
      </div>
    
    </Modal>
    </>
  )
}

export default Login
