// App.jsx
import React from 'react';
import Header from './Components/User/Header';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import store from './slices/Store';
import { Provider } from 'react-redux';
import Modal from 'react-modal';
Modal.setAppElement('#root'); 

const App = () => (
  <>
  <Provider  store={store} >
    
    <div className=" ">
      <Outlet />
    </div>
    </Provider>
  </>
);

export default App;

