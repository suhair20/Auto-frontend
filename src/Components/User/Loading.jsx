import React from 'react';
import './Loading.css'; 


const Loading = () => (
  <div className="loading-overlay  bg-gradient-to-b from-green-600 to-gray-900 bg-navbar-color">
    <div className="auto-container">
      <img src="./banner.png" alt="Auto Rickshaw" className="auto-rickshaw" />
      
    </div>
   
  </div>
);

export default Loading;


