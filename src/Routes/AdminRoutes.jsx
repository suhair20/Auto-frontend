import React from 'react'
import { Route } from 'react-router-dom'
import LoginAdmin from '../Components/Admin/LoginAdmin'
import AdminHome from '../Components/Admin/AdminHome'
import User from '../Components/Admin/User'
import Driver from '../Components/Admin/Driver'
import Driverdetials from '../Components/Admin/Driverdetials'

const AdminRoutes=(

    <>
    <Route  path='/admin' element={<LoginAdmin/>} />
    <Route path='/adminhome' element={<AdminHome/>}  />
    <Route path='/user' element={<User/>}  />
    <Route path='/driverlisting' element={<Driver/>} />
    <Route path='/driverdetials' element={<Driverdetials/>} />
  </>
) 
  
   
  


export default AdminRoutes
