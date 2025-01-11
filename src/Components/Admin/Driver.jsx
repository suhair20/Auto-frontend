import React, { useState } from 'react';
import { FaBars, FaTachometerAlt, FaUsers, FaCar, FaCog } from 'react-icons/fa'; // Example icons
import { Link } from 'react-router-dom';

function Driver() {
    const [isOpen, setIsOpen] = useState(true); // State to toggle sidebar
  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="flex bg-gray-200">
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
  
          {/* Sidebar Items */}
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
            <Link to={'/settings'} >
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
  <div className="w-full h-20 navbar-color flex items-center relative">
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

  {/* User Listing */}
  <div className="flex justify-center  items-center ">
  <div className=" w-[1200px] mt-10 navbar-color rounded p-1 shadow-lg  ">
    <table className="w-full bg-white ">
      <thead className="bg-gray-200 rounded-lg">
        <tr>
          <th className="py-2 px-4">User ID</th>
          <th className="py-2 px-4">Name</th>
          <th className="py-2 px-4">Email</th>
          <th className="py-2 px-4">Status</th>
          <th className="py-2 px-4">Details</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b">
          <td className="py-2 px-4">001</td>
          <td className="py-2 px-4">John Doe</td>
          <td className="py-2 px-4">john@example.com</td>
          <td className="py-2 px-4">Reject</td>
          <td className="py-2 px-4">
            <Link to={'/driverdetials'} >
            <button className="text-blue-600">Show</button>
            </Link>
          </td>
        </tr>
        <tr className="border-b">
          <td className="py-2 px-4">002</td>
          <td className="py-2 px-4">Jane Smith</td>
          <td className="py-2 px-4">jane@example.com</td>
          <td className="py-2 px-4">Accept</td>
          <td className="py-2 px-4">
            <button className="text-blue-600">Edit</button>
            <button className="ml-2 text-red-600">Delete</button>
          </td>
        </tr>
        {/* Add more rows as needed */}
      </tbody>
    </table>
  </div>
</div>

</div>

 </div>
    );
  };


export default Driver
