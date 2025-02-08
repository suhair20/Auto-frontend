import React from 'react'
import Header from './Header'
import Footer from './Footer'

  
function RideHistory() {
  return (
    <div  className=' naavabr min-h-screen ' >
    
<div className='   sm:ml-7 sm:w-11/12 md:px-4 z-10 lg:ml-16   md:w-11/12 md:py-6 items-center justify-center animate-slide-down  '  >
              <Header  />
     </div  >
      <div  className='h-full   flex flex-col items-center justify-centere  py-10 ' >
      <div  className='    w-10/12 md:h-[500px] rounded ' >
        <div className='  px-4 py-4  space-y-4'>
        <div className='border-b px-4 py-3 rounded shadow-md border transition duration-300 ease-in-out hover:bg-green-900 text-white cursor-pointer flex flex-col sm:flex-row justify-between items-center gap-y-2 sm:gap-y-0 text-center'>
  {/* Locations with Animated Underline */}
  <span className='font-semibold  md:text-lg text-sm relative flex  sm:flex-row items-center gap-x-2 after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white after:animate-[underline_1.5s_infinite]'>
    <span>Kozhikode</span>
    <span className=" sm:inline">→</span> 
   
    <span>Kasargod</span>
  </span>

  {/* Date */}
  <span className='md:text-lg text-sm opacity-80'>04/09/24</span>
  <span className='md:text-lg text-sm opacity-80'>300 km</span>
  {/* View Button */}
  <button className=' text-sm bg-white text-black  md:px-3 px-2 py-1 rounded-md shadow-md  ease-in-out    hover:bg-red-900  transition duration-300'>
    View
  </button>
</div>
     
    
      
     
    
    </div>
         
        </div>
      </div>
      <Footer className='mt-3' />
    </div>
  )
}

export default RideHistory
