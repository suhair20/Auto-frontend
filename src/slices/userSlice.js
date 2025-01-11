import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



const baseQuery=fetchBaseQuery({baseUrl:"http://localhost:5000"})
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
     })
   }),
  
  
   
})

export const {useSignupMutation,useOtpMutation,useResendotpMutation,useLoginMutation}=userSlice

