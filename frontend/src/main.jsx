import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Store from './app/Store.jsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <BrowserRouter> <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}> <App /></GoogleOAuthProvider></BrowserRouter></Provider>
  
)
