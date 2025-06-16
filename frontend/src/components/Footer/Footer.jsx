import React from 'react'
import './Footer.css'
import {assets} from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo2} width={160} height={40} />
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus delectus libero molestias ullam eligendi nemo totam, pariatur laboriosam perspiciatis perferendis officia dolorem, architecto necessitatibus mollitia natus quas ab! Veritatis, officia.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>

            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+1-212-456-7890</li>
                    <li>contact@khaopio.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className = "footer-copyright">Copyright 2025 © KhaoPio.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer
