import { useEffect, useState } from 'react'
import logo from "../assets/images/logo.png";
import scrollLogo from "../assets/images/logo-scroll.png";
import { FaBars } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import { FaRegCircleUser } from 'react-icons/fa6';
import { IoIosArrowDown, IoMdNotificationsOutline } from 'react-icons/io';
import { BsCart2 } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import ComingSoon from './ComingSoon';
import { GoQuestion, GoSignIn } from 'react-icons/go';
import { PiSignInFill } from 'react-icons/pi';
import AuthComponent from './AuthComponent';
import { userAuth } from '../pages/context/AuthContext';
import ButtonPreloader from './ButtonPreloader';


function Header() {
const [navOpen, setNavOpen] = useState(false);
const [subNav, setSubNav] = useState<boolean>(false);
const [isScrolled, setIsScrolled] = useState(false);
const [popAction, setPopAction] = useState<boolean>(false);

const [authAction, setAuthAction] = useState<boolean>(false);
const [childNav, setChildNav] = useState<boolean>(false);

const {signin, logout, cart, notification,  adminLoading} = userAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
const navFunction = () =>{
    setNavOpen(!navOpen)
}

const navSub = () =>{
    setSubNav(!subNav)
}

 const childNavFunction = () => {
  setChildNav(!childNav);
 }
// onClick={() => setPopAction(!popAction)}

  return (
    <div>
      <ComingSoon popAction={popAction} setPopAction={setPopAction} />

              {/* <!-- ========nav section============== --> */}
            <div className={navOpen ? "sideNavOverall sideNavOverallChange":"sideNavOverall"}  onClick={navFunction}>
            </div>

          <div className={`navcontainer ${isScrolled ? 'scrolled' : ''}`} >
              <NavLink to="/">
              <div className="logocontainer logo">
                  <img src={logo} alt="" />
              </div>
              <div className="logocontainer scrollLogo">
                  <img src={scrollLogo} alt="" />
              </div>
              </NavLink>
              <div className="itemscontainer flex-center">
                  <ul className={navOpen ? "openNavBar" : "closeNavBar"}>
                       { signin && (<li className='auth-profile'> <NavLink to="/"> Profile </NavLink> </li>)}
                      <li> <NavLink to="/" className={({ isActive }) =>
    `${isActive ? 'active-top-nav' : ''}`
  }> Home </NavLink> </li>
                      <li><NavLink to="/about-us" className={({ isActive }) =>
    `${isActive ? 'active-top-nav' : ''}`
  }>about us</NavLink></li>
                      <li><NavLink to="/our-services" className={({ isActive }) =>
    `${isActive ? 'active-top-nav' : ''}`
  }>services</NavLink></li>
                      <li ><NavLink to="/product" className={({ isActive }) =>
    `${isActive ? 'active-top-nav' : ''}`
  }>shop</NavLink></li>
                      <li className='parent-nav' onClick={childNavFunction}>

       {/* className={`${childNav ? 'active-top-nav' : ''}`}                  */}

      <div >consultation <span><IoIosArrowDown className='userArrow' /></span></div> 
                          {
                            childNav && (
                              <ul className={`child-nav ${isScrolled ? 'scrolled' : ''}`}>
                                          <li><NavLink to="/consultant">book consultation</NavLink></li>
                                          <li><NavLink to="/master-course">courses/masterclasses</NavLink></li>
                              </ul> 
                            )
                          }
                       

                      </li>
                      <li >
                        <NavLink to="/our-blog" className={({ isActive }) =>
                      `${isActive ? 'active-top-nav' : ''}`
                      }>blog</NavLink>
                      </li>
                      <li>
                          <NavLink to="/contact-us" className={({ isActive }) =>
                          `${isActive ? 'active-top-nav' : ''}`
                          }>contact us</NavLink> 
                      </li>






                      { signin && ( <li className='auth-notification flex-center justification-center gap-10'><NavLink to="/contact-us">notification</NavLink> <IoMdNotificationsOutline /></li>)}

                     <div className="auth-mobile-con">

                       { signin ? (
                         
                          adminLoading ?  (
                              <li className='auth-mobile-con-sign-out flex-center justification-center gap-10'><GoSignIn />
                              <ButtonPreloader />
                              </li> 
                          ) : (
                             <li className='auth-mobile-con-sign-out flex-center justification-center gap-10' onClick={() => logout()}><GoSignIn />sign out</li> 
                          )
                      
                       ) : (
                        <li className="flex-center justification-center gap-10" onClick={() => setAuthAction(!authAction)}><PiSignInFill /> <NavLink to="#">log in</NavLink> </li>
                       )}
                       
                        <li className="flex-center justification-center gap-10"><GoQuestion /> <NavLink to="#">help</NavLink> </li>
                     </div>

                  </ul>
              </div>

              <div className="userControl flex-center">
                        
                        {
                          signin ? (
                              <div className="userDetails flex-center gap-20">

                                      <div className="cart">
                                        <NavLink to='/cart'>
                                        <FiShoppingCart />
                                        <div className="cartCount">
                                          { cart }
                                        </div>
                                        </NavLink>
                                      </div>

                                      <div className="flex-center gap-5 userIcon" onClick={navSub}>
                                          <FaRegCircleUser />
                                          <IoIosArrowDown className='userArrow' />
                                      </div>
                              </div>
                          ) : (
                              <div className="signin"  onClick={() => setAuthAction(!authAction)}>
                                  <NavLink to='#' className='flex-center gap-5'>
                                      <p>sign in</p>
                                      <IoIosArrowDown className='signinIcon'/>
                                  </NavLink>
                              </div>
                          )
                        }                    
          <div className="bar" onClick={navFunction}>
                  <FaBars />
              </div>
                  </div>
          </div>

      {
        subNav && signin && (
            <div className={`signin-container ${isScrolled ? 'scrolled' : ''}`}>
                          <div className="signin-item"><NavLink to="/profile">profile</NavLink></div>
                          <div className="signin-item sign-notification flex-center gap-10"><IoMdNotificationsOutline /><NavLink to="#">notifications</NavLink></div>

                          { 
                            adminLoading ? (
                                <div className="signin-item sign-out flex-center gap-10"><GoSignIn /><ButtonPreloader /></div>
                            ) : (
                               <div className="signin-item sign-out flex-center gap-10"  onClick={() => logout()}><GoSignIn />sign out</div>
                            )
                           
                          }
                          

                          <div className="signin-item sign-help flex-center gap-10"><GoQuestion /><NavLink to="#">help</NavLink></div>
                </div>
        )
      }
          {
            !signin && (
                <AuthComponent authAction={authAction} setAuthAction={setAuthAction} setSubNav={setSubNav}/>
            )
          }
          
        {/* <!-- ===============Nav end================ --> */}
    </div>
  )
}

export default Header
