import React, { useState,useEffect,useRef } from 'react'
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Header from './Header'




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
  
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-left');
  
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
      
      <div className='  navbar-color '   >
        
      <div className="border rounded navbar-color items-center justify-center">
      <div className='   z-10  sm:w-12 md:w-full  items-center justify-center  '  >
          <Header  />
          </div>
          <div  className='pt-10 items-center justify-center ' >
            
        <div ref={mapContainerRef} className="map-container rounded " style={{ height: '300px', width:'50%' }} />
        </div>
        <div className="flex navbar-color  flex-col  h-screen "  >
         <div  className='p-3' >
          <h1  className='text-white text-3xl  text-center font-passion ' >Meet your Drivers </h1>
          </div>
          <div className=" naavabr items-center justify-center rounded p-4 w-5/6 md:w-4/4 lg:w-4/4 mx-auto">
      <ul className="text-white flex flex-col items-center justify-center space-y-4">


        <li className="flex items-center justify-between p-1 bg-slate-100  w-full md:w-4/6 rounded text-black space-x-4">
          <div className="bg-gray-800 rounded-full h-10 w-10 flex   items-center justify-center">
            <span>S</span>
          </div>
          <h1 className="ml-4  text-lg font-semibold">Suhir</h1>
          <h1 className="text-sm ml-20 font-medium">200mt</h1>
          <button className=" bg-blue-500 text-white text-sm px-2 py-2 rounded hover:bg-blue-600">
         Book Now
        </button>
        </li>


        <li className="flex items-center justify-between p-1 bg-slate-100  w-full md:w-4/6 rounded text-black space-x-4">
          <div className="bg-gray-800 rounded-full h-10 w-10 flex   items-center justify-center">
            <span>S</span>
          </div>
          <h1 className="ml-4  text-lg font-semibold">Suhir</h1>
          <h1 className="text-sm ml-20 font-medium">200mt</h1>
          <button className=" bg-blue-500 text-white text-sm px-2 py-2 rounded hover:bg-blue-600">
         Book Now
        </button>
        </li>

        <li className="flex items-center justify-between p-1 bg-slate-100  w-full md:w-4/6 rounded text-black space-x-4">
          <div className="bg-gray-800 rounded-full h-10 w-10 flex   items-center justify-center">
            <span>S</span>
          </div>
          <h1 className="ml-4  text-lg font-semibold">Suhir</h1>
          <h1 className="text-sm ml-20 font-medium">200mt</h1>
          <button className=" button-color text-white text-sm px-2 py-2 rounded hover:bg-blue-600">
         Book Now
        </button>
        </li>
        {/* Add more drivers as needed */}
      </ul>
    </div>
  </div>
      </div>
    </div>
    )
  }


export default BookingScreen
