
import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Carousel } from 'react-responsive-carousel'
import Home from './Pages/Home'
import ScrollToTop from './components/ScrollToTop';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
// import AddProduct from './Pages/AddProduct'
import Footer from './components/Footer'
import Product from './Pages/Product'
import Collection from './Pages/Collection'
import About from './Pages/About'
import Contact from './Pages/Contact'
import CartComponent from './components/CartComponent'
import Login from './Pages/Login'
import Signin from './Pages/Signin'
import AdminLogin from './Pages/AdminLogin'
import AdminPanel from './Pages/AdminPanel'
import { useSelector } from 'react-redux'
import AddProduct from './Pages/AddProduct'
import Orders from './Pages/Orders'
import PlaceOrder from './Pages/PlaceOrder'
import ForgotPasswordPage from './Pages/ForgotPasswordPage'
import ResetPasswordPage from './Pages/ResetPasswordPage'
import { useGetMeQuery } from './services/createApi'
import { ToastContainer } from 'react-toastify'


function App() {
    const {data :userData,isSuccess,isError} =useGetMeQuery()
    const location = useLocation();
    const hideHeaderFooter = ['/AdminLogin', '/AdminPanel'].includes(location.pathname);
 const [showForm,setShowForm] =useState(false)
  return (
   
    <div className={` ${hideHeaderFooter ? 'p-0' : "px-5 sm:px-12  md:px-16 lg:px-28"}`}>
        <ScrollToTop />

        <ToastContainer position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick={true}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover={false}
                        theme="light"
                         />
    {!hideHeaderFooter && <Header showForm={showForm} setShowForm={setShowForm} />}
    <Routes>

       <Route path='/Collection' element={<Collection  showForm={showForm} setShowForm={setShowForm}/>}/>
    <Route path='/' element={
    <Home/>} />
    <Route path='/product/:productId' element={<Product/>}/>
 
    <Route path='About' element={<About/>}/>
    <Route path='/Contact' element={<Contact/>}/>
    <Route path='/Cart' element={<CartComponent/>}/> 
    {/* <Route path='/AddProduct' element={<AddProduct/>}/> */}
  {  isError &&  <Route path='/Login' element={<Login/>}/>}
  {  isError &&    <Route path='/Signin' element={<Signin/>}/>}
    
    <Route path='/AdminPanel' element={<AdminPanel/>}/>
    <Route path='/AdminPanel/add' element={<AddProduct/>}/>
    
    <Route path='/orders' element={<Orders/>}/>
    <Route path='/place-order' element={<PlaceOrder/>}/>

{  isError && <Route path="/forgot-password" element={<ForgotPasswordPage />} />}
  {  isError &&    <Route path="/reset-password/:token" element={<ResetPasswordPage />} />}
    </Routes>
    
   
  {!hideHeaderFooter &&<Footer/>} 
    </div>
  )
}

export default App
