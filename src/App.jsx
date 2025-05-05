// import React, { useState, useEffect } from 'react';
// import { Outlet } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import Modal from 'react-modal';
// import Loading from './Components/User/Loading'; // Import the Loading component
// import store from './slices/Store';
// import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

// Modal.setAppElement('#root');

// const App = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading time (e.g., waiting for initial data or assets)
//     const timer = setTimeout(() => setIsLoading(false), 2000);

//     return () => clearTimeout(timer); // Cleanup timer
//   }, []);

//   return (
//     <Provider store={store}>
//       {isLoading ? (
//         <Loading />
//       ) : (
//         <div>
//           <Outlet />
//         </div>
//       )}
//     </Provider>
//   );
// };

// export default App;

import React, { useEffect, useState } from 'react';
import { Outlet,useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Loading from './Components/User/Loading'; // Import Loading component
import { useUsercheckAuthQuery } from './slices/userSlice';
import { useDrivercheckAuthQuery } from './slices/driverSlice';
import { useDispatch } from "react-redux";
import { setauthenticated } from './slices/Auth.slice';
 import './index.css';
 import 'bootstrap/dist/css/bootstrap.min.css';
import { setdriverAuthenticated } from './slices/driverAuthSlice';

Modal.setAppElement('#root');

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { data: userData, isLoading: userLoading } = useUsercheckAuthQuery();
  const { data: driverData, isLoading: driverLoading } = useDrivercheckAuthQuery();
   const navigate=useNavigate()

  
  
  useEffect(() => {

    if (userLoading || driverLoading) {
     
      return;
    }
    if (userData?.success) {
      console.log("success");
      
      console.log("User Authenticated:", userData);
      dispatch(setauthenticated(userData.user)); // ✅ Store user data
    } else if (driverData?.success) {
      console.log("Driver Authenticated:", driverData);
      dispatch(setdriverAuthenticated(driverData.driver)); // ✅ Store driver data
    } else {
      console.log("naviii");
      
      navigate('/'); // Redirect to home if neither is authenticated
    }
   
   
    
  }, [userData,driverData,userLoading ,driverLoading, dispatch,navigate]); 

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <Loading /> : <Outlet />;
};

export default App;
