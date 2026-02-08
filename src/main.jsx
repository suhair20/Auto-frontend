import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // ✅ Import Redux Provider
import { RouterProvider } from 'react-router-dom';
import store from './slices/Store' // ✅ Import Redux store
import router from './Routes/Routes';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>  {/* ✅ Wrap everything inside Provider */}
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
