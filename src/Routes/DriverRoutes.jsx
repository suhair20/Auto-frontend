import React from "react";
import { Route } from "react-router-dom";
import HomeScreen from "../Components/Driver/HomeScreen";
import Signup from "../Components/Driver/Signup";
import Login from "../Components/Driver/Login"
import Verification from "../Components/Driver/Verification";
import Dashboard from "../Components/Driver/Dashboard";
import RideHistory from "../Components/Driver/RideHistory";
import RidePayements from "../Components/Driver/RidePayements";
import Profile from "../Components/Driver/Profile";
import Trackingscreen from "../Components/Driver/Trackingscreen";

const DriverRoutes=(
    <>
    <Route path="/driver" element={<HomeScreen/>}/>
    <Route path="/driverSignup" element={<Signup />}/>
    <Route path="/driverLogin" element={<Login/>}/>
    <Route path="/verification" element={<Verification/>}/>
    <Route  path="/dashboard" element={< Dashboard/>} />
    <Route  path="/driver/ridehistory/:driveId" element={<RideHistory />} />
    <Route  path="/ridepayements" element={<RidePayements />} />
    <Route  path="/driver/profile"  element={<Profile/>} />
    <Route path="/driver/tracking/:rideId"  element={<Trackingscreen/>} />
    </>
)

export default DriverRoutes