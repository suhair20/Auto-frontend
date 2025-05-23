import React, { useState } from 'react';
import { FaBars, FaTachometerAlt, FaUsers, FaCar, FaCog } from 'react-icons/fa'; // Example icons
import { useSelector,useDispatch, } from 'react-redux';
import Footer from './Footer'
import { Link,useNavigate } from 'react-router-dom';
import { FaHistory } from 'react-icons/fa';
import { FaMoneyCheckAlt ,FaInfoCircle,FaUser} from 'react-icons/fa';
import { useDriverhistoryQuery} from '../../slices/driverSlice';
import { useParams } from 'react-router-dom';




function rideHistory() {



const navigate=useNavigate()
const user = useSelector((state)=>state.driverAuth.user)
const driveId = user?._id;
    const [isOpen, setIsOpen] = useState(true); 
    const {data:driverhistory}=useDriverhistoryQuery(driveId)
     console.log(driverhistory);
     

const getShortAddress = (address) => {
  const parts = address.split(',').map(p => p.trim());
  return parts.slice(0, 3).join(', ');
};


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
      <div  className='    w-11/12 h-[600px] rounded overflow-y-auto' >
        <div className='  px-4 py-4  space-y-4'>
              
            {driverhistory && driverhistory.length > 0 ? (
  driverhistory?.slice().reverse().map((ride) => (
    <div
      key={ride._id}
      className="border-b px-4 py-3 rounded border transition duration-300 ease-in-out bg-gradient-to-t from-green-600 to-gray-800 text-white cursor-pointer flex flex-col sm:flex-row justify-between items-center gap-y-2 sm:gap-y-0 text-center"
    >
      <span className="font-semibold md:w-2/4   md:text-lg text-sm relative flex sm:flex-row items-center gap-x-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white after:animate-[underline_1.5s_infinite]">
        <span className='text-xs md:w-1/2 '   >{getShortAddress(ride.pickup) }</span>
        <span className="sm:inline">→</span>
        <span className='text-xs md:w-1/2 '  >{getShortAddress(ride.drop)}</span>
      </span>
      <span className=" md:text-lg text-sm opacity-80">{new Date(ride.createdAt).toLocaleDateString()}</span>
      
      <span
        className={`text-xs font-semibold px-2 py-1 rounded ${
          ride.status === 'completed'
            ? 'bg-gray-300 text-black'
            : ride.status === 'confirmed'
            ? 'bg-yellow-400 text-black'
            : ride.status === 'payment_pending'
            ? 'bg-orange-400 text-black'
            : ride.status === 'cancelled'
            ? 'bg-red-500 text-white'
            : 'bg-blue-300 text-black'
        }`}
      >
        {ride.status}
      </span>
      <button
        onClick={() => navigate(`/driver/tracking/${ride._id}`)}
        className="text-sm bg-white text-black md:px-3 px-2 py-1 rounded-md shadow-md hover:bg-red-900 hover:text-white transition duration-300"
      >
        View
      </button>
    </div>
  ))
) : (
  <div className="text-center text-gray-500 py-10">
    No ride history found for this driver.
  </div>
)}
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
