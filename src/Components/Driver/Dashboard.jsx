import React, { useState } from 'react';
import { FaBars, FaTachometerAlt, FaUsers, FaCar, FaCog } from 'react-icons/fa'; // Example icons
import { Link } from 'react-router-dom';
import { FaHistory } from 'react-icons/fa';
import { FaMoneyCheckAlt } from 'react-icons/fa';



function Dashboard() {
  const [isActive,setIsActive]=useState(false)    
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
          <Link to={'/adminhome'} >
             <button
                className="flex items-center p-2 w-full text-left bg-gray-700 rounded-lg"
               >
                <FaTachometerAlt className="mr-3 text-2xl" />
                 {isOpen && <span className="origin-left duration-200">Dashboard</span>}
             </button>
          </Link>
          </li>
    

   
          <li> 
          <Link to={'/ridehistory'} >
             <button
                 className="flex items-center p-2 w-full text-left hover:bg-gray-700 rounded-lg"
             >
                 <FaHistory className="mr-3 text-2xl" />
                 {isOpen && <span className="origin-left duration-200">Ride History</span>}
             </button>
          </Link>
         </li>
   
          

    
         <li>
         <Link to={'/ridepayements'} >
            <button
                 className="flex items-center p-2 w-full text-left hover:bg-gray-700 rounded-lg"
                >
                <FaMoneyCheckAlt className="mr-3 text-2xl" />
                {isOpen && <span className="origin-left duration-200">Ride Payement</span>}
            </button>
        </Link>
          </li>
    


    
          <li>
          <Link>
            <button
                className="flex items-center p-2 w-full text-left hover:bg-gray-700 rounded-lg"
            >
                 <FaCog className="mr-3 text-2xl" />
                {isOpen && <span className="origin-left duration-200">Settings</span>}
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
            <div className="w-full flex justify-center  items-center mt-24 ">
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10  justify-center items-center w-full px-10 ">
    {/* Total Payment Box */}
    <div className="flex flex-col justify-center  items-center bg-white   w-full sm:w-52  sm:h-36 rounded shadow-lg">
      <div className="text-center font-bold">Total Payment</div>
      <div className="text-center text-2xl">$500</div> {/* Replace with dynamic data */}
    </div>

    {/* Total Rides Box */}
    <div className="flex flex-col justify-center  items-center bg-white w-full sm:w-52  sm:h-36 rounded shadow-lg">
      <div className="text-center font-bold">Total Rides</div>
      <div className="text-center text-2xl">120</div> {/* Replace with dynamic data */}
    </div>

    {/* Driver Status Box */}
    <div className="flex flex-col  justify-center items-center bg-white w-full sm:w-52  sm:h-36 rounded shadow-lg">
      <div className="text-center font-bold">Driver Status</div>
      <div className="text-center">
        <button className="bg-green-500 text-white py-2 px-4 rounded">Active</button> {/* Toggle between Active/Inactive */}
      </div>
    </div>

    {/* Fourth Box (Additional metric) */}
    <div className="flex flex-col justify-center items-center bg-white w-full sm:w-52  sm:h-36 rounded shadow-lg">
      <div className="text-center font-bold">Other Metric</div>
      <div className="text-center text-2xl">Value</div> {/* Replace with dynamic data */}
    </div>
  </div>
</div>


     </div>  
 </div>
   </>
  )
}

export default Dashboard