import React, { useState } from 'react';
import { FaBars, FaTachometerAlt, FaUsers, FaCar, FaCog } from 'react-icons/fa'; // Example icons
import { Link } from 'react-router-dom';

const AdminPage = () => {
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
                className="flex items-center p-2 w-full text-left bg-gray-700 rounded-lg"
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
                 className="flex items-center p-2 w-full text-left hover:bg-gray-700 rounded-lg"
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
     </div>  
 </div>
  );
};

export default AdminPage;



