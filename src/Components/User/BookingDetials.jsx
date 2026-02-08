
import { useState,useEffect } from "react";
import React from 'react'
import Header from './Header'
import { useParams,useNavigate, json } from 'react-router-dom';
import { skipToken } from "@reduxjs/toolkit/query";
import { Currency, Star } from 'lucide-react';
import banner from '../../assets/public/images/banner.png';
import banner2 from '../../assets/public/images/banner2.jpg';
import Footer from './Footer';
import socket from '../../services/socketio';
import RideRequestModal from './RideRequestamaodal';
import { useDriverdetialsQuery } from "../../slices/driverSlice";
import { useCreateOrderMutation } from "../../slices/userSlice";
import { useVerifypaymentMutation } from "../../slices/userSlice";
import { useSelector } from "react-redux";




function BookingDetials({ ratings =  {
  1: 3,  
  2: 5,  
  3: 10, 
  4: 15, 
  5: 25  
}}) {
  const totalRatings = Object.values(ratings).reduce((sum, count) => sum + count, 0);




     const {driverId}=useParams()
     const isValidId = /^[a-f\d]{24}$/i.test(driverId);

      useEffect(() => {
    if (!isValidId) {
      setNoDriver(true);
    }
  }, [isValidId]);


const navigate = useNavigate()
     const [modalOpen, setModalOpen] = useState(false);
     const [noDriver, setNoDriver] = useState(false);
    
     const [rideDetails, setRideDetails] = useState(null);
     const [CreateOrder] = useCreateOrderMutation();
     const [verifypeymnet]=useVerifypaymentMutation()
     const {user}=useSelector((state)=>state.auth);
     const currentuserId=user?._id ;
const {isAuthenticated}=useSelector((state)=>state.auth)

useEffect(()=>{
  if(!isAuthenticated){
      navigate('/')
  }
},[navigate,isAuthenticated])

    const  fuctionverifypeymnet=async(response)=>{

     try {
      const Details=localStorage.getItem('rideDetails');
          console.log('itscomr',Details);
          
      const res=await verifypeymnet({ 
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        rideDetails: JSON.parse(Details)
      })
       console.log('fontres',res);
       if(res.data.success){
      
          const rideDetails = JSON.parse(localStorage.getItem('rideDetails'));
       const rideId = rideDetails?.rideId;
        navigate(`/tracking/${rideId}`, { replace: true })
        socket.emit('advancePaymentDone', {
        driverId: rideDetails.driverId,
  rideId: rideDetails.rideId,
          });
      }
   
      
      
     } catch (error) {
      console.error('payemnt verification failed in front')
     }
    }



     
  useEffect(() => {
    const storedRideDetails = localStorage.getItem('rideDetails');
    if (storedRideDetails) {
      setRideDetails(JSON.parse(storedRideDetails));
    }


    const handleDriverResponse = (data) => {

      console.log("rejectteddeatials",data);
      
      if (data.status === 'Accepted') {
      
        const storedRideDetailss=JSON.parse(localStorage.getItem('rideDetails')||'{}');
        const updatedDetails={
          ...storedRideDetailss,
          driverId:data.driverId,
          userId:currentuserId
        }
        localStorage.setItem('rideDetails', JSON.stringify(updatedDetails));

        setModalOpen(false);
        handleDriverAccepted(); 
      } else if (data.status === 'rejected') {
        console.log('rejected');
        
        setNoDriver(true);
      }
    };
  
    socket.on('driverResponded', handleDriverResponse);
  
    return () => socket.off('driverResponded', handleDriverResponse);
  }, []);



  


     const handleRequestRide = () => {
      socket.emit( 'sent_ride_req', {
       driverId:driverId,
       rideDetails:rideDetails
      }) 
       setModalOpen(true);
     };


    
   
     const handleDriverAccepted =async () => {
      
      try {
        const storedRideDetails = localStorage.getItem('rideDetails');
        if (!storedRideDetails) throw new Error("No ride details found");
    
        const parsedDetails = JSON.parse(storedRideDetails);
        console.log('ride details:', parsedDetails);
    
        setModalOpen(false);
    
        const orderResponse = await CreateOrder({ amount: parsedDetails.advancePayment, currency: 'INR' });
        const order=orderResponse.data
      
    const options = {
      key: 'rzp_test_GUwK0qBukL0t4v', // NOT SECRET
      amount:  order.amount,
      currency: 'INR',
      name: 'Auto - Advance Ride Payment',
      description: 'Auto ride payment',
      order_id:  order.id,
      handler: function (response) {
        console.log('Payment success:', response);

        fuctionverifypeymnet(response)
        // Optionally: send response to backend to verify payment
      },
      prefill: {
        name: 'User Name',
        email: 'user@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#33cc99',
      },
     
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
         console.log("Driver accepted! Redirecting to payment...");
        
      } catch (error) {
        console.error('Payment error:', error);
      }

 
     };



     const {data:driver}=useDriverdetialsQuery(isValidId?driverId:skipToken)
     console.log(driver);
     


  return (
    <div className=' bg-gradient-to-t from-green-600 to-gray-950   ' >
      <div className='   sm:ml-7 sm:w-11/12 md:px-4 z-10 lg:ml-16   md:w-11/12 md:py-6 items-center justify-center animate-slide-down  '  >
              <Header  />
     </div  >


    <div className=' md:px-24  pt-7 md:pt-20 ' >
        <div className='  text-white   min-h-screen  rounded' >
            {/* <h1>drivername:{driverId}</h1> */}
            <div className='main md:gap-10 md:flex ' >
                <div className=' bg-gradient-to-tr from-green-800 to-gray-800   rounded md:w-1/2 md:flex ' >
                    <div className='text-black md:flex-row  w-full' > 
                        <div className=' w-full px-4 flex items-center justify-center ' >
                          <img src={driver?.Profileimage??banner2}  alt='Profile'  className='h-32 mt-2 md:h-52 w-32 md:w-52 rounded-full border border-black'    />
                        </div>
                   
                        <div className='text-white p-5 items-center justify-center  flex w-full' >
                           <div className='w-full flex-col  items-center justify-center flex  ' >
                           
                             <span className=' font-serif text-3xl ' >{driver?.name??'dummy driver'} </span>
                            <p className='font-serif' >Experience:{driver?.Experience?driver.Experience : '5Year'}</p>
                             <div className=' w-full   flex flex-col items-center justify-center h-full' >
                                
                                     
                                     <div  className=' bg-gray-400 w-32 h-6 ' >

                                     </div>

                                     <div  className=' text-white text-center    bg-black w-32 h-8 ' >
                                       {driver?.VehicleNumber??'kl04536'} 
                                     </div>
                                

                             </div>
                             
                           </div>
                           
                        </div>
                    
                    </div>
                    <div className=' text-black flex items-center justify-center  px-4 w-full '>
                    
                    <div className="flex-col    w-[400px] space-x-1 mb-4">
        
         {/* Star Rating Display */}
      <div className="flex items-center space-x-1 mb-4">
        {[...Array(5)].map((_, index) => (
          <Star key={index} className="w-5 h-5 text-green-400 fill-green-400" />
        ))}
        <span className="text-white ml-2">{totalRatings > 0 ? (totalRatings / 5).toFixed(1) : "No Ratings"}</span>
      </div>

      {totalRatings === 0 ? (
        <p className="text-gray-500">No ratings ye</p>
      ) : (
        Object.entries(ratings)
          .reverse()
          .map(([star, count]) => (
            <div key={star} className="flex items-center space-x-2 mb-2">
              <span className="text-sm w-6 text-white font-medium">{star}★</span>
              <div className="flex-1 bg-white border border-green-500 h-4 rounded-md overflow-hidden">
                <div
                  className="bg-gradient-to-tr from-green-800 to-gray-600 h-full"
                  style={{ width: `${(count / totalRatings) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm w-6 text-white">{count}</span>
            </div>  
          ))
      )}
    
      </div>


                    </div>
    



                   






                </div>
                <div  className=' flex flex-col items-center md:w-1/2 justify-center ' >


                <div className=' text-black flex flex-col mt-4 items-center justify-center  px-4 w-full '>
                    <h1 className=' text-white text-3xl font-serif ' >Reviews</h1>
                    <div className="flex-col    w-[300px]  md:w-[400px] items-center justify-center space-y-2 mb-4">
                    <div className=' rounded flex border-1 p-2 border-gray-300 h-15 ' >
                      <div className='h-10 rounded-full bg-white w-10' >
                      <img src="./banner.png " alt=""  className='' />
                      </div>
                      <div>
                        <div className='px-2' >
                      <h1 className='text-gray-300 md:text-2xl ' >manoj</h1>
                       <p className='text-white text-xs '>its very late</p>
                       </div>
                       </div>
                    </div>

                    <div className=' rounded flex border-1 p-2 border-gray-300 h-15 ' >
                      <div className='h-10 rounded-full bg-white w-10' >
                      <img src="./banner.png " alt=""  className='' />
                      </div>
                      <div>
                        <div className='px-2' >
                        <h1 className='text-gray-300 md:text-2xl ' >zuabir</h1>
                        <p className='text-white text-xs '>its a nice driving</p>
                       </div>
                       </div>
                    </div>
                    

      
    
                  </div>


                    </div>




                <div  className=' p-2 md:p-5  w-full   h-[400px]  md:h-[300px]' >
                  <div className='bg-gradient-to-r from-green-800 to-gray-800 rounded w-full h-full border ' >
                    <div className='w-full h-1/3  flex items-center justify-center  '  >
                    <div>
                    <span className='font-semibold  text-white pb-2 px-4 md:text-sm text-sm relative flex  sm:flex-row items-center gap-x-6 after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full  after:h-[2px] after:bg-slate-300  after:animate-[underline_3.5s_infinite]'>
                     <span>{rideDetails?.origin?.name || 'Origin'}</span>
                   <span className=" sm:inline">→</span> 
   
                    <span>{rideDetails?.destination?.name || 'Destination'}</span>
                    </span>
                    </div>
                    </div> 
                    <div className='w-full h-0/3 mt-2 flex items-center justify-center  ' >
                    <div className='  bg-yellow-400 flex  w-32 h-14 rounded ' >
                      <div className=' w-1/2 h-14   ' >
                      <div  className=' text-white p-2 ' >
                       <h1>Auto</h1>
                        <p>{rideDetails?.fare || '100'}</p>
                        </div>
                      </div>
                      <div className='w-1/2  h-14 p-2 ' >
                      <img
        src={banner}
        alt='Profile'
        className='  '
      />
                      </div>


                    </div>
                    </div>
                    <div  className='w-full h-1/3  flex items-center justify-center ' >
                     <button   className=' text-white bg-gradient-to-t bg-green-600 to-gray-900  border border-white rounded  w-72 md:w-80 p-2  ' onClick={handleRequestRide} >
                       Request Now
                       
                     </button>
                     <RideRequestModal
  isOpen={modalOpen}
  onClose={() => {
    setModalOpen(false);
    setNoDriver(false); // reset state when closing
  }}
  noDriver={noDriver}
/>
                    </div>
                  </div>
                </div>
                </div>
            </div>
          
        </div>
       
    </div>
    

    </div>
  )
}

export default BookingDetials
