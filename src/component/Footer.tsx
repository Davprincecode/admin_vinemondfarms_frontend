import { NavLink } from "react-router-dom";
import whiteLogo from "../assets/images/logo-scroll.png";
import { TiSocialFacebook } from "react-icons/ti";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import ButtonPreloader from "./ButtonPreloader";
import { useState } from "react";
import { toast } from "react-toastify";
import { userAuth } from "../pages/context/AuthContext";



function Footer() {

  const[waitEmail, setWaitEmail] = useState<string>('');
  const[loading, setLoading] = useState<boolean>(false);
  const{baseUrl} = userAuth();

  const handleWait = async() =>{
   setLoading(true)
   if(waitEmail == ''){
    toast.error('fill email')
    return;
   }
    const raw = {
      "email" : waitEmail
    };
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(raw),
    };
  
    try {
      const response = await fetch(`${baseUrl}/news-letter`, requestOptions);     
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      const result = await response.json();
      setWaitEmail('');
      toast.success("Subscription Successful")
      setLoading(false);

    } catch (error) {
      setLoading(false);
      if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred.');
      }
    }
  

  }


  return (
    <div className="footer">
     <div className="footerLogo">
        <img src={whiteLogo}  />
     </div>

     <div className="footerCon flex-center">
      <div className="footerItem flex-center">
         <div className="item"> <NavLink to='#'> Home </NavLink> </div>
         <div className="item"> <NavLink to='#'> About Us </NavLink> </div>
         <div className="item"> <NavLink to='#'> Shop </NavLink> </div>
         <div className="item"> <NavLink to='#'> Portfolio </NavLink> </div>
         <div className="item"> <NavLink to='#'> Consultation </NavLink> </div>
         <div className="item"> <NavLink to='#'> blog </NavLink> </div>
         <div className="item"> <NavLink to='#'> Contact us </NavLink> </div>
      </div>

      <div className="footerNewsList footerNews">
        <p>Join our newsletter</p>
        <div className="footerInput flex-center">
          <input type="email" placeholder="Enter your email" value={waitEmail} onChange={(e) => setWaitEmail(e.target.value)}/>
          {
            loading ? (
              <div className="footerBtn">
                <ButtonPreloader/>
              </div>
            ) : (
            <div className="footerBtn" onClick={handleWait}>
                subscribe
            </div>
            )
          }
          
        </div>
      </div>

     </div>

     {/* ------------------ */}
<div className="footerNewsList footerNewsMobile">
        <p>Join our newsletter</p>
        <div className="footerInput flex-center">
          <input type="email" placeholder="Enter your email" value={waitEmail} onChange={(e) => setWaitEmail(e.target.value)}/>
          {
            loading ? (
              <div className="footerBtn">
                <ButtonPreloader/>
              </div>
            ) : (
            <div className="footerBtn" onClick={handleWait}>
                subscribe
            </div>
            )
          }
        </div>
      </div>
     {/* ------------------ */}

     <div className="footerBottom flex-center">
      <div className="copyright">
          © Loveafrik, All Right Reserved 2025.
      </div>
      <div className="terms flex-center gap-20">
        <div><NavLink to="#">terms</NavLink></div>
        <div><NavLink to="#">privacy</NavLink></div>
        <div><NavLink to="#">cookies</NavLink></div>
      </div>
     </div>

     <div className="copyright" style={{marginTop : "10px"}}>
      {/* © Design: gazadanladi.corp@gmail.com */}

      {/* <div className="flex-center">
        <div className="social-round">

        </div>
      </div> */}

      <div className="socialMedia flex-center gap-20">
                                  <div className="social">
                                      <a href=""><FaFacebookF /></a>
                                  </div>
                                  <div className="social">
                                      <a href="" className='insta'><FaInstagram /></a>
                                  </div>
                                  <div className="social">
                                      <a href=""><FaLinkedin /></a>
                                  </div>
          </div>

     </div>

    </div>
  )
}

export default Footer
