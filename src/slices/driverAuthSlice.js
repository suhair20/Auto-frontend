import { createSlice } from "@reduxjs/toolkit";




const driverAuthSlice=createSlice({
    name:'driverAuth',
    initialState:{
        isAuthenticated:false,user:null
    },
    reducers:{
        setdriverAuthenticated:(state,action)=>{
         state.isAuthenticated=true;
         state.user=action.payload
        },
        driverlogout:(state)=>{
          state.isAuthenticated=false
          state.user=null
        }
    }
})

export const {setdriverAuthenticated ,driverlogout}=driverAuthSlice.actions
export default driverAuthSlice.reducer