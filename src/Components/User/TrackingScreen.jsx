import React, { useState,useEffect,useRef } from 'react'
import { Link,useLocation, useParams,useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import axios from 'axios';
import socket from '../../services/socketio';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Header from './Header'
import Footer from './Footer';
import ReactMapGL,{Marker} from 'react-map-gl'
import { useTrackingdeatialsQuery } from '../../slices/userSlice';
import { use } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoibW9pZGhlZW5zdWhhaXIiLCJhIjoiY2x6YjF1cWNyMGJlMjJyb29hZ240Zmk4ayJ9.58Mg37vr5SeKrBWZtAQ2xQ'


function TrackingScreen() {
                
              const {rideId}=useParams()
const navigate=useNavigate()
 const {isAuthenticated}=useSelector((state)=>state.auth)
 
 useEffect(()=>{
   if(!isAuthenticated){
       navigate('/')
   }
 },[navigate,isAuthenticated])

            const {data}=useTrackingdeatialsQuery(rideId)
           const [deatials,setdeatials]=useState()

            const details = data?.data;
              console.log('dtaisl',details);

                const mapContainerRef = useRef(null);
                    const map = useRef(null);
                    const userMarker = useRef(null);
                  
                  
                    const [driverLocation, setDriverLocation] = useState(null);
                    const driverMarkerRef = useRef(null);

              console.log("drii",driverLocation);
              
                  const drawRoute = (start, end) => {
                const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.lng},${start.lat};${end.lng},${end.lat}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

                fetch(url)
                  .then(res => res.json())
                  .then(data => {
                    const route = data.routes[0].geometry;

                    if (map.current.getSource('route')) {
                      map.current.getSource('route').setData({
                        type: 'Feature',
                        geometry: route,
                      });
                    } else {
                      map.current.addLayer({
                        id: 'route',
                        type: 'line',
                        source: {
                          type: 'geojson',
                          data: {
                            type: 'Feature',
                            geometry: route,
                          },
                        },
                        layout: {
                          'line-join': 'round',
                          'line-cap': 'round',
                        },
                        paint: {
                          'line-color': '#00FF00',
                          'line-width': 4,
                        },
                      });
                    }
                  });
              };


              
              useEffect(() => {
              
                if (!details?.driverId?._id) return;
                   console.log('friet det ',details.driverId._id);
                    const emitUserTracking = () => {
    console.log('📤 Emitting userTrackingRide');
    socket.emit('userTrackingRide', { rideId });
  };

  // Emit when connected, or wait for socket connection
  if (socket?.connected) {
    emitUserTracking();
  } else {
    socket.on('connect', emitUserTracking);
  }

              

                const handleDriverUpdate = (data) => {
                  console.log('dataId',data);
                  console.log('detilID',details.driverId._id);
                  
                  
                  if (String(data.driverId) === String(details.driverId._id)) {
                   console.log('MATCHED DRIVER, UPDATING LOCATION...');
                    
                    setDriverLocation({
                      lat: data.latitude,
                      lng: data.longitude,
                      name: data.drivername,
                    });
                  } else {
                console.log('NOT MATCHED: Incoming driver ID is different');
                   }
                };

                  console.log("Subscribing to driverLocationUpdate");

                socket.on('driverLocationUpdate', handleDriverUpdate);
                return () => socket.off('driverLocationUpdate', handleDriverUpdate);
              }, [rideId, details]);

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

                // Add pickup marker
                new mapboxgl.Marker({ color: 'red' })
                  .setLngLat([details.pickupLng, details.pickupLat])
                  .setPopup(new mapboxgl.Popup().setText('Pickup'))
                  .addTo(map.current);

                // Add destination marker
                new mapboxgl.Marker({ color: 'green' })
                  .setLngLat([details.dropLng, details.dropLat])
                  .setPopup(new mapboxgl.Popup().setText('Destination'))
                  .addTo(map.current);
              }, [details]);

                    
                  useEffect(() => {
              if (!driverLocation || !map.current || !details) return;

              if (!map.current.isStyleLoaded()) {
                map.current.on('load', () => {
                  addOrUpdateMarker();
                });
              } else {
                addOrUpdateMarker();
              }




            function addOrUpdateMarker() {
                const driverPos = { lat: driverLocation.lat, lng: driverLocation.lng };
                const routeTo =
                  details.rideStatus === 'onTheWay'
                    ? { lat: details.pickupLat, lng: details.pickupLng }
                    : { lat: details.dropLat, lng: details.dropLng };

                if (driverMarkerRef.current) {
                  driverMarkerRef.current.setLngLat([driverPos.lng, driverPos.lat]);
                } else {
                  driverMarkerRef.current = new mapboxgl.Marker({ color: 'blue' })
                    .setLngLat([driverPos.lng, driverPos.lat])
                    .setPopup(new mapboxgl.Popup().setText(driverLocation.name || 'Driver'))
                    .addTo(map.current);
                }

                drawRoute(driverPos, routeTo);
              }
            }, [driverLocation, details]);



    return( 
        <>
        <div className=' bg-gradient-to-l from-gray-800 via-green-700 to-gray-800 text-white        '   >
          
        <div className=" items-center justify-center">
        <div className='   sm:ml-7 sm:w-11/12 md:px-4 z-10 lg:ml-16   md:w-11/12 md:py-6 items-center justify-center animate-slide-down  '  >
                <Header  />
       </div>
       
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
          <span> Reach in <strong>3 minutes</strong></span>
          </div>


          <div className="flex items-center   gap-2">
          <span>🗺️</span>
          <span className='text-xs' >Destination</span>
           <span>In <strong>30 minutes</strong></span>
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
      </div>
      </>
      
  
  
      )
}

export default TrackingScreen
