import React, { useContext, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import {useState} from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems} = useContext(StoreContext);

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({...data,[name]:value}))
  }

  const placeOrder = async(event)=>{
      event.preventDefault();
      let orderItems = [];
      food_list.map((item)=>{
        if(cartItems[item._id] > 0){
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id];
          orderItems.push(itemInfo);
        }
      })
      let orderData = {
        address:data,
        items:orderItems,
        amount:getTotalCartAmount() + 2,
      }

      let response = await axios.post(`${import.meta.env.VITE_APP_URL}/api/order/place`,orderData,{headers:{token}});
      if(response.data.success){
        const {session_url} = response.data.data;
        window.location.replace(session_url);
      }
      else{
        alert("Error");
      }
  }

  const navigate = useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/cart');
    }
    else if(getTotalCartAmount() === 0){
      navigate('/cart');
    }
  },[token])


  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name = 'firstName'required  onChange={onChangeHandler} value = {data.firstName} type="text" placeholder='first name' />
          <input name = 'lastName'required  onChange={onChangeHandler} value = {data.lastName} type="text" placeholder='last name'/>
        </div>
        <input name ='email' onChange={onChangeHandler} required value = {data.email} type="email" placeholder='enter email' />
        <input name = 'street' onChange={onChangeHandler}required  value={data.street} type="text" placeholder='street'/>
      <div className="multi-fields">
          <input name = 'city' onChange={onChangeHandler} required value = {data.city} type="text" placeholder='city' />
          <input name = 'state' onChange ={onChangeHandler} required value={data.state} type="text" placeholder='state'/>
        </div>
      <div className="multi-fields">
          <input name = 'zipcode' onChange={onChangeHandler} required value = {data.zipcode} type="text" placeholder='pincode' />
          <input name = 'country' onChange={onChangeHandler} required value = {data.country} type="text" placeholder='country'/>
        </div>
        <input name = 'phone' onChange={onChangeHandler} required value = {data.phone} type="text" placeholder='phone number' />
      </div>
      <div className="place-order-right">
         <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee:</p>
              <p>₹ {getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0 ? 0:getTotalCartAmount() + 2}</b>
            </div>
          </div>
           <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
