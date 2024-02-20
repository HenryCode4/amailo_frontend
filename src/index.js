import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartProvider from './hooks/useCart';
import './axiosConfig';
import { AuthProvider } from './hooks/useAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { LoadingProvider } from './hooks/useLoading';
import './interceptors/authInterceptor';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <LoadingProvider>
      <AuthProvider>
      <CartProvider>
      <Routes>
          <Route path="/*" element={<App />} /> 
      </Routes>
      <ToastContainer
      position='bottom-right'
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='light'
      />
    </CartProvider>
    </AuthProvider>
    </LoadingProvider>
    
    </BrowserRouter>
  </React.StrictMode>
);

