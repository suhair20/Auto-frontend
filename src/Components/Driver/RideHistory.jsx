import React, { useState } from 'react';
import { FaBars, FaTachometerAlt, FaUsers, FaCar, FaCog } from 'react-icons/fa'; // Example icons
import Footer from './Footer'
import { Link } from 'react-router-dom';
import { FaHistory } from 'react-icons/fa';
import { FaMoneyCheckAlt ,FaInfoCircle,FaUser} from 'react-icons/fa';




function rideHistory() {
   
    const [isOpen, setIsOpen] = useState(true); // State to toggle sidebar

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
      
    return (
     <>
     <div className="flex">
        {/* Sidebar */}
        <div
          className={`h-screen bg-gray-300 text-black  transition-all duration-300 ${
            isOpen ? 'w-60' : 'w-30'
          } flex flex-col justify-between`}
        >
          {/* Top Section - Profile */}
          <div className="flex navbar-color flex-col h-16 items-center justify-center border-2 ">
           
            
          <h1 className="font-playball  ">
                   {isOpen? 'A-auto':'A'}
                 </h1>
           
          </div>
          <div className="flex bg-white flex-col h-10 items-center justify-center   ">
           
            
           <h1 className="font-playball  ">
                   
                  </h1>
            
           </div>
  
          {/* Toggle Button in the Middle */}
          <div className="flex justify-center items-center mb-6">
            
          </div>
  
  
  <ul className="space-y-4 flex-grow">
  
  
       
            <li>
            <Link to={'/dashboard'} >
               <button
                  className="flex items-center p-2 w-full text-left hover:bg-green-800 rounded-lg"
                 >
                  <FaTachometerAlt className="mr-3 text-2xl" />
                   {isOpen && <span className="origin-left hover:text-white  duration-200">Dashboard</span>}
               </button>
            </Link>
            </li>
      
  
     
            <li> 
            <Link to={'/driver/ridehistory'} >
               <button
                   className="flex items-center p-2 w-full text-left bg-green-800 rounded-lg"
               >
                   <FaHistory className="mr-3 text-2xl" />
                   {isOpen && <span className="origin-left hover:text-white duration-200">Ride History</span>}
               </button>
            </Link>
           </li>
     
            
  
      
           <li>
           <Link to={'/ridepayements'} >
              <button
                   className="flex items-center p-2 w-full text-left hover:bg-green-800 rounded-lg"
                  >
                  <FaMoneyCheckAlt className="mr-3 text-2xl" />
                  {isOpen && <span className="origin-left hover:text-white duration-200">Ride Payement</span>}
              </button>
          </Link>
            </li>
      
  
  
      
            <li>
            <Link>
              <button
                  className="flex items-center p-2 w-full text-left hover:bg-green-800 rounded-lg"
              >
                   <FaCog className="mr-3 text-2xl" />
                  {isOpen && <span className="origin-left hover:text-white duration-200">Settings</span>}
              </button>
          </Link>
            </li>
      
  
  
      </ul>
      <div className="flex bg-white flex-col h-14 items-center justify-center   ">
           
            
           <h1 className="font-playball  ">
                   
                  </h1>
            
           </div>
   </div>
  
        
        <div className="flex-grow">
              <div className="w-full h-16 navbar-color flex items-center relative">
      
                 
                 <button
              onClick={toggleSidebar}
              className="text-white p-2"
            >
              {isOpen ? (
                <FaBars className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
              <FaCog className="text-2xl ml-auto mr-6" />
               <div className='mr-4 mt-2 ' >
                          <FaInfoCircle className='md:text-2xl text-2xl  text-white ' />
                          </div>
                          <div className=' md:mr-10 mr-4 ' >
                          <FaUser  className='md:text-3xl text-3xl  text-white ' />
                          </div>
              </div>
              
              <div  className='h-full   flex flex-col items-center justify-centere  py-10 ' >
      <div  className='    w-11/12 md:h-[500px] rounded ' >
        <div className='  px-4 py-4  space-y-4'>
  <div className='border-b px-4 py-3 rounded  border  transition duration-300 ease-in-out bg-green-900 text-white cursor-pointer flex flex-col sm:flex-row justify-between items-center gap-y-2 sm:gap-y-0 text-center'>
  {/* Locations with Animated Underline */}
  <span className='font-semibold  md:text-lg text-sm relative flex sm:flex-row items-center gap-x-2 after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white after:animate-[underline_1.5s_infinite]'>
    <span>Kozhikode</span>
    <span className=" sm:inline">→</span> 
   
    <span>Kasargod</span>
  </span>

  
  
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

   </div> 
   </div>
   
   <Footer className='' />
  
   
     </>
  )
}

export default rideHistory
