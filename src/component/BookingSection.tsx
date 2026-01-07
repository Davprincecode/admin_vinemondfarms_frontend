import React, { useState } from 'react'
import bookingText from '../assets/images/booktexture.png'
import consultingImg from '../assets/images/consultimg.jpg'
import { NavLink } from 'react-router-dom'
import ComingSoon from './ComingSoon';

function BookingSection() {
     const [popAction, setPopAction] = useState<boolean>(false);
  return (
    <div className='bookingSection'>
       
        <div className="leftBooking" style={{backgroundImage :  `url(${bookingText})`}}>
            <div className="bookingHeader">
                <h1> <span className='bookSpace'>Book a</span>  <br /> Consultation</h1>
                <div className="schedule">
                  <NavLink to="/consultant">schedule now</NavLink>  
                </div>
            </div>
            <div className="bookingBody">
              <h4>Transform Your Style with Expert Guidance</h4>
                <p>
                  Book a personalized consultation and get tailored advice on fashion,
                  lifestyle, and image enhancement. Whether you need a wardrobe revamp, 
                  personal styling tips, or a complete image makeover, 
                  we’ll help you define a look that reflects confidence,
                  sophistication, and your unique personality. 
                </p>
            </div>
        </div>
        <div className="rightBooking">
            <img src={consultingImg} />
        </div>
    </div>
  )
}

export default BookingSection