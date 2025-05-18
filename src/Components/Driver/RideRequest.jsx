import React, { useEffect, useState } from 'react';

const RideRequestModal = ( {isOpen, onAccept, onReject, rideDetails} ) => {

  const [secondleft,setSecondleft]=useState(20)
 

useEffect(()=>{
  if(isOpen){
    
    setSecondleft(20)

    const contdown=setInterval(()=>{
      setSecondleft((prev)=>{
        if(prev<=1){
          onReject()
          clearInterval(contdown)
          return 0
        }
        return prev-1
      })
    },1000)
    return () => clearInterval(contdown);
  }
},[isOpen,onclose]);
  



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
        <h2 className="text-red-700 text-xl font-semibold text-center mb-4">New Ride Request</h2>

        <div className="space-y-4">
          <div className="flex items-center">
            <span className="text-green-700 text-2xl">🧍‍♂️</span>
            <span className="ml-2">➡️ {rideDetails?.origin?.name || 'Origin'}</span>
          </div>
          <div className="flex items-center">
            <span className="text-purple-700 text-2xl">📍</span>
            <span className="ml-2">➡️ {rideDetails?.destination?.name || 'Destination'}</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-700 text-2xl">$</span>
            <span className="ml-2">➡️ {rideDetails.fare}</span>
          </div>
          <div className="flex items-center">
            <span className="text-red-500 text-2xl">📌</span>
            <span className="ml-2">Distance ➡️ {rideDetails.distanceKm}</span>
          </div>
          <div className="flex items-center">
            <span className="text-black text-2xl">🕒</span>
            <span className="ml-2">➡️ {rideDetails.durationMinutes}</span>
          </div>
          <p className="mt-2 text-red-600">Auto-rejecting in {secondleft}s</p>
          {/* Dummy map image */}
          

          <div className="text-center font-semibold text-lg mt-2">John Doe</div>

          <div className="flex justify-between mt-4">
            <button
              onClick={onReject}
              className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Reject Ride
            </button>
            <button
              onClick={onAccept}
              className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Accept Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideRequestModal;
