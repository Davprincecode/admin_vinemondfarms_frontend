import React, { useEffect } from 'react'
import service1 from '../assets/images/service1.png';
import service2 from '../assets/images/service2.png';
import service3 from '../assets/images/service3.png';
import service4 from '../assets/images/service4.png';
import service5 from '../assets/images/service5.png';

import serviceDesk from '../assets/images/serviceDesk.png';

import Header from '../component/Header'
import service from '../assets/images/ourservices.png'
import Footer from '../component/Footer'
import { FaArrowLeft } from 'react-icons/fa'
import { NavLink, useLocation } from 'react-router-dom';

function OurServices() {
  const { pathname } = useLocation();
  
  useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    
  return (
   <div className='ourServices pageNav'>
       <Header />

       <div className="ourServicesCon">
       

          <div className="ourServicesHeader" style={{backgroundImage : `url(${service})`}}>
            <NavLink to="#" className="backCon">
                <FaArrowLeft />
                <p>back</p>
            </NavLink >

            <div className="ourServiceHeaderCon">
                <div className="ourServiceHeader">
                <h1>Our Services</h1> 
                <div className="dotLineServices"></div>
                </div>

                <div className="ourServiceHeaderDetails">
                     <p>
                     Explore tailored solutions crafted to elevate your style, image, and lifestyle. <span className="desktop-break"></span>
                     Our services are designed to meet your unique needs with precision and creativity.
                    </p> 
                </div>

            </div>

          </div>



        <div className="ourServicesContainer flex gap-10">

              <div className="ourServicesItem">
                  <div className="ourServicesImg">
                    <img src={service1} alt="" />
                  </div>
                  <div className="ourServicesTitle">
                    color & style consultation
                  </div>
                  <div className="ourServicesDetails">
                    <p>
                        Unlock the power of colour and silhouette. We help you discover the tones, textures, and style elements that complement your personality, body type, and goals, creating a wardrobe that feels as good as it looks.
                        We also provide expert guidance on pairing and layering, so every outfit feels intentional and stylish. By the end of the session, you’ll have a clear roadmap to confidently build a wardrobe that enhances your presence in every setting.
                    </p>
                  </div>
              </div>

              <div className="ourServicesItem mobileSecondContainer">
                  <div className="ourServicesImg">
                    <img src={service2} alt="" />
                  </div>
                  <div className="ourServicesTitle">
                    personal styling
                  </div>
                  <div className="ourServicesDetails">
                    <p>
                        From everyday looks to standout moments, we curate intentional outfits that reflect who you are and where you’re headed, refined, confident, and effortlessly you.
                          Our approach considers your lifestyle, schedule, and personal preferences to make dressing up feel seamless. We ensure every piece works together, giving you a versatile and polished wardrobe for any occasion.
                    </p>
                  </div>
              </div>

              <div className="ourServicesItem sercontainer2">
                  <div className="ourServicesImg">
                    <img src={service3} alt="" />
                  </div>
                  <div className="ourServicesTitle">
                    wardrobe management
                  </div>
                    <div className="ourServicesDetails">
                    <p>
                        Simplify your style, elevate your closet. We organize, edit, and refresh your wardrobe, ensuring it’s cohesive, functional, and aligned with your lifestyle and image goals. We help you identify gaps, suggest key investment pieces, and remove what no longer serves your image. The result is a streamlined, easy-to-navigate wardrobe that saves time and keeps you looking sharp every day.
                    </p>
                  </div>
              </div>

            
              <div className="ourServicesItem sercontainer2 mobileSecondContainer">
                  <div className="ourServicesImg">
                    <img src={service4} alt="" />
                  </div>
                  <div className="ourServicesTitle">
                    Fashion Styling for 
                      Shoots, AD’s, Movies.
                  </div>
                    <div className="ourServicesDetails">
                    <p>
                        We bring visual stories to life through fashion. From screen to print, we style for impact, curating looks that align seamlessly with creative direction, brand messaging, and production needs. Our process involves researching trends, sourcing the right pieces, and collaborating closely with creative teams for flawless execution. Every outfit is chosen to evoke emotion, strengthen storytelling, and leave a lasting impression on your audience.
                    </p>
                  </div>
              </div>

              <div className="ourServicesItem">
                  <div className="ourServicesImg">
                    <img src={service5} alt="" />
                  </div>
                  <div className="ourServicesTitle">
                    WORKSHOPS & MASTERCLASSES
                  </div>
                    <div className="ourServicesDetails">
                    <p>
                        Style is a skill and we teach it well. Our tailored sessions equip individuals, aspiring stylists, and corporate teams with the tools to master image, presence, and personal branding with lasting impact. Each class blends practical styling techniques with insider industry knowledge, ensuring immediate application. Participants leave not just informed but inspired, with actionable strategies to elevate their personal or professional image.
                    </p>
                  </div>
              </div>
              
            

        </div>

       </div>

       <Footer />
    </div>
  )
}

export default OurServices