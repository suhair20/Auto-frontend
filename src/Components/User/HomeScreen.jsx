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
  className='justify-center position-relative footer-color items-center relative' 
   style={{ backgroundImage: 'url("./autobanner.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
    <div className="bg-black absolute inset-0 md:opacity-95 opacity-80 z-0"></div>
    <div className='justify-center animate-slide-down fixed-top items-center lg:ml-16 md:px-4 md:py-6 md:w-11/12 sm:ml-7 sm:w-11/12 z-10'  >
              <Header  />
     </div>
<div  className=' '>
         
          <div className='flex flex-col h-[700px] justify-center items-center relative' >
         
          <div className='text-center py-2 relative'> 
  <h1 className='bg-transparent text-3xl font-serif lg:text-6xl md:text-5xl sm:text-2xl uppercase '>trust us to</h1>
  <h1 className='  bg-clip-text bg-gradient-to-br  text-4xl font-serif from-green-600 to-gray-800 lg:text-6xl md:text-6xl sm:text-2xl  text-transparent uppercase'>Take you there</h1>
</div>

            <div className=  " relative  flex-col items-center w-[300px] justify-between ">

              <form className="flex flex-col items-center"  onSubmit={handleStart} >
              <div className="text-navbar-color text-sm items-end">
              
                <p>Hop in, Let's Go!</p>
              </div>
              <div  className='flex flex-col w-full gap-3 items-center md:gap-4 relative' >
                <input
                  type="text"
                  value={query}
                  onFocus={handleInputFocus}
                 onBlur={handleInputBlur}
                  onChange={handleInputChange}
                  className="bg-transparent border p-2 rounded text-white w-full md:w-[500px]"
                  placeholder="Enter Location"
                />
                 {showSuggestion && (
        <div
          id="suggestionBox"
          className="bg-white border p-6 rounded w-full absolute felx items-center md:w-[500px] mt-[43px]"
        >
          <p className="flex rounded text-black cursor-pointer font-robot-bold items-center"  onMouseDown={()=>handleSuggestion2Click(false)}>
          <FaMapLocation className='text-2xl mr-2' /><div className='ml-2' > Set Location on Map</div>
          </p>
          {suggestions.map((suggestion, index) => (
                      <p
                        key={index}
                        className="flex border border-black-300 rounded text-black cursor-pointer hover:bg-gray-100 items-center"
                        onMouseDown={() => handleSuggestionClick(suggestion)}
                      >
                       <IoLocationSharp className='text-1xl mr-2' /> 
                       <div className="flex-1 ml-2 truncate">{suggestion}</div>
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
                   className="bg-transparent border p-2 rounded text-white w-full lg:p-2 md:w-[500px] sm:w-2/3"
                   placeholder="Enter Destination"
                />
                {showDestinationSuggestion&&(
                   <div
                   id="suggestionBox"
                   className="bg-white p-6 rounded w-full absolute gap-4 md:w-[500px] mt-[101px] sm:w-2/3"
                  
                 >
                   <div className="flex rounded text-black cursor-pointer font-robot-bold items-center"  onMouseDown={()=>handleSuggestion2Click(true)}>
                   <FaMapLocation className='text-2xl mr-2' /><div className='ml-2' > Set Location on Map</div>
          </div>

          {DestinationSuggestion.map((suggestion, index) => (
                      <div
                        key={index}
                        className="flex border border-black-300 rounded text-black absolute cursor-pointer hover:bg-gray-100 items-center"style={{top:'150px'}}
                        onMouseDown={() => handledestinationSuggestionClick(suggestion)}
                      >
                       <IoLocationSharp className='text-1xl mr-2' /> 
                       <div className="flex-1 ml-2 truncate">{suggestion}</div>
                      </div>
                    ))}
         
        </div>
                )}
                </div>
                <button
                  type="submit"
                  className="navbar-color bg-gradient-to-tl border-0 p-1 rounded text-white font-robot-bold from-green-600 mt-2 px-4 to-gray-800 uppercase"
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
      <div className='bg-gradient-to-r justify-center p-3 from-green-600 items-center min-h-screen to-gray-800' >
       <div className='md:px-20' >
        <p className='text-4xl text-white animate-bounce font-passion md:text-4xl' >  Suggetions &#8595;</p>
         <div className='flex flex-col justify-center items-center md:flex-row md:px-10' >
         <img src="/taxii.png" alt="Image" className="h-[60vh] mx-auto" />
         <div className='flex flex-col items-center md:w-2/3' >
         <p className='text-5xl text-center text-white font-passion' >On Time, Every Time</p>
         <p className='text-center text-white w-2/3' >We use cutting-edge technology to get you where you need to be—right on schedule</p>
         </div>
         </div>

        
         <div className='flex flex-col-reverse justify-center items-center md:flex-row md:px-10' >
         
         <div className='flex flex-col items-center md:w-2/3' >
         <p className='text-5xl text-center text-white font-passion' >"Relax, We’ve Got You"</p>
         <p className='text-center text-white w-2/3' >Take your time—your ride comes with 15 minutes of complimentary wait time.</p>
         </div>
         <img src="/taxxxiii.png" alt="Image" className="h-[60vh] mx-auto" />
         </div>


         <div className='flex flex-col justify-center items-center mb-5 md:flex-row md:px-10' >
         <img src="ttaxii.png" alt="Image" className="h-[60vh] mx-auto" />
         <div className='flex flex-col items-center md:w-2/3' >
         <p className='text-5xl text-center text-white font-passion' >"Stress-Free Airport Rides"</p>
         <p className='text-center text-white w-2/3' >Travel with confidence—reserve your ride to and from major airports, with flight tracking to adjust for delays.</p>
         </div>
         </div>

       </div>
            
</div>
    

      <div className=''>
        
        <Modal show={showMapModal}  onHide={handleCloseMapModal} size="lg" centered>
        <Modal.Header className='justify-center text-color items-center'>
          <Modal.Title className='text-color font-robot-bold' >Set Location on Map</Modal.Title>
        </Modal.Header>
        <Modal.Body className='' >
          <div ref={mapContainerRef} className="h-[400px] rounded map-container md:h-[300px] sm:h-[500px]"   />
         
        </Modal.Body>

        <Modal.Footer  className='navbar-color' >
        <Button style={{background:'#016342' }} className='hover:bg-green-900' onClick={handleConfirmlocation}>
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
