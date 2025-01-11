import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery=fetchBaseQuery({baseUrl:"http://localhost:5000"})


export const driverSlice=createApi({
    reducerPath:"driverApi",
    baseQuery,
    endpoints:(builder)=>({
        signup:builder.mutation({
            query:(formData)=>({
              url:'/driver/Register',
              method:'POST',
              body:formData  
            })
        }),
       otp:builder.mutation({
        query: (data)=>({
            url:'/driver/verifyotp',
            method:'POST',
            body:data
        })
       }) ,
       resendotp:builder.mutation({
        query:(data)=>({
            url:'/driver/resendotp',
            method:'POST',
            body:data
        })
       }),
       verification:builder.mutation({
        query:(data)=>({
            url:'/driver/verification',
            method:'POST',
            body:data
        })
       })
    })
})

export const {useSignupMutation,useOtpMutation,useResendotpMutation,useVerificationMutation}=driverSlice