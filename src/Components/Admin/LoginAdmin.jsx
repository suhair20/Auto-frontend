import React from 'react'



function LoginAdmin() {
  return (
    <div className=' h-screen flex items-center navbar-color  justify-center ' >
      
      <div className='bg-white p-6 rounded border shadow-md max-w-md w-full'>
      
        <p className='font-robot-bold uppercase  text-black text-center text-3xl '>Admin</p>
        <div className=' flex flex-col items-center mt-8' >
        <form  className="flex flex-col  gap-2  w-full">
        <label className=' text-black text-xs  font-robot-bold uppercase  '>email</label>
          <input
            type="text"
            // value={email}
            
            className="p-2 border shadow-lg border-gray-700 rounded "
            placeholder="Enter your email "
          />
          <label className=' text-black text-xs font-robot-bold mr-8   uppercase  '>password</label>
          <input
            type="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            className="p-2 w-full border shadow-lg border-gray-500   rounded   "
            placeholder="Enter Password"
          />
          {/* {error && (
            <div className="text-red-500  mt-6">
              {error}
            </div>
          )} */}
          <button
            type="submit"
            className="w-full bold-navbar uppercase text-white rounded py-3 "
          >
            Login
          </button>
          </form>
          <div className='flex gap-2 mt-4 '>
            
            <button
             
              className="text-blue-500"
            >
              
            </button>
          </div>
        
        </div>
      </div>
     
    </div>
  )
}

export default LoginAdmin
