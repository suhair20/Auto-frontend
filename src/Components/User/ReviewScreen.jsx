import React from 'react'
import { useState } from 'react';
import { CheckCircle } from 'lucide-react'
import {  useParams,useNavigate } from "react-router-dom";
import { Star } from 'lucide-react';
import { useFeedbackMutation } from '../../slices/userSlice';

function ReviewScreen() {
     const { rideId } = useParams();
     const Navigate=useNavigate()
    const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
const [feedback]=useFeedbackMutation()

  const handlesubmit= async()=>{
   
      
   
    if(!rating&&!comment.trim()){
         alert("Please provide a rating and a comment.");   
           return;
    }

     {


        
    const response = await feedback({
        rideId: rideId, // Pass this if available
        rating,
        comment,
    })

    const result = await response.json();

    if (result.success) {
      alert("Thank you for your feedback!");
      Navigate('/')
      
      // Optionally reset form or navigate
    } else {
      alert("Something went wrong. Please try again.");
    }
  
  }
}

   const feedbackOptions = [
    'Very Professional',
    'Active on Time',
    'Safe and smooth driving',
    'Polite driver',
  ];
  return (
    <div>
      <div className=' items-center  justify-center text-center font-serif md:h-64 h-48 text-white bg-gradient-to-tr  from-gray-800 via-green-700 to-gray-800 ' >
         <div className=' h-1/3 items-center  flex justify-center  '><h1  >Payment Successful</h1></div>
       <div className="flex  h-1/3 items-center justify-center ">
  <CheckCircle className="w-20 h-20 text-green-300" />
</div>
        <div className=' items-center flex h-1/3 justify-center ' ><p>"Feel free to contact us anytime for your next ride "</p></div>
      </div>


<div>
     <div className="max-w-md mx-auto mt-10 text-center font-sans">
      <h2 className="text-xl font-semibold mb-4">Your Opinion Matters! Rate your Driver</h2>

      {/* Star Rating */}
      <div className="flex justify-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
            className={`h-8 w-8 cursor-pointer ${
              (hover || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill={(hover || rating) >= star ? 'currentColor' : 'none'}
          />
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-4">Leave feedback</p>

      {/* Feedback Tags */}
      <div className="grid md:px-0 px-4 grid-cols-2 gap-3 mb-4">
        {feedbackOptions.map((option, idx) => (
          <button
            key={idx}
            className="bg-gray-200 hover:bg-gray-300 text-sm py-2 px-3 rounded"
          >
            {option}
          </button>
        ))}
      </div>

     
      <input
        type="text"
        placeholder="type your comment here"
        className="md:w-full w-72 border rounded p-2 mb-4 text-sm"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      
      <button 
      onClick={handlesubmit}
       className="md:w-full w-56 bg-gradient-to-br from-green-600 to-gray-800  text-white py-2 rounded hover:bg-indigo-800">
        Submit
      </button>
    </div>
</div>


    </div>
  )
}

export default ReviewScreen

