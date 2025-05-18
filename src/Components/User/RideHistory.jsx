import React , {useEffect} from 'react'
import Header from './Header'
import Footer from './Footer'
import { useRidehistoryQuery } from '../../slices/userSlice'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
  
function RideHistory() {
const navigate=useNavigate()
 const {isAuthenticated}=useSelector((state)=>state.auth)
 
 useEffect(()=>{
   if(!isAuthenticated){
       navigate('/')
   }
 },[navigate,isAuthenticated])
  const {data}= useRidehistoryQuery  ()
  
  console.log('ridehis',data);
  
const getShortAddress = (address) => {
  const parts = address.split(',').map(p => p.trim());
  return parts.slice(0, 3).join(', ');
};


  return (
    <>
    <div  className=' bg-gradient-to-l from-gray-800 via-green-700 to-gray-800 min-h-screen ' >
    
<div className='   sm:ml-7 sm:w-11/12 md:px-4 z-10 lg:ml-16  md:w-11/12 md:py-6 items-center justify-center animate-slide-down  '  >
              <Header  />
     </div  >
      <div  className='h-full   flex flex-col  items-center justify-centere  py-10 ' >
      <div  className='    w-10/12  rounded ' >
        <div className='  px-4 py-4  space-y-4'>
          {Array.isArray(data) &&[...data]?.reverse().map((ride)=>(
        <div className='border-b px-4 py-3 rounded shadow-md border transition duration-300 ease-in-out hover:bg-gradient-to-t from-green-600 to-gray-800 text-white cursor-pointer flex flex-col sm:flex-row justify-between items-center gap-y-2 sm:gap-y-0 text-center'>
  
  <span className='font-semibold  md:w-2/4 md:text-lg text-sm relative flex  sm:flex-row items-center gap-x-2 after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white after:animate-[underline_2s_infinite]'>
    <span className='text-xs md:w-1/2 ' >{getShortAddress(ride.pickup)}</span>
    <span className=" sm:inline">→</span> 
   
    <span  className='text-xs md:w-1/2 '  >{getShortAddress(ride.drop)}</span>
  </span>

  {/* Date */}
  <span className='md:text-lg text-sm opacity-80'> {new Date(ride.createdAt).toLocaleDateString()}</span>
  <span className='md:text-lg text-sm opacity-80'> {ride.fare }</span>
  {/* View Button */}
  <button className=' text-sm bg-white text-black  md:px-3 px-2 py-1 rounded-md shadow-md  ease-in-out    hover:bg-red-900  transition duration-300'>
    View
  </button>
</div>
     ))}
    
      
     
    
    </div>
         
        </div>
      </div>
      <Footer className='mt-3 ' />
    </div>
    </>
  )
}

export default RideHistory
