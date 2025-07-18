import React from 'react'
import Navbar from './components/navbar/Navbar'
import {Route, Routes } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Home from './pages/Home/Home.jsx'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup.jsx'
import Verify from './pages/verify/verify.jsx'
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import MyOrders from './pages/MyOrders/MyOrders.jsx'

const App = () => {

  const [showLogin , setShowLogin] = useState(false);
  return (
    <>
    {showLogin ? <LoginPopup setShowLogin= {setShowLogin}/>:<></>}
      <div className = 'app'>
      <ToastContainer/>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/cart' element = {<Cart/>}/>
        <Route path = '/order' element = {<PlaceOrder/>}/>
        <Route path = '/verify' element = {<Verify/>}/>
        <Route path = '/myorders' element = {<MyOrders/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
    
  )
}

export default App
