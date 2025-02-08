

import React from 'react'
import Header from './Header'
import { useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import banner from '../../assets/public/images/banner.png';
import banner2 from '../../assets/public/images/banner2.jpg';

function BookingDetials({ ratings =  {
  1: 3,  
  2: 5,  
  3: 10, 
  4: 15, 
  5: 25  
}}) {
  const totalRatings = Object.values(ratings).reduce((sum, count) => sum + count, 0);
     const {driverId}=useParams()
  return (
    <div className='  naavabr   ' >
      <div className='   sm:ml-7 sm:w-11/12 md:px-4 z-10 lg:ml-16   md:w-11/12 md:py-6 items-center justify-center animate-slide-down  '  >
              <Header  />
     </div  >


    <div className=' md:px-32  pt-24 py-5 ' >
        <div className='  text-white   h-[800px] md:h-[600px] rounded' >
            {/* <h1>drivername:{driverId}</h1> */}
            <div className='main' >
                <div className='w-full md:h-[300px] h-[600px]  md:flex ' >
                    <div className='text-black md:flex  w-full' > 
                        <div className=' w-full px-4 flex items-center justify-center ' >
                          <img src={banner2}  alt='Profile'  className='h-32 mt-2 md:h-52 w-32 md:w-52 rounded-full border border-black'    />
                        </div>
                   
                        <div className='text-white p-5 items-center justify-center  flex w-full' >
                           <div className='w-full flex-col  items-center justify-center flex  ' >
                           
                             <span className=' font-passion text-3xl ' >{driverId} </span>
                             <p className=' font-passion text-3xl ' >Bajaj</p>
                             <p className='font-passion' >Experience : 5Year</p>
                             <div className=' w-full   flex flex-col items-center justify-center h-full' >
                                
                                     
                                     <div  className=' bg-green-400 w-32 h-6 ' >

                                     </div>

                                     <div  className=' text-white text-center bg-black w-32 h-8 ' >
                                      kl04536
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
                  className="bg-green-400 h-full"
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
                <div  className=' flex items-center justify-center ' >
                <div  className=' p-2 md:p-5  w-full md:w-3/6  h-[200px]  md:h-[300px]' >
                  <div className='navbar-color rounded w-full h-full border ' >
                    <div className='w-full h-1/3  flex items-center justify-center  '  >
                    <div>
                    <span className='font-semibold  text-white  md:text-lg text-sm relative flex  sm:flex-row items-center gap-x-2 after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white  after:animate-[underline_1.5s_infinite]'>
                     <span>Kozhikode</span>
                   <span className=" sm:inline">→</span> 
   
                    <span>Kasargod</span>
                    </span>
                    </div>
                    </div> 
                    <div className='w-full h-0/3  flex items-center justify-center  ' >
                    <div className='  bg-green-700 flex  w-32 h-14 rounded ' >
                      <div className=' w-1/2 h-14   ' >
                      <div  className=' text-white p-2 ' >
                       <h1>Auto</h1>
                        <p>₹100</p>
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
                     <button   className=' text-white hover:bg-green-500 navbar-color border border-white rounded  w-72 md:w-80 p-2 '  >
                       Request Now
                     </button>
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
