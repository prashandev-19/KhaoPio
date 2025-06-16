import React from 'react'
import Navbar from './components/navbar/Navbar'
import {Route, Routes } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Cart from './pages/Cart/Cart.jsx'
import Home from './pages/Home/Home.jsx'
import Footer from './components/Footer/Footer'

const App = () => {
  return (
    <>
      <div className = 'app'>
      <Navbar/>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/cart' element = {<Cart/>}/>
        <Route path = '/order' element = {<PlaceOrder/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
    
  )
}

export default App
