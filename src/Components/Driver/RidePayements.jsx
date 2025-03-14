import React, { useState } from 'react';
import { FaBars, FaTachometerAlt, FaUsers, FaCar, FaCog } from 'react-icons/fa'; // Example icons
import { Link } from 'react-router-dom';
import { FaHistory } from 'react-icons/fa';
import { FaMoneyCheckAlt } from 'react-icons/fa';

function RidePayements() {
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
          <div className="flex bg-white flex-col h-16 items-center justify-center   ">
           
            
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
                   className="flex items-center p-2 w-full text-left hover:bg-green-800 rounded-lg"
               >
                   <FaHistory className="mr-3 text-2xl" />
                   {isOpen && <span className="origin-left  hover:text-white duration-200">Ride History</span>}
               </button>
            </Link>
           </li>
     
            
  
      
           <li>
           <Link to={'/ridepayements'} >
              <button
                   className="flex items-center p-2 w-full text-left bg-green-800 rounded-lg"
                  >
                  <FaMoneyCheckAlt className="mr-3 text-2xl" />
                  {isOpen && <span className="origin-left hover:text-white  duration-200">Ride Payement</span>}
              </button>
          </Link>
            </li>
      
  
  
      
            <li>
            <Link>
              <button
                  className="flex items-center p-2 w-full text-left hover:bg-green-800 rounded-lg"
              >
                   <FaCog className="mr-3 text-2xl" />
                  {isOpen && <span className="origin-left hover:text-white  duration-200">Settings</span>}
              </button>
          </Link>
            </li>
      
  
  
      </ul>
      <div className="flex bg-white flex-col h-24 items-center justify-center   ">
           
            
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
              </div>
       </div>  
   </div>
     </>
  )
}

export default RidePayements
