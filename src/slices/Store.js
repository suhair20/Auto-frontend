import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { driverSlice } from "./driverSlice";
import AuthReducer from './Auth.slice'
import driverAuthSlice from './driverAuthSlice'
const rootReducer=combineReducers({
    [userSlice.reducerPath]:userSlice.reducer,
    [driverSlice.reducerPath]:driverSlice.reducer,
    auth:AuthReducer,
    driverAuth: driverAuthSlice,
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