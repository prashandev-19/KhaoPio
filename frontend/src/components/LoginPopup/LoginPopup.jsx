import React, { useContext } from 'react'
import './LoginPopup.css'
import { useState } from 'react'
import { assets } from '../../assets/assets'
import axios from "axios"
import { StoreContext } from '../../context/StoreContext'
import { toast } from "react-toastify"

const LoginPopup = ({setShowLogin}) => {

    const {setToken} = useContext(StoreContext);
    const [currState , setCurrState] = useState("Sign Up")
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (event)=>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}));
    }

    const onLogin = async (event) => {
      event.preventDefault();
      let newUrl = `${import.meta.env.VITE_APP_URL}`;
      if (currState === 'Login') {
        newUrl +="/api/user/login";

      }
      else{
        newUrl +="/api/user/register"
      }

     try {
    const response = await axios.post(newUrl, data);

    if (response.data.success) {
        setToken(response.data.data);
        localStorage.setItem("token", response.data.data);
        toast.success(response.data.message);
        setShowLogin(false);
        
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Login/Register error:", error);
        const errMsg = error?.response?.data?.message || "Something went wrong";
        toast.error(errMsg);
      }
    }
    
  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() =>setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-inputs">
            {currState === "Login" ? <></> : <input name ='name' onChange={onChangeHandler}
            value = {data.name} type="text" placeholder = 'your name' required />}
            <input name="email" onChange = {onChangeHandler} 
            value={data.email}type="text" placeholder = 'enter email' required />
            <input name="password" onChange = {onChangeHandler}
            value = {data.password} type="password" placeholder = 'password' required />
        </div>
        <button type='submit'> {currState === "Sign Up"? "Create account" : "Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing , i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login"
        ? <p>Create a new account ? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
        :<p>Already have an account ? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup
