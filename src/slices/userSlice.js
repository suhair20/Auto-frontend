import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Feedback from 'react-bootstrap/esm/Feedback';



// const baseQuery=fetchBaseQuery({baseUrl:"https://auto-backend-jq5w.onrender.com",
// credentials:"include"})
const baseQuery=fetchBaseQuery({baseUrl:"http://localhost:5000",
  credentials:"include"
})
const Users_URL='/user'
export const userSlice=createApi({
    reducerPath:"userApi",
    baseQuery,
    endpoints:(builder)=>({
      signup:builder.mutation({
        query:(data)=>({
        url:'/user/register',
        method:'POST',  
        body:data
        
        })
      }),
     otp:builder.mutation({
      query:(data)=>({
        url:'/user/verify-otp',
        method:'POST',
        body:data
      })
      }),


     resendotp:builder.mutation({
      query:(data)=>({
        url:'/user/resend-otp',
        method:'POST',
        body:data
      })
     }) ,
     login:builder.mutation({
      query:(data)=>({
        url:'/user/login',
        method:'POST',
        body:data
      })
     }),
     UsercheckAuth:builder.query({
      query:()=>({
      url:'/user/checkAuth',
      method:'GET',
     
      })
     }),
     UserLogot:builder.mutation({
      query:()=>({
        url:'/user/logout',
        method:'POST'
      })
     }),
     CreateOrder:builder.mutation({
      query:(orderdata)=>({
        url:'/user/createOrder',
        method:'POST',
        body:orderdata
      })
     }),
     verifypayment:builder.mutation({
      query:(data)=>({
        url:'/user/verifypayment',
        method:'POST',
        body:data
      })
     }),
     Ridehistory:builder.query({
      query:()=>({
       url:'/user/ridehistory',
       method:'GET'
     })
     }),

     trackingdeatials:builder.query({
     query:(rideId)=>({
      url:`user/trackingdeatials?rideId=${rideId}`,
      method:'GET',
      
     })
     }),
     

finalverifypayment:builder.mutation({
  query:(data)=>({
    url:'/user/finalverifypayment',
    method:'POST',
    body:data
  })
}),

feedback:builder.mutation({
  query:(data)=>({
    url:'/user/feedback',
    method:'POST',
    body:data
  })
})





   }),
  
  
   
})

export const {useSignupMutation,
              useOtpMutation,
              useResendotpMutation,
              useLoginMutation,
              useUsercheckAuthQuery,
              useUserLogotMutation,
              useCreateOrderMutation,
              useVerifypaymentMutation,
              useRidehistoryQuery,
              useTrackingdeatialsQuery,
            useFinalverifypaymentMutation,
            useFeedbackMutation
            
            }=userSlice

