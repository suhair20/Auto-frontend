import React, { useState ,useEffect,useRef} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setIsRideAccepted,setRidId} from '../../slices/driverAuthSlice';
import mapboxgl from 'mapbox-gl';
import { FaBars, FaTachometerAlt,  FaCog } from 'react-icons/fa'; // Example icons
  import Footer from './Footer'
import { Link } from 'react-router-dom';
import { FaHistory } from 'react-icons/fa';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { FaUser,FaInfoCircle } from 'react-icons/fa';
import { FaMoneyBillWave, FaUserTie, FaTaxi,FaChartLine } from 'react-icons/fa';
import RideRequestModal from './RideRequest';
import { useRideEndMutation } from '../../slices/driverSlice';
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

  const socket= io('http://localhost:5000')

  mapboxgl.accessToken = 'pk.eyJ1IjoibW9pZGhlZW5zdWhhaXIiLCJhIjoiY2x6YjF1cWNyMGJlMjJyb29hZ240Zmk4ayJ9.58Mg37vr5SeKrBWZtAQ2xQ'
  const data = [
    { month: 'Jan', rides: 500, earnings: 1000, rating: 50.5, fuelEfficiency: 15 },
    { month: 'Feb', rides: 35, earnings: 400, rating: 90.7, fuelEfficiency: 800 },
    { month: 'Mar', rides: 700, earnings: 600, rating: 600.8, fuelEfficiency: 13 },
    { month: 'Apr', rides: 45, earnings: 550, rating: 100.6, fuelEfficiency: 12 },
    { month: 'May', rides: 60, earnings: 700, rating: 10.9, fuelEfficiency: 14 }
  ];


function Dashboard() {
  const [isActive,setIsActive]=useState(false)    
  const [isOpen, setIsOpen] = useState(true); 
  const [driverLoca,setDriverLocation]=useState(true)
  const [modalOpen,setModalOpen]=useState(false)
  const [rideDetails,setRideDetails]=useState('')
  const [driverId,setdriverid]=useState('')
  const [showEndRideModal, setShowEndRideModal] = useState(false);
const [rideEnd] = useRideEndMutation ();
   const dispatch=useDispatch()
 const user = useSelector((state)=>state.driverAuth.user)
 const isRideAccepted=useSelector((state)=>state.driverAuth.isRideAccepted)
 const rideId=useSelector((state)=>state.driverAuth.rideId)




 useEffect(() => {
  if (isRideAccepted) {
    localStorage.setItem('isRideAccepted', 'true');
    if (rideId) localStorage.setItem('rideId', rideId);
  } else {
    localStorage.removeItem('isRideAccepted');
    localStorage.removeItem('rideId');
  }
}, [isRideAccepted, rideId]);

useEffect(() => {
  const saved = localStorage.getItem('isRideAccepted');
  const savedRideId = localStorage.getItem('rideId');

  if (saved === 'true') {
    dispatch(setIsRideAccepted(true));
    if (savedRideId) dispatch(setRidId(savedRideId));
  }
}, [dispatch]);

 socket.on('rideRequest', (rideDetails,driverId) => {
  // Handle the incoming ride request
  console.log('Received ride request:', rideDetails,driverId);
  if(rideDetails&&driverId){
    setdriverid(driverId)
    setRideDetails(rideDetails)
    setModalOpen(true)

  }
  
});

const handledriverClose=()=>{
  setModalOpen(false)
  socket.emit('driverRespons',{
    driverId:driverId,
    rideId: rideDetails.rideId,
    status:'rejected'
  })
   }

 const handleDriverAccepted = () => {
   setModalOpen(false);
    socket.emit('driverRespons',{
      driverId:driverId,
      rideId:rideDetails.rideId,
      status:'Accepted'
    })
   console.log("Driver accepted! Redirecting to payment...");
     dispatch(setIsRideAccepted(true)); // ✅ Redux
  dispatch(setRidId(rideDetails.rideId)); // optional
 };
  
 

 
   const locationIntervalRef = useRef(null);
 
  useEffect(() => {
  const sendLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const driverId = user?._id;
        const drivername = user?.name;

        if (driverId) {
          console.log('📡 Emitting driverLocation:', { latitude, longitude, driverId });
          socket.emit('driverLocation', { latitude, longitude, driverId, drivername });
        }
      });
    }
  };

  const startLocationInterval = () => {
    if (locationIntervalRef.current) clearInterval(locationIntervalRef.current);
    locationIntervalRef.current = setInterval(sendLocation, 5000);
    sendLocation(); // send immediately too
  };

  if (isActive) {
    startLocationInterval();
  } else {
    // clear location updates
    if (locationIntervalRef.current) {
      clearInterval(locationIntervalRef.current);
      locationIntervalRef.current = null;
    }
    const driverId = user?._id;
    if (driverId) {
      socket.emit('driverInactive', { driverId });
    }
  }

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible' && isActive) {
      console.log('Tab became visible again — restarting location');
      startLocationInterval();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);

  return () => {
    if (locationIntervalRef.current) {
      clearInterval(locationIntervalRef.current);
      locationIntervalRef.current = null;
    }
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, [isActive, user, socket]);



useEffect(() => {
  if (!isRideAccepted) return; 

  // const sendTrackingLocation = () => {
  //   if (navigator.geolocation && user?._id) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const { latitude, longitude } = position.coords;
  //       const driverId = user._id;
  //       const drivername = user.name;

  //       const driverLoc = { lat: latitude, lng: longitude };
  //     setDriverLocation(driverLoc);

  //       console.log('🚗 Sending driver location for tracking:', latitude, longitude);

  //       socket.emit('driverLocationForTracking', { driverId, latitude, longitude, drivername });

  //      if (
  //       isNearDestination(driverLoc, rideDetails?.destination?.coordinates)
  //     ) {
  //       console.log("is here");
        
  //       setShowEndRideModal(true);
  //     }


  //     });
  //   }
  // };
  const sendTrackingLocation = () => {
  const latitude = 10.0269;  // Very close to destination
  const longitude = 76.3028;
  const driverId = user._id;
  const drivername = user.name;

  const driverLoc = { lat: latitude, lng: longitude };
  setDriverLocation(driverLoc);

  console.log('🚗 Sending driver location for tracking:', latitude, longitude);

  socket.emit('driverLocationForTracking', { driverId, latitude, longitude, drivername });
  console.log("📍 DriverLoc:", driverLoc);
console.log("🎯 Destination:", rideDetails?.destination?.coordinates);
console.log("🧮 isNearDestination:", isNearDestination(driverLoc, rideDetails?.destination?.coordinates));
const destinationCoords = rideDetails?.destination?.coordinates;
const destinationPos = {
  lat: destinationCoords[1],
  lng: destinationCoords[0],
};

  if (
    isNearDestination(driverLoc, destinationPos)
  ) {
    console.log("🎉 Driver reached destination.");
    setShowEndRideModal(true);
    
  }else{
    console.log("🎉 Driver reached ggggggdestination.");
  }
};

  const interval = setInterval(sendTrackingLocation, 3000); // every 3 seconds
  sendTrackingLocation(); // send immediately once

  return () => clearInterval(interval); // clear when component unmounts or isRideAccepted changes
}, [isRideAccepted, user, socket]);

 
  
 


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
    






////////////////////////////////


 const handleConfirmEndRide = async () => {
    try { console.log("kooii");
    
        await rideEnd({ rideId }); 
    console.log("Ride ended.");
  } catch (error) {
      console.error('Error completing ride:', error);
    }
  };











 const isNearDestination = (driverPos, destinationPos, threshold = 10000) => {
  console.log("its coming here");
  console.log('uuu',rideDetails?.destination?.coordinates);
  
  
  const R = 6371e3; // Earth radius in meters
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(destinationPos.lat - driverPos.lat);
  const dLng = toRad(destinationPos.lng - driverPos.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(driverPos.lat)) *
      Math.cos(toRad(destinationPos.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance <= threshold;
};















  return (
   <>
   <div className="flex">
   
      {/* Sidebar */}
      <div
        className={` bg-gray-300 text-black  transition-all duration-300 ${
          isOpen ? 'w-60' : 'w-30'
        } flex flex-col justify-between`}
      >
        {/* Top Section - Profile */}
        <div className="flex navbar-color flex-col h-16 items-center justify-center border-2 ">
         
          
        <h1 className="font-playball  ">
                 {isOpen? 'A-auto':'A'}
               </h1>
              
        </div>
        
        <div className="flex bg-gradient-to-br from-gray-200 to-slate-200 flex-col h-8  items-center justify-center   ">
         
          
       
          
         </div>

        {/* Toggle Button in the Middle */}
        


<ul className="space-y-4 flex-grow bg-gradient-to-br from-green-600 to-slate-500">
<div className="flex   flex-col h-8  items-center justify-center   ">
         
          
       
          
         </div>

     
          <li>
          <Link to={'/dashboard'} >
             <button
                className="flex items-center p-2 w-full text-left bg-green-800 rounded-lg"
               >
                <FaTachometerAlt className="mr-3 text-2xl" />
                 {isOpen && <span className="origin-left hover:text-white duration-200">Dashboard</span>}
             </button>
          </Link>
          </li>
    

   
          <li> 
          <Link to={'/driver/ridehistory'} >
             <button
                 className="flex items-center p-2 w-full text-left hover:bg-green-800 rounded-lg"
             >
                 <FaHistory className="mr-3 text-2xl" />
                 {isOpen && <span className="origin-left hover:text-white duration-200">Ride History</span>}
             </button>
          </Link>
         </li>
   
          

    
         <li>
         <Link to={'/ridepayements'} >
            <button
                 className="flex items-center p-2 w-full text-left hover:bg-green-800 rounded-lg "
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
    <div className="flex bg-gradient-to-br from-gray-200 to-slate-200 flex-col h-14 items-center justify-center   ">
         
          
         <h1 className="font-playball  ">
                 
                </h1>
          
         </div>
 </div>

      
      <div className="flex-grow  bg-gradient-to-br from-gray-200 to-slate-200 ">
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
            <Link to={'/driver/profile'} >
            <div className=' md:mr-10 mr-4 ' >
            <FaUser  className='md:text-3xl text-3xl  text-white ' />
            </div>
            </Link>
            </div>
            <div className="  w-full flex justify-center items-center md:mt-14 mt-8 ">
           
  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10  justify-center items-center w-full px-3 md:ml-20 ">
    {/* Total Payment Box */}
    <div className="flex flex-col justify-center  items-center bg-green-500   w-full sm:w-52  md:h-36 h-24 rounded shadow-lg">
     < FaMoneyBillWave  className='text-4xl text-yellow-500' />
      <div className="text-center text-white md:text-xl text-sm font-bold">Total Earnings</div>
      <div className="text-center text-white md:text-xl text-sm ">$500</div> {/* Replace with dynamic data */}
    </div>

    {/* Total Rides Box */}
    <div className="flex flex-col justify-center  items-center bg-green-600 w-full sm:w-52  md:h-36 h-24 rounded shadow-lg">
    <FaTaxi className='  text-3xl text-blue-500  ' />
      <div className="text-center text-white md:text-xl text-sm font-bold">Total Rides</div>
      <div className="text-center text-white md:text-xl text-sm ">120</div> {/* Replace with dynamic data */}
    </div>

    {/* Driver Status Box */}
    <div className="flex flex-col  justify-center items-center bg-green-500 w-full sm:w-52  md:h-36 h-24 rounded shadow-lg">
      
      <FaUserTie  className='text-3xl ' />
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
    <div className="flex flex-col justify-center items-center bg-green-800 w-full sm:w-52  md:h-36 h-24 rounded shadow-lg">
      <FaChartLine className='text-3xl text-red-500' />
      <div className="text-center text-white md:text-xl text-sm  font-bold">Today's Earnings</div>
      <div className="text-center  text-white md:text-xl text-sm  ">Value</div> {/* Replace with dynamic data */}
    </div>
  </div>
</div>
<div  className=' w-full mt-5 mb-5 px-6' >
<div className="w-full md:h-96 h-96 p-2 bg-gradient-to-br from-green-600 to-gray-700 rounded-3xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-10 ml-6 text-white tracking-wider">Driver Performance</h2>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <defs>
            <linearGradient id="blueGradient " x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.1} />
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
          <Line type="monotone" dataKey="rides" stroke="url(#blueGradient)" strokeWidth={4} dot={{ r: 5 }} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="earnings" stroke="url(#blueGradient)" strokeWidth={4} dot={{ r: 5 }} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="rating" stroke="url(#orangeGradient)" strokeWidth={4} dot={{ r: 5 }} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="fuelEfficiency" stroke="#F43F5E" strokeWidth={4} dot={{ r: 5 }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>

     </div>  
         
     <RideRequestModal
        isOpen={modalOpen}
        onReject={handledriverClose}
        onAccept={handleDriverAccepted}
        rideDetails={rideDetails}
      />

    

   
 </div>
 <Footer className='' />
{showEndRideModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-4 rounded-xl shadow-md w-80 text-center">
      <h2 className="text-xl font-semibold mb-2">You’ve reached the destination</h2>
      <p className="mb-4">Do you want to end the ride?</p>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded-md mr-2"
        onClick={handleConfirmEndRide}
      >
        End Ride & Pay
      </button>
      <button
        className="bg-gray-300 px-4 py-2 rounded-md"
        onClick={() => setShowEndRideModal(false)}
      >
        Cancel
      </button>
    </div>
  </div>
)}
   </>
  )
}

export default Dashboard
