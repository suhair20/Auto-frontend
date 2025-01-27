import React, { useState,useEffect,useRef } from 'react'
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Header from './Header'
import Footer from './Footer';




mapboxgl.accessToken = 'pk.eyJ1IjoibW9pZGhlZW5zdWhhaXIiLCJhIjoiY2x6YjF1cWNyMGJlMjJyb29hZ240Zmk4ayJ9.58Mg37vr5SeKrBWZtAQ2xQ'

function BookingScreen() {

    const mapContainerRef = useRef(null);
    const map = useRef(null);
    const userMarker = useRef(null);

    
    const [location, setLocation] = useState(null);
    const [destinationLocation, setDestinationLocation] = useState(null);
  
    useEffect(() => {
      if (map.current) {
        map.current.remove(); // Remove previous map if any
      }
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [75.0017, 12.4996], // Default center
        zoom: 12,
      });
  
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
  
      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      });
      map.current.addControl(geocoder, 'top-left');
  
      // Add user location marker (optional)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation = [position.coords.longitude, position.coords.latitude];
          map.current.flyTo({ center: userLocation, zoom: 14 });
          userMarker.current = new mapboxgl.Marker({ color: 'red' }).setLngLat(userLocation).addTo(map.current);
        });
      }
  
     
     
    }, []);
  
   
  
    return( 
      
      <div className=' naavabr h-screen  '   >
        
      <div className=" items-center justify-center">
      <div className=' relative ml-15  lg:ml-16 sm:w-11/12   md:w-11/12 md:py-6 items-center justify-center animate-slide-down  z-20  '  >
              <Header   />
     </div>
     <div className="pt-10 flex items-center justify-center z-30 ">
  <div
    className=" rounded  w-11/12 shadow-md "
   
  >
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
        <div className="flex py-3  flex-col   naavabr "  >
         <div  className=' py-2  naavabr ' >
          <h1  className='text-white md:text-4xl text-3xl text-center font-passion ' >Meet your Drivers </h1>
          </div>
          <div className=" naavfabr items-center justify-center rounded  p-3 w-5/6 md:w-2/4 lg:w-4/4 mx-auto">
      
      
          <ul className="text-white overflow-x-auto flex  items-center justify-center space-x-4">


          <li className="flex flex-col items-center justify-between p-3 bg-white shadow-lg rounded-lg text-black   md:w-44 space-y-2 md:space-y-4  "
          >
            
              <div className="bg-gray-800 rounded-full h-16 w-16 flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
                </div>
                       <h1 className="text-lg font-semibold">Ashwin</h1>
                       <h1 className="ttext-sm font-medium text-gray-600  whitespace-nowrap ">800 meters</h1>
               <button className="navbar-color text-white text-xs sm:text-sm  px-2 md:px-3  py-1 rounded hover:bg-green-950 whitespace-nowrap ">
                 Book now
               </button>
          </li>


          <li className="flex flex-col items-center justify-between p-3 bg-white shadow-lg rounded-lg text-black   md:w-44 space-y-2 md:space-y-4  "
          >
            
              <div className="bg-gray-800 rounded-full h-16 w-16 flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
                </div>
                       <h1 className="text-lg font-semibold">Askar</h1>
                       <h1 className="ttext-sm font-medium text-gray-600  whitespace-nowrap ">100 meters</h1>
               <button className="navbar-color text-white text-xs sm:text-sm  px-2 md:px-3  py-1 rounded hover:bg-green-950 whitespace-nowrap ">
                 Book now
               </button>
          </li>


          <li className="flex flex-col items-center justify-between p-3 bg-white shadow-lg rounded-lg text-black   md:w-44 space-y-2 md:space-y-4  "
          >
            
              <div className="bg-gray-800 rounded-full h-16 w-16 flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
                </div>
                       <h1 className="text-lg font-semibold">Manoj</h1>
                       <h1 className="ttext-sm font-medium text-gray-600  whitespace-nowrap ">600 meters</h1>
               <button className="navbar-color text-white text-sm  px-2 md:px-3  py-1 rounded hover:bg-green-950 whitespace-nowrap ">
                 Book now
               </button>
          </li>

          <li className="flex flex-col items-center justify-between p-3 bg-white shadow-lg rounded-lg text-black   md:w-44 space-y-2 md:space-y-4  "
          >
            
              <div className="bg-gray-800 rounded-full h-16 w-16 flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
                </div>
                       <h1 className="text-lg font-semibold">Rheem</h1>
                       <h1 className="ttext-sm font-medium text-gray-600  whitespace-nowrap ">900 meters</h1>
               <button className="navbar-color text-white text-xs sm:text-sm  px-2 md:px-3  py-1 rounded hover:bg-green-950 whitespace-nowrap ">
                 Book now
               </button>
          </li>


          <li className="flex flex-col items-center justify-between p-3 bg-white shadow-lg rounded-lg text-black   md:w-44 space-y-2 md:space-y-4  "
          >
            
              <div className="bg-gray-800 rounded-full h-16 w-16 flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
                </div>
                       <h1 className="text-lg font-semibold">achu</h1>
                       <h1 className="ttext-sm font-medium text-gray-600  whitespace-nowrap ">200 meters</h1>
               <button className="navbar-color text-white text-xs sm:text-sm  px-2 md:px-3  py-1 rounded hover:bg-green-950 whitespace-nowrap ">
                 Book now
               </button>
          </li>
        
      </ul>
    </div>
   
  </div>
  
      </div>
      
    </div>
    )
  }


export default BookingScreen
