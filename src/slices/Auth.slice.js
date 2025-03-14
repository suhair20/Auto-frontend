import { createSlice } from "@reduxjs/toolkit";


 

const authSlice=createSlice({
    name:'auth',
    initialState:{
        isAuthenticated:false,user:null
      },
    reducers:{
        setauthenticated:(state,action)=>{
           state.isAuthenticated=true
           state.user=action.payload

        },                                          
        logout:(state)=>{
            state.isAuthenticated=false;
            state.user=null
        }
    }
})

export const {setauthenticated,logout}=authSlice.actions
export default authSlice.reducer