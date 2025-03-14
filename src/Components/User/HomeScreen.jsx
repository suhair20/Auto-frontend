import React, { useState,useEffect,useRef } from 'react'
import Header from './Header'
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import './User.css';
import Footer from './Footer'
import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { FaMapLocation } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import  Login from './Login';



import {Modal } from "react-bootstrap"
import { accessToken } from 'mapbox-gl';
import { Link } from 'react-router-dom';





mapboxgl.accessToken = 'pk.eyJ1IjoibW9pZGhlZW5zdWhhaXIiLCJhIjoiY2x6YjF1cWNyMGJlMjJyb29hZ240Zmk4ayJ9.58Mg37vr5SeKrBWZtAQ2xQ'

function HomeScreen() {


  const Navigate =useNavigate()
  const [query, setQuery] = useState('');
  const [DestinationQuery,setDestinationQuery]=useState('')
  const [suggestions,setSuggestions]=useState()
  const [loginOpen,setLoginOpen]=useState(false)
  const [DestinationSuggestion,setDestinationSuggestion]=useState()
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [showDestinationSuggestion,setshowDestinationSuggestion]=useState(false)
  const [showMapModal, setShowMapModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [Destinationlocation,setDestinationlocation]=useState(false)
  const [IsDestinationselection,setIsDestinationselection]=useState(false)
  const [ErrorMessage,setErrorMessage]=useState('')
  const mapContainerRef = useRef(null);
  const map = useRef(null)
  const userMarker = useRef(null);
  const selectedMarker=useRef(null)
   const {isAuthenticated}=useSelector((state)=>state.auth)

  useEffect(() => {
    if (query.length > 2) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`, {
            params: {
             
              access_token: mapboxgl.accessToken,
               

            }
          });

          setSuggestions(response.data.features.map(feature => feature.place_name));
          
         
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);




  useEffect(() => {
    if (DestinationQuery.length > 2) {
      const fetchDestinationSuggestions = async () => {
        try {
          const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(DestinationQuery)}.json`, {
            params: { access_token: mapboxgl.accessToken }
          });
          setDestinationSuggestion(response.data.features.map(feature => feature.place_name));
        } catch (error) {
          console.error('Error fetching destination suggestions:', error);
        }
      };
      fetchDestinationSuggestions();
    } else {
      setDestinationSuggestion([]);
    }
  }, [DestinationQuery]);


  useEffect(() => {
    if (map.current) {
      map.current.resize(); // Trigger map resize to ensure correct positioning
    }
  }, [showMapModal]);
  


  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleDestinationInputChange=(e)=>{
    setDestinationQuery(e.target.value)
  }


  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  const handleInputBlur = () => {
    
    setTimeout(() => setShowSuggestion(false), 100); 
  };

  const handledestinationInputBlur = () => {
    
    setTimeout(() => setshowDestinationSuggestion(false), 100); 
  };




  const handleInputFocus = () => {
    setShowSuggestion(true);
    setshowDestinationSuggestion(false)
  };


  const handleSuggestion2Click = (isDestination=false) => {
    setIsDestinationselection(isDestination);
    setShowSuggestion(false);
    setshowDestinationSuggestion(false);
    setShowMapModal(true);
    
  };

  const handleCloseMapModal = () => {
    setShowMapModal(false);
  };

  const handledestinationSuggestionClick=(suggestion)=>{
    setDestinationQuery(suggestion); 
    setDestinationSuggestion([]);
  }
  


  useEffect(() => {

    if (showMapModal) {
      if (map.current) {
        map.current.remove(); // Remove any existing map instance
      }
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [75.0017, 12.4996], // Default center, you can change this
        zoom: 12,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: true , // Do not add default marker
      });
      map.current.addControl(geocoder, 'top-left');

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const userLocation = [longitude, latitude];
             
            map.current.flyTo({
              center: userLocation,
              zoom: 14,
              essential: true, // This ensures that the transition is smooth and user-friendly
            });
  
            // Add a custom marker at the user's location
            if (userMarker.current) {
              userMarker.current.remove();
            }
            userMarker.current = new mapboxgl.Marker({ color: 'red' })
              .setLngLat(userLocation)
              .addTo(map.current);


              if (IsDestinationselection) {
                setDestinationlocation(userLocation); // Set destination location
              } else {
                setLocation(userLocation); // Set current location
              }
          },
         
          (error) => {
            console.error('Error getting user location:', error);
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }

      map.current.on('click',(event)=>{
        
        const {lng,lat}= event.lngLat
        const selectedlocation=[lng,lat]
        console.log(selectedlocation);
        
        
        if (IsDestinationselection) {
          setDestinationlocation(selectedlocation); // Set destination location
        } else {
          setLocation(selectedlocation); // Set current location
        }
        
        if (selectedMarker.current){
         
          selectedMarker.current.remove()
        }
       

        selectedMarker.current=new mapboxgl.Marker()
          .setLngLat(selectedlocation)
          .addTo(map.current)

      })


    }
  }, [showMapModal]);

const handleConfirmlocation=async()=>{
 
  const loc=IsDestinationselection?Destinationlocation:location

  if(loc&& loc.length==2){
    try {
      const response = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${loc[0]},${loc[1]}.json`,{
        params: {
          access_token: mapboxgl.accessToken,
        },
      });

      if(response.data.features.length>0){
        const placeName=response.data.features[0].place_name
        console.log(placeName);
        
        if (placeName) {
          if (IsDestinationselection) {
            setDestinationQuery(placeName); // Set destination query
          } else {
            setQuery(placeName); // Set current location query
          }
        }
      }
      
    } catch (error) {
      console.error('Error fetching place name:', error);
    }
  }else{
    console.error('Location is undefined or invalid');
  }
  setShowMapModal(false)
  setshowDestinationSuggestion(false)
  setShowSuggestion(false)
}

const handleStart=(e)=>{
  e.preventDefault( )
  try {
    if(!query&& !DestinationQuery){
      setErrorMessage('Please select both the location and destination.');
    }else if(!isAuthenticated){
      setErrorMessage('')
      setLoginOpen(true)
    }else{
      setErrorMessage('')
      Navigate('/booking',{state:{query}})
    }
  } catch (error) {
    console.error( error);
  }
}







  return (
    <>
      
<div 
  className='footer-color h-[90vh]   relative position-relative  items-center justify-center ' 
   style={{ backgroundImage: 'url("./autobanner.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
    <div className=" absolute inset-0 bg-black md:opacity-90 opacity-80 z-0"></div>
    <div className=' fixed-top  sm:ml-7 sm:w-11/12 md:px-4 z-10 lg:ml-16   md:w-11/12 md:py-6 items-center justify-center animate-slide-down  '  >
              <Header  />
     </div>
<div  className=' '>
         
          <div className=' py-56 bottom-8' >
         
          <div className='relative text-center  py-2'>
  <h1 className='font-passion  bg-transparent text-3xl sm:text-2xl md:text-5xl lg:text-6xl uppercase '>trust us to</h1>
  <h1 className='font-passion navbar-color text-3xl sm:text-2xl md:text-5xl lg:text-6xl uppercase bg-transparent'>Take you there</h1>
</div>

            <div className=  " relative  flex-col items-center justify-between px-4 sm:px-8 lg:px-32">

              <form className="  flex flex-col  items-center"  onSubmit={handleStart} >
              <div className="    text-navbar-color items-end  text-sm">
              
                <p>Hop in, Let's Go!</p>
              </div>
              <div  className=' flex flex-col  gap-3 md:gap-4 w-full items-center relative' >
                <input
                  type="text"
                  value={query}
                  onFocus={handleInputFocus}
                 onBlur={handleInputBlur}
                  onChange={handleInputChange}
                  className=" p-2   md:w-[500px] sm:w-2/3 w-full  text-white  rounded bg-transparent border     "
                  placeholder="Enter Location"
                />
                 {showSuggestion && (
        <div
          id="suggestionBox"
          className="absolute  border md:w-[500px] sm:w-2/3 w-full rounded  bg-white  p-6  mt-[43px] felx items-center "
        >
          <p className=" text-black cursor-pointer  rounded font-robot-bold flex items-center "  onMouseDown={()=>handleSuggestion2Click(false)}>
          <FaMapLocation className='mr-2 text-2xl' /><div className='ml-2' > Set Location on Map</div>
          </p>
          {suggestions.map((suggestion, index) => (
                      <p
                        key={index}
                        className="text-black rounded border cursor-pointer border-black-300 hover:bg-gray-100 flex items-center"
                        onMouseDown={() => handleSuggestionClick(suggestion)}
                      >
                       <IoLocationSharp className='mr-2 text-1xl' /> 
                       <div className="ml-2 flex-1 truncate">{suggestion}</div>
                      </p>
                    ))}
         
        </div>
      )}
                
                <input
                   type="text"
                   value={DestinationQuery}
                   onFocus={()=>setshowDestinationSuggestion(true)}
                  onBlur={handledestinationInputBlur}
                   onChange={handleDestinationInputChange}
                   className=" p-2 lg:p-2   md:w-[500px] sm:w-2/3 w-full text-white bg-transparent border rounded   "
                   placeholder="Enter Destination"
                />
                {showDestinationSuggestion&&(
                   <div
                   id="suggestionBox"
                   className="absolute bg-white rounded  md:w-[500px] sm:w-2/3 w-full mt-[101px] gap-4  p-6   "
                  
                 >
                   <div className=" text-black cursor-pointer rounded font-robot-bold  flex items-center "  onMouseDown={()=>handleSuggestion2Click(true)}>
                   <FaMapLocation className='mr-2 text-2xl' /><div className='ml-2' > Set Location on Map</div>
          </div>

          {DestinationSuggestion.map((suggestion, index) => (
                      <div
                        key={index}
                        className="text-black rounded border cursor-pointer border-black-300 hover:bg-gray-100 flex items-center "style={{top:'150px'}}
                        onMouseDown={() => handledestinationSuggestionClick(suggestion)}
                      >
                       <IoLocationSharp className='mr-2 text-1xl' /> 
                       <div className="ml-2 flex-1 truncate  ">{suggestion}</div>
                      </div>
                    ))}
         
        </div>
                )}
                </div>
                <button
                  type="submit"
                  className=" mt-2 p-1 font-robot-bold   border-0 uppercase text-white navbar-color rounded px-4"
                >
                  Start
                </button>
               
              </form>
            </div>
          </div>
          
          <div>
           
          </div>
        </div>
       
      </div>
    

      <div className=''>
        
        <Modal show={showMapModal}  onHide={handleCloseMapModal} size="lg" centered>
        <Modal.Header className=' text-color items-center justify-center'>
          <Modal.Title className='text-color font-robot-bold ' >Set Location on Map</Modal.Title>
        </Modal.Header>
        <Modal.Body className='' >
          <div ref={mapContainerRef} className="map-container rounded h-[400px] sm:h-[500px] md:h-[300px] "   />
         
        </Modal.Body>

        <Modal.Footer  className='navbar-color' >
        <Button style={{background:'#016342' }} className='  hover:bg-green-900 ' onClick={handleConfirmlocation}>
            confirm location
          </Button>
        </Modal.Footer>
       
      </Modal>
      </div>
      <Footer className='' />
      <Login 
  isOpen={loginOpen}
  onRequestClose={() =>setLoginOpen(false) }

/>
    </>
  );
}


export default HomeScreen
