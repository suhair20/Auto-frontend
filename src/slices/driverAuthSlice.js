import { createSlice } from "@reduxjs/toolkit";




const driverAuthSlice=createSlice({
    name:'driverAuth',
    initialState:{
        isAuthenticated:false,
        user:null,
       isRideAccepted: false,
       rideId: null,
    },
    reducers:{
        setdriverAuthenticated:(state,action)=>{
         state.isAuthenticated=true;
         state.user=action.payload
        },
        driverlogout:(state)=>{
          state.isAuthenticated=false
          state.user=null
        },
        setIsRideAccepted:(state,action)=>{
            state.isRideAccepted=action.payload;
        },
        setRidId:(state,action)=>{
            state.rideId=action.payload

        },
        clearRideState:(state)=>{
             state.isRideAccepted = false;
      state.rideId = null;
        }
    }
})

export const {setdriverAuthenticated ,driverlogout,setIsRideAccepted,setRidId,clearRideState}=driverAuthSlice.actions
export default driverAuthSlice.reducer