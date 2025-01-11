import React, { useState } from 'react';
import { FaBars, FaTachometerAlt, FaUsers, FaCar, FaCog } from 'react-icons/fa'; // Example icons
import { Link } from 'react-router-dom';

function Driverdetials() {
    const [isOpen, setIsOpen] = useState(true); // State to toggle sidebar
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`h-screen bg-gray-800 text-white p-4 transition-all duration-300 ${
            isOpen ? 'w-60' : 'w-30'
          } flex flex-col justify-between`}
        >
          {/* Top Section - Profile */}
          <div className="flex flex-col items-center mb-6">
            <img
              src="your-profile-image-url.jpg"
              
                className="w-12 h-12 rounded-full mr-3"
            />
            {isOpen && (
              <span className="text-lg font-medium mt-2">Moidheen Suhair</span>
            )}
          </div>
  
          {/* Toggle Button in the Middle */}
          <div className="flex justify-center items-center mb-6">
            
          </div>
  
  
  <ul className="space-y-4 flex-grow">
  
  
       
            <li>
            <Link to={'/adminhome'} >
               <button
                  className="flex items-center p-2 w-full text-left hover:bg-gray-700 rounded-lg"
                 >
                  <FaTachometerAlt className="mr-3 text-2xl" />
                   {isOpen && <span className="origin-left duration-200">Dashboard</span>}
               </button>
            </Link>
            </li>
      
  
     
            <li> 
            <Link to={'/user'} >
               <button
                   className="flex items-center p-2 w-full text-left hover:bg-gray-700 rounded-lg"
               >
                   <FaUsers className="mr-3 text-2xl" />
                   {isOpen && <span className="origin-left duration-200">User Listing</span>}
               </button>
            </Link>
           </li>
     
            
  
      
           <li>
           <Link to={'/driverlisting'} >
              <button
                   className="flex items-center p-2 w-full text-left bg-gray-700 rounded-lg"
                  >
                  <FaCar className="mr-3 text-2xl" />
                  {isOpen && <span className="origin-left duration-200">Driver Listing</span>}
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
   </div>
  
        
        <div className="flex-grow">
              <div className="w-full h-16 navbar-color flex items-center relative">
      
                 <h1 className="font-playball absolute left-1/2 transform -translate-x-1/2">
                   Auto
                 </h1>
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

      <div  className=' flex justify-center  items-center' >
        <div className='flex flex-row gap-5 h-48 ' >
            <div  > 
            <div className="w-[500px] mt-10 navbar-color rounded-lg p-1 shadow-lg">
  {/* License Image Container */}
               <div className="flex flex-col items-center bg-white p-7 rounded-lg">
                 <h2 className="text-2xl font-semibold text-gray-900 mb-4">License Information</h2>

    
               <img
                  src="license-image-url.jpg" // Replace with actual license image URL or path
                  alt="License"
                 className="w-full h-80 object-cover rounded-lg shadow-md mb-4"
               />

    {/* License Details */}
               <p className="text-gray-700 text-center">License Number: 123456789</p>
        </div>
</div>

            </div>
            <div> 
            <div className="w-[500px] mt-10 navbar-color rounded-lg p-1 shadow-lg">
  <div className="flex flex-col items-center bg-white p-6 rounded-lg">
    <img
      src="profile-image-url.jpg" // Replace with actual image URL or path
      alt=""
      className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"
    />
    <div className="text-center">
      <h2 className="text-2xl font-semibold text-gray-900">John Doe</h2>
      <p className="text-gray-500 mt-1">Driver</p>
    </div>
    
    <div className="w-full mt-6">
      <div className="flex justify-between items-center text-gray-700 mb-2">
        <span className="font-medium">Experience:</span>
        <span className="text-gray-600">123456789</span>
      </div>
      <div className="flex justify-between items-center text-gray-700 mb-2">
        <span className="font-medium">Number Plate:</span>
        <span className="text-gray-600">ABC-1234</span>
      </div>
      <div className="flex justify-between items-center text-gray-700 mb-2">
        <span className="font-medium">Phone:</span>
        <span className="text-gray-600">+1234567890</span>
      </div>
      <div className="flex justify-between items-center text-gray-700 mb-2">
        <span className="font-medium">Model:</span>
        <span className="text-gray-600">Auto Rickshaw</span>
      </div>
      <div className="flex justify-between items-center text-gray-700 mb-2">
        <span className="font-medium">color:</span>
        <span className="text-gray-600">Auto Rickshaw</span>
      </div>
      <div className="flex justify-between items-center text-gray-700 mb-2">
        <span className="font-medium">email:</span>
        <span className="text-gray-600">Auto Rickshaw</span>
      </div>
    
    
    </div>

    
  </div>
</div>



            </div>
        </div>



        
      </div> 
      <div className="flex justify-center mt-96 gap-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Accept
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
              Reject
            </button>
          </div>


       </div>  
    
      
          
   </div>
    );
  };
  

export default Driverdetials
