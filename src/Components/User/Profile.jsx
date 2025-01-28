import React from 'react'
import Header from './Header'





function Profile() {
 
  return (
    <div className=' naavabr min-h-screen' >
      <div className='  ml-15 z-10 lg:ml-16 sm:w-11/12   md:w-11/12 md:py-6 items-center justify-center animate-slide-down  '  >
              <Header  />
     </div>
      <div className= ' flex gap-5  min-h-screen  ' >
        <div  className=' md:flex mt-10  gap-6 w-full px-10 md:px-20  ' >
        <div  className='bg-white  md:w-3/6 h-[500px] rounded  ' >
         <div className=' w-full flex   items-center py-5 justify-center ' >
         <div className='profile h-32 md:h-52 w-32 md:w-52 bg-black flex items-center justify-center  rounded-full'>
        <img src="profile-image-url.jpg" alt="Profile" className="h-full w-full object-cover rounded-full" />
       
        </div>
        
         </div>
         <div className=' w-full flex
          items-center justify-center'>
          <div>
          <h2 className='text-xl font-bold'>John Doe</h2>
         <p>Email: john.doe@example.com</p>
         <p>Phone: 123-456-7890</p>
        <p>Address: 123 Main St, City</p>
        </div>
        </div>
        </div>
        <div  className='bg-white mt-10  md:mt-0 md:w-5/6  h-[500px] rounded ' >
         <div>
          <div>

          </div>
         </div>
        </div>
        </div>
       
      </div>
      
    </div>
  )
}

export default Profile
