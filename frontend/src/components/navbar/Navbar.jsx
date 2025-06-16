
import './Navbar.css'
import { assets } from "../../assets/assets";
import { useState } from 'react';



const Navbar = () => {

  const [menu , setMenu] = useState("home");

  return (
    <div className = 'navbar'>
      <img src={assets.logo2} alt="logo" className="logo" width={160} height={40}/>
      <ul className = "navbar-menu">
        <li onClick ={()=>setMenu("home")}className={menu === "home" ? "active":""}>home</li>
        <li onClick ={()=>setMenu("menu")}className={menu === "menu" ?"active":""}>menu</li>
        <li onClick ={()=>setMenu("mobile-app")}className={menu === "mobile-app"?"active":""}>mobile-app</li>
        <li onClick ={()=>setMenu("contact-us")}className={menu === "contact-us"?"active":""}>contact us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search icon" />
        <div className="navbar-search-icon">
            <img src={assets.basket_icon} alt="basket-icon" />
            <div className="dot"></div>
        </div>
        <button>sign in</button>
      </div>
    </div>
  )
}

export default Navbar
