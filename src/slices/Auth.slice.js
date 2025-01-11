import { createSlice } from "@reduxjs/toolkit";


const initialState={
  userToken:localStorage.getItem('userToken')? JSON.parse(localStorage.getItem('userToken')):null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
           state.userToken=action.payload;
           localStorage.setItem('userToken',JSON.stringify(action.payload))

        },
        logout:(state,action)=>{
            state.userToken=null
            localStorage.removeItem('userToken')
        }
    }
})

export const {setCredentials,logout}=authSlice.actions
export default authSlice.reducer