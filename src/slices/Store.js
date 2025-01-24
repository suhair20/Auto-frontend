import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { driverSlice } from "./driverSlice";
import AuthReducer from './Auth.slice'

const rootReducer=combineReducers({
    [userSlice.reducerPath]:userSlice.reducer,
    [driverSlice.reducerPath]:driverSlice.reducer,
    auth:AuthReducer
})

const store =configureStore({
   
    reducer:rootReducer,
    middleware:(getDefaultMidleware)=>
        getDefaultMidleware().concat(
            userSlice.middleware, 
            driverSlice.middleware
        )
})


export default store