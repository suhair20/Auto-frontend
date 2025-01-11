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
      
      <div>
        
      <div className="border rounded     items-center">
      <div className=' fixed-top md:ml-14  z-10 lg:ml-32 sm:w-12 py-6  md:w-5/6 items-center justify-center  '  >
          <Header  />
          </div>
        <div ref={mapContainerRef} className="map-container rounded " style={{ height: '500px', width:'100%' }} />
        
        <div className="flex flex-col h-full mt-16">
    
    <div className="navbar-color items-center rounded h-40 ">
      <p>suahir</p>
      
    </div>
  </div>
      </div>
    </div>
    )
  }


export default BookingScreen
