import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AdminRoutes from './Routes/AdminRoutes';
import './index.css'; // this file must now exist in src/

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
