import React from 'react'
import service1 from '../assets/images/service1.png';
import service2 from '../assets/images/service2.png';
import service3 from '../assets/images/service3.png';
import service4 from '../assets/images/service4.png';
import service5 from '../assets/images/service5.png';
import { NavLink } from 'react-router-dom'

function Services() {
  return (
    <div className='services'>
        <div className="servicesHeader">
            <h1>services</h1>
        </div>
        <div className="servicesCon flex-center gap-20 justification-center">

              <div className="servicesItem">
                  <div className="servicesImg">
                   <img src={service1} alt="" />
                  </div>
                  <div className="servicesTitle">
                    color & style consultation
                  </div>
                  <div className="learnMore">
                    <NavLink to="/our-services">
                        learn more
                    </NavLink>
                    <span>...</span> 
                  </div>
              </div>
              <div className="servicesItem">
                  <div className="servicesImg" style={{width : "80px"}}>
                   <img src={service2} alt="" />
                  </div>
                  <div className="servicesTitle">
                    personal <br /> styling
                  </div>
                  <div className="learnMore">
                    <NavLink to="/our-services">
                        learn more
                    </NavLink>
                    <span>...</span> 
                  </div>
              </div>
              <div className="servicesItem">
                  <div className="servicesImg">
                   <img src={service3} alt="" />
                  </div>
                  <div className="servicesTitle">
                    wardrobe management
                  </div>
                  <div className="learnMore">
                    <NavLink to="/our-services">
                        learn more
                    </NavLink>
                    <span>...</span> 
                  </div>
              </div>
              <div className="servicesItem" >
                  <div className="servicesImg" style={{width : "70px"}}>
                   <img src={service4} alt="" />
                  </div>
                  <div className="servicesTitle">
                    Fashion Styling for 
                      Shoots, AD’s, Movies.
                  </div>
                  <div className="learnMore">
                    <NavLink to="/our-services">
                        learn more
                    </NavLink>
                    <span>...</span> 
                  </div>
              </div>
              <div className="servicesItem" >
                  <div className="servicesImg" style={{width : "80px"}}>
                   <img src={service5} alt="" />
                  </div>
                  <div className="servicesTitle">
                    Corporate Image Consulting
                  </div>
                  <div className="learnMore">
                    <NavLink to="/our-services">
                        learn more
                    </NavLink>
                    <span>...</span> 
                  </div>
              </div>

        </div>
    </div>
  )
}

export default Services