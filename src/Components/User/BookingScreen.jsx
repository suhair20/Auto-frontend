import React, { useState,useEffect,useRef } from 'react'
import { Link,useLocation } from "react-router-dom";
import axios from 'axios';
import socket from '../../services/socketio';
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
    const locationstate=useLocation()
    const {query}=locationstate.state||{};
    const [activeDrivers, setActiveDrivers] = useState({});
    const [location, setLocation] = useState(null);
    const [destinationLocation, setDestinationLocation] = useState(null);




const driverMarkers = {}; 
const driverRoutes = {};

const storedRideDetails = localStorage.getItem('rideDetails');
if (storedRideDetails) {
  const rideDetails = JSON.parse(storedRideDetails);
  console.log('Ride Details:', rideDetails);
} else {
  console.log('No ride details found in localStorage.');
}

// 2. Function to add a driver marker
const addDriverMarker = (driverId, lng, lat) => {
  const marker = new mapboxgl.Marker({ element: createAutoIcon() }) // using auto icon
    .setLngLat([lng, lat])
    .setPopup(new mapboxgl.Popup().setText("Auto Rickshaw"))
    .addTo(map.current);

  driverMarkers[driverId] = marker; // Save marker
};

// 3. Function to remove driver marker
const removeDriverMarker = (driverId) => {
  if (driverMarkers[driverId]) {
    driverMarkers[driverId].remove(); // Remove from map
    delete driverMarkers[driverId];    // Delete from memory
  }

  const layerId=driverRoutes[driverId]
  if(layerId &&map.current.getLayer(layerId)){
    map.current.removeLayer(layerId) 
  }
  if(layerId&&map.current.getSource(layerId)){
    map.current.removeSource(layerId)
  }
  delete driverRoutes[driverId]

};

const updateDriverMarkers = (activeDrivers) => {
  Object.entries(activeDrivers).forEach(([driverId, driver]) => {
    if (driverId !== 'undefined' && !driverMarkers[driverId]) {
      addDriverMarker(driverId, driver.lng, driver.lat);

      // Now draw route from user to this driver
      if (userMarker.current) {
        const [userLng, userLat] = userMarker.current.getLngLat().toArray();
        fetchRoute(map.current, userLng, userLat, driver.lng, driver.lat, driverId);
      }
    }
  });

  Object.keys(driverMarkers).forEach((driverId) => {
    console.log("koi");
    console.log("driverId",driverId);
    console.log("active",activeDrivers);
    
    
    if (!(driverId in activeDrivers)) {
      console.log("hh");
      
      removeDriverMarker(driverId);
    }
  });
};


// 5. When user searches, load map and add dummy autos
useEffect(() => {
  if (map.current) {
    map.current.remove();
  }
  map.current = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [75.0017, 12.4996],
    zoom: 5,
  });

  map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

  if (query) {
    console.log(query);
    
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.features.length > 0) {
          const [lng, lat] = data.features[0].center;

          map.current.flyTo({ center: [lng, lat], zoom: 14 });

          userMarker.current = new mapboxgl.Marker({ color: 'red' })
            .setLngLat([lng, lat])
            .setPopup(new mapboxgl.Popup().setText(query))
            .addTo(map.current);

            updateDriverMarkers(activeDrivers);
        }
      })
      .catch((err) => console.error('Error fetching location:', err));
  }
}, [query]);

// 6. Listen to socket driver updates
useEffect(() => {
  socket.on('updateDrivers', (activeDrivers) => {

    console.log("active drivers ", activeDrivers);
 
    if (map.current) {
      setActiveDrivers(activeDrivers)
      updateDriverMarkers(activeDrivers);
    }
  });

  return () => {
    socket.off('updateDrivers'); // 👈 Correct way to remove listener, not disconnect whole socket
  };
}, []);

// 7. Create auto rickshaw marker icon
const createAutoIcon = () => {
  const auto = document.createElement('img');
  auto.src = './banner.png'; // Make sure correct path (check public folder)
  auto.style.width = '20px';
  auto.style.height = '20px';
  return auto;
};

// 8. Function to fetch route if needed
const fetchRoute = (mapInstance, startLng, startLat, endLng, endLat, driverId) => {
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startLng},${startLat};${endLng},${endLat}?geometries=geojson&access_token=${mapboxgl.accessToken}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.routes.length > 0) {
        const routeData = {
          type: "Feature",
          geometry: data.routes[0].geometry,
        };

        const layerId = `route-${driverId}`;

        if (mapInstance.getLayer(layerId)) {
          mapInstance.removeLayer(layerId);
        }
        if (mapInstance.getSource(layerId)) {
          mapInstance.removeSource(layerId);
        }

        mapInstance.addSource(layerId, {
          type: "geojson",
          data: routeData,
        });

        mapInstance.addLayer({
          id: layerId,
          type: "line",
          source: layerId,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "green",
            "line-width": 3,
            "line-opacity": 0.9,
          },
        });

        driverRoutes[driverId] = layerId;
      }
    })
    .catch((err) => console.error("Error fetching route:", err));
};

    return( 
      <>
      <div className=' bg-gradient-to-br from-green-600 to-gray-800 text-white        '   >
        
      <div className=" items-center justify-center">
      <div className='   sm:ml-7 sm:w-11/12 md:px-4 z-10 lg:ml-16   md:w-11/12 md:py-6 items-center justify-center animate-slide-down  '  >
              <Header  />
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
        <div className="flex py-3  flex-col    "  >
         <div  className=' py-2   ' >
          <h1  className='text-white md:text-4xl text-3xl text-center font-serif ' >Meet your Drivers </h1>
          </div>
          <div className=" naavfabr items-center justify-center rounded shadow-md p-3 w-5/6 md:w-2/4 lg:w-4/4 mx-auto ">
      
      
          <div className="overflow-hidden w-full gap-2">



      <div className="flex w-[calc(5*150px)] gap-3  animate-slide transition-transform duration-500"
        id="slider"
      >
        {/* Duplicate the list to create a seamless loop */}
        <ul className="text-white flex space-x-4">
          {Object.entries(activeDrivers).map(([driverId,driver], index) => (
            
           <Link to={`/booking/detials/${driverId}`} key={`duplicate-${index}`}>

            <li
              key={index}
              className="flex flex-col items-center justify-between p-3 bg-white shadow-lg rounded-lg text-black md:w-44 space-y-2 md:space-y-4 relative"
              onMouseEnter={(e) =>
                e.currentTarget.parentElement.parentElement.classList.add('animate-play-paused')
              }
              onMouseLeave={(e) =>
                e.currentTarget.parentElement.parentElement.classList.remove('animate-play-paused')
              }
            >
              <div className="bg-gray-800 rounded-full h-16 w-16 flex items-center justify-center">
                <span className="text-white font-bold text-xl">{driver.drivername.charAt(0)}</span>
              </div>
              <h1 className="text-lg font-semibold">{driver.drivername}</h1>
              <h1 className="text-sm font-medium text-gray-600 whitespace-nowrap">{`${index * 200 + 100} meters`}</h1>
              <button className="navbar-color text-white text-xs sm:text-sm px-2 md:px-3 py-1 rounded hover:bg-green-950 whitespace-nowrap">
                Book now
              </button>
            </li>
            </Link>
          ))}
        </ul>



    {/* Duplicate for seamless rotation */}
    <ul className="text-white flex space-x-4">
      {['Ashwin', 'Askar', 'Manoj', 'Rheem', 'Achu'].map((name, index) => (
         <Link to={`/booking/detials/${name}`} key={`duplicate-${index}`}>

        <li
          key={`duplicate-${index}`}
          className="flex flex-col items-center justify-between p-3 bg-white shadow-lg rounded-lg text-black md:w-44 space-y-2 md:space-y-4 relative  "
          onMouseEnter={(e) =>
            e.currentTarget.parentElement.parentElement.classList.add('animate-play-paused')
          }
          onMouseLeave={(e) =>
            e.currentTarget.parentElement.parentElement.classList.remove('animate-play-paused')
          }
         >
          <div className="bg-gray-800 rounded-full h-16 w-16 flex items-center justify-center">
            <span className="text-white font-bold text-xl">{name.charAt(0)}</span>
          </div>
          <h1 className="text-lg font-semibold">{name}</h1>
          <h1 className="text-sm font-medium text-gray-600 whitespace-nowrap">{`${index * 200 + 100} meters`}</h1>
          <button className="navbar-color text-white text-xs sm:text-sm px-2 md:px-3 py-1 rounded hover:bg-green-950 whitespace-nowrap">
            Book now
          </button>
        </li>
        </Link>
      ))}
     
    </ul>
   

  </div>
 
</div>

    </div>
   
  </div>
 
      </div>
  
    </div>
    <Footer className='mt-3' />
    </>



    )
  }


export default BookingScreen
