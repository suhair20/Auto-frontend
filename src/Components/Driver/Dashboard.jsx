import React, { useState } from 'react';
import { FaBars, FaTachometerAlt, FaUsers, FaCar, FaCog } from 'react-icons/fa'; // Example icons
import { Link } from 'react-router-dom';
import { FaHistory } from 'react-icons/fa';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { FaUser,FaQuestionCircle,FaInfoCircle } from 'react-icons/fa';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import io from 'socket.io-client'
import { useEffect } from 'react';
  const socket= io('http://localhost:5000')


  const data = [
    { month: 'Jan', rides: 20, earnings: 200, rating: 4.5, fuelEfficiency: 15 },
    { month: 'Feb', rides: 35, earnings: 400, rating: 4.7, fuelEfficiency: 14 },
    { month: 'Mar', rides: 50, earnings: 600, rating: 4.8, fuelEfficiency: 13 },
    { month: 'Apr', rides: 45, earnings: 550, rating: 4.6, fuelEfficiency: 12 },
    { month: 'May', rides: 60, earnings: 700, rating: 4.9, fuelEfficiency: 14 }
  ];


function Dashboard() {
  const [isActive,setIsActive]=useState(false)    
  const [isOpen, setIsOpen] = useState(true); // State to toggle sidebar
  
useEffect(()=>{
  let locationInterval;
  console.log("heloo");
  
  if(isActive){
    console.log('act');
    
    locationInterval=setInterval(()=>{
      console.log("2");
      
      if(navigator.geolocation){
        console.log("not");
        
        navigator.geolocation.getCurrentPosition((position)=>{
          console.log(position);
          
          const {latitude ,longitude}=position.coords;
          
         
          
          socket.emit('driverLocation',{latitude,longitude, driverId:'driver123'})
        })
      }
    },5000)
  }else{
    clearInterval(locationInterval);
    socket.emit('driverInactive',{driverId:'driver123'})
  }
  return ()=>clearInterval(locationInterval)

},[isActive]);


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
         
          
       
          
         </div>

        {/* Toggle Button in the Middle */}
        <div className="flex justify-center items-center mb-6">
          
        </div>


<ul className="space-y-4 flex-grow">


     
          <li>
          <Link to={'/dashboard'} >
             <button
                className="flex items-center p-2 w-full text-left bg-green-800 "
               >
                <FaTachometerAlt className="mr-3 text-2xl" />
                 {isOpen && <span className="origin-left hover:text-white duration-200">Dashboard</span>}
             </button>
          </Link>
          </li>
    

   
          <li> 
          <Link to={'/driver/ridehistory'} >
             <button
                 className="flex items-center p-2 w-full text-left hover:bg-green-800 "
             >
                 <FaHistory className="mr-3 text-2xl" />
                 {isOpen && <span className="origin-left hover:text-white duration-200">Ride History</span>}
             </button>
          </Link>
         </li>
   
          

    
         <li>
         <Link to={'/ridepayements'} >
            <button
                 className="flex items-center p-2 w-full text-left hover:bg-green-800 "
                >
                <FaMoneyCheckAlt className="mr-3 text-2xl" />
                {isOpen && <span className="origin-left hover:text-white duration-200">Ride Payement</span>}
            </button>
        </Link>
          </li>
    


    
          <li>
          <Link>
            <button
                className="flex items-center p-2 w-full text-left hover:bg-green-800 "
            >
                 <FaCog className="mr-3 text-2xl" />
                {isOpen && <span className="origin-left hover:text-white duration-200">Settings</span>}
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
         
            <FaCog className="text-2xl ml-auto mr-6 " />
            <div className='mr-4 mt-2 ' >
            <FaInfoCircle className='md:text-2xl text-2xl  text-white ' />
            </div>
            <div className=' md:mr-10 mr-4 ' >
            <FaUser  className='md:text-3xl text-3xl  text-white ' />
            </div>
            </div>
            <div className="w-full flex justify-center  items-center mt-24 ">
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10  justify-center items-center w-full px-3  ">
    {/* Total Payment Box */}
    <div className="flex flex-col justify-center  items-center bg-green-500   w-full sm:w-52  md:h-36 h-20 rounded shadow-lg">
      <div className="text-center text-white md:text-xl text-sm font-bold">Total Payment</div>
      <div className="text-center text-white md:text-xl text-sm ">$500</div> {/* Replace with dynamic data */}
    </div>

    {/* Total Rides Box */}
    <div className="flex flex-col justify-center  items-center bg-green-600 w-full sm:w-52  md:h-36 h-20 rounded shadow-lg">
      <div className="text-center text-white md:text-xl text-sm font-bold">Total Rides</div>
      <div className="text-center text-white md:text-xl text-sm ">120</div> {/* Replace with dynamic data */}
    </div>

    {/* Driver Status Box */}
    <div className="flex flex-col  justify-center items-center bg-green-500 w-full sm:w-52  md:h-36 h-20 rounded shadow-lg">
      <div className="text-center text-white md:text-xl text-sm  font-bold">Driver Status</div>
      <div className="text-center text-white  text-sm  ">
      <button
        className={`md:p-2 p-1 text-sm text-white rounded ${isActive ? 'bg-red-500' : 'bg-blue-500'}`}
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? 'Go Offline' : 'Go Active'}
      </button> {/* Toggle between Active/Inactive */}
      </div>
    </div>

    {/* Fourth Box (Additional metric) */}
    <div className="flex flex-col justify-center items-center bg-green-800 w-full sm:w-52  md:h-36 h-20 rounded shadow-lg">
      <div className="text-center text-white md:text-xl text-sm  font-bold">Other Metric</div>
      <div className="text-center  text-white md:text-xl text-sm  ">Value</div> {/* Replace with dynamic data */}
    </div>
  </div>
</div>
<div  className=' w-full mt-5 mb-5 px-6' >
<div className="w-full md:h-80 h-96 p-2 bg-gradient-to-br from-green-600 to-gray-700 rounded-3xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-green-300 tracking-wider">Driver Performance</h2>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <defs>
            <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34D399" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#34D399" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis dataKey="month" tick={{ fill: '#9AE6B4' }} />
          <YAxis tick={{ fill: '#9AE6B4' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a2a1f',
              color: '#34D399',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0, 255, 128, 0.3)'
            }}
          />
          <Legend iconType="circle" wrapperStyle={{ color: '#34D399' }} />
          <Line type="monotone" dataKey="rides" stroke="url(#greenGradient)" strokeWidth={4} dot={{ r: 5 }} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="earnings" stroke="url(#blueGradient)" strokeWidth={4} dot={{ r: 5 }} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="rating" stroke="url(#orangeGradient)" strokeWidth={4} dot={{ r: 5 }} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="fuelEfficiency" stroke="#F43F5E" strokeWidth={4} dot={{ r: 5 }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>

     </div>  
         


    


 </div>

 
   </>
  )
}

export default Dashboard
