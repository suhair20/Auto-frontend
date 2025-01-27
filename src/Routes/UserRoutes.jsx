import React from "react";
import { Route } from "react-router-dom";
import HomeScreen from "../Components/User/HomeScreen";
import Signup from "../Components/User/Signup";
import Login from "../Components/User/Login";
import BookingScreen from "../Components/User/BookingScreen";
import Profile from "../Components/User/Profile";

const UserRoutes=(
    <>
    <Route path="/" element={<HomeScreen/>}/>
    <Route path="/signup" element={<Signup/>}  />
    <Route path="/login"   element={<Login/>} />
    <Route path="/booking" element={<BookingScreen/>}  />
    <Route path="/profile" element={<Profile/>} />

   
    </>
)

export default UserRoutes