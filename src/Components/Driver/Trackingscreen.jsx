import React from 'react'

import  { useState,useEffect,useRef } from 'react'
import { Link,useLocation, useParams,useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import socket from '../../services/socketio';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Header from './Header'
import Footer from './Footer';
import ReactMapGL,{Marker} from 'react-map-gl'
import { useTrackingdeatialsQuery } from '../../slices/userSlice';
import { useRideEndMutation } from '../../slices/driverSlice';


mapboxgl.accessToken = 'pk.eyJ1IjoibW9pZGhlZW5zdWhhaXIiLCJhIjoiY2x6YjF1cWNyMGJlMjJyb29hZ240Zmk4ayJ9.58Mg37vr5SeKrBWZtAQ2xQ'



function Trackingscreen() {
 const { rideId } = useParams();
  const { data } = useTrackingdeatialsQuery(rideId);
  const details = data?.data;
  const [showEndRideModal, setShowEndRideModal] = useState(false);
  const [rideEnd] = useRideEndMutation ();
  const mapContainerRef = useRef(null);
  const map = useRef(null);
  const driverMarkerRef = useRef(null);
   const [etaToPickup, setEtaToPickup] = useState(null);
         const [etaToDrop, setEtaToDrop] = useState(null);

  const [driverLocation, setDriverLocation] = useState(null);
const user = useSelector((state)=>state.driverAuth.user)
  // Get live location of driver (self)
 useEffect(() => {
   
 
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
   const driverId = user?._id;
   const drivername = user?.name;
 
   const driverLoc = { lat: latitude, lng: longitude };
   setDriverLocation(driverLoc);
 
   console.log('🚗 Sending driver location for tracking:', latitude, longitude);
 
  
   console.log("📍 DriverLoc:", driverLoc);
 console.log("🎯 Destination:", );
    const destination = {
        lat: details?.dropLat,
        lng: details?.dropLng,
      };
 console.log("🧮 isNearDestination:", isNearDestination(driverLoc, destination));
 

 
   if (
     isNearDestination(driverLoc, destination)
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
 }, [ ]);

  // Init Map
  useEffect(() => {
    if (!details?.pickup || !details?.drop) return;

    if (map.current) map.current.remove();

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [details.pickupLng, details.pickupLat],
      zoom: 13,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    new mapboxgl.Marker({ color: 'red' })
      .setLngLat([details.pickupLng, details.pickupLat])
      .setPopup(new mapboxgl.Popup().setText('Pickup'))
      .addTo(map.current);

    new mapboxgl.Marker({ color: 'green' })
      .setLngLat([details.dropLng, details.dropLat])
      .setPopup(new mapboxgl.Popup().setText('Drop'))
      .addTo(map.current);
  }, [details]);

  // Add/Update Driver Marker + Draw Route
  useEffect(() => {
    if (!driverLocation || !details || !map.current?.isStyleLoaded()) return;

    const driverPos = { lat: driverLocation.lat, lng: driverLocation.lng };
    const routeTo =
      details.rideStatus === 'onTheWay'
        ? { lat: details.dropLat, lng: details.dropLng }
        : { lat: details.pickupLat, lng: details.pickupLng };

    if (driverMarkerRef.current) {
      driverMarkerRef.current.setLngLat([driverPos.lng, driverPos.lat]);
    } else {
      driverMarkerRef.current = new mapboxgl.Marker({ color: 'blue' })
        .setLngLat([driverPos.lng, driverPos.lat])
        .setPopup(new mapboxgl.Popup().setText('You'))
        .addTo(map.current);
    }

    // Draw route from current → pickup or drop
    const drawRoute = async () => {
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${driverPos.lng},${driverPos.lat};${routeTo.lng},${routeTo.lat}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
      const res = await fetch(url);
      const data = await res.json();
      const route = data.routes[0].geometry;

      if (map.current.getSource('route')) {
        map.current.getSource('route').setData({ type: 'Feature', geometry: route });
      } else {
        map.current.addLayer({
          id: 'route',
          type: 'line',
          source: {
            type: 'geojson',
            data: { type: 'Feature', geometry: route },
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#00f',
            'line-width': 4,
          },
        });
      }
    };

    drawRoute();
  }, [driverLocation, details]);



   const isNearDestination = (driverPos, destinationPos, threshold = 10000) => {
  console.log("its coming here");
  
  
  
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

 
 const getETA=async(start,end)=>{
     const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.lng},${start.lat};${end.lng},${end.lat}?access_token=${mapboxgl.accessToken}`;
 
     const respons=await fetch(url)
     const data=await respons.json();
 
 
     if(data.routes && data.routes.length>0){
       const second=data.routes[0].duration;
       const minutes=Math.round(second/60);
       return minutes
     }
     return null
   
   }
 
   useEffect(() => {
   if (!driverLocation || !details) return;
 
   const driverPos = { lat: driverLocation.lat, lng: driverLocation.lng };
   const pickupPos = { lat: details.pickupLat, lng: details.pickupLng };
   const dropPos = { lat: details.dropLat, lng: details.dropLng };
 
   // ETA to pickup
   getETA(driverPos, pickupPos).then(setEtaToPickup);
 
  
     getETA(pickupPos, dropPos).then(setEtaToDrop);
   
 }, [driverLocation, details]);
 
 
 


  const handleConfirmEndRide = async () => {
    try { console.log("kooii");
    
        await rideEnd({ rideId }); 
    console.log("Ride ended.");
  } catch (error) {
      console.error('Error completing ride:', error);
    }
  };
 
 
 
 
 
     return( 
         <>
         <div className=' bg-gradient-to-l from-gray-800 via-green-700 to-gray-800 text-white        '   >
           
         <div className=" items-center justify-center">
         
        
        <div className="pt-10 flex items-center justify-center z-30 ">
        
     <div
       className=" rounded  w-11/12 shadow-md bg-gradient-to-l from-gray-800 via-green-700 to-gray-800 "
      
     >
         <div className=" shadow-lg p-4 text-center  text-lg font-serif ">
         🚘 Driver En Route – ETA: 
       </div>
       <div
         ref={mapContainerRef}
         className="map-container w-full rounded bg-gray-100"
         style={{
           height: '300px',
           padding: '10px', // Optional spacing inside the map container
           border: '8px solid white', // White border outside the map
         }}
       />
     </div>
    
   </div>
          
    
         </div>
        
      
      
 
       <div className="w-full    flex flex-col">
       {/* Top Info */}
       
 
    
 
       {/* Bottom Card */}
       <div className=" flex flex-col lg:flex-row gap-4 p-4  ">
         <div className="flex flex-col items-center  bg-gradient-to-bl from-gray-800 to-green-500 md:w-1/3 justify-between p-3 h-32 shadow-lg rounded-md">
           <div>
          
           <h2 className="text-xl font-serif text-center text-white mb-1 ">Map Details</h2>
           <hr className="border-t-2 border-white w-1/3 mx-auto " />
 
           <div className="flex items-center  gap-1">
           <span> 🛺 </span>
           <span className='text-xs' >Driver</span>
           <span> Reach in <strong>{etaToPickup?etaToPickup:"2 mint"} mint </strong></span>
           </div>
 
 
           <div className="flex items-center   gap-2">
           <span>🗺️</span>
            <img src="./banner.png" alt="Auto Rickshaw" className="auto-rickshaw" />
           <span className='text-xs' >Destination</span>
            <span>In <strong>{etaToDrop?etaToDrop:"3 "} mint</strong></span>
          </div>
 
          <div className="flex items-center gap-1 ">
       <span>📍</span>
       <span  className='text-xs' >You are here </span>
     
       <span><strong> Chowki, Kasaragod</strong></span>
     </div>
          
 
           </div>
          
         </div>
 
         <div className=" flex flex-col items-center  md:w-1/3 bg-gradient-to-r from-gray-800 to-green-500 h-32 p-3  shadow-lg rounded-lg text-sm text-white">
         <div className=' flex ' >
           <span className='text-white font-serif  ' >💰 Fare: </span>
           <span>{details?.fare?details.fare:'20'} </span>
           </div>
           <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
          💸 Advance Paid: {details?.advancePaid?details.advancePaid:'26'}
           </span>
           <p>Remaining: ₹65 (Cash or UPI after ride)</p>
           <p>📄 Booking ID: #RIDE89234A</p>
         </div>
 
         <div className="flex flex-col items-center  bg-gradient-to-bl from-gray-800 to-green-500 md:w-1/3 justify-between p-3 h-32 shadow-lg rounded-md">
           <div>
             <h2 className="font-serif text-lg">👨‍✈️ {details?.driverId?.name?details.driverId.name:'Rajeev K'}.</h2>
             <p className="text-sm text-gray-800">🚗 {details?.driverId?.VehicleNumber?details.driverId.VehicleNumber:'TN-10-AB-4567'}</p>
             <p className="text-sm">📞 {details?.driverId?.Phone?details.driverId.Phone:' +91-9876543210'}</p>
           </div>
           <div className="flex gap-3">
             <button className="bg-blue-500 text-white px-3 py-1 rounded">Chat</button>
             <button className="bg-green-500 text-white px-3 py-1 rounded">Call</button>
             <button className="bg-red-500 text-white px-3 py-1 rounded">Cancel</button>
           </div>
         </div>
 
       </div>
     </div>
       <Footer className='mt-3' />


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





       </div>
       </>
       
   
   
       )
 }
 


export default Trackingscreen
