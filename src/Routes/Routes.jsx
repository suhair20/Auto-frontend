// routes.jsx
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from '../App'
import UserRoutes from './UserRoutes'
import DriverRoutes from './DriverRoutes';
import AdminRoutes from './AdminRoutes';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
       {AdminRoutes}
      {UserRoutes}
      {DriverRoutes}
     

    </Route>
  )
);

export default router;
