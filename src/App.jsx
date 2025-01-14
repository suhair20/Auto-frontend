import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import Modal from 'react-modal';
import Loading from './Components/User/Loading'; // Import the Loading component
import store from './slices/Store';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

Modal.setAppElement('#root');

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (e.g., waiting for initial data or assets)
    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <Provider store={store}>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </Provider>
  );
};

export default App;

