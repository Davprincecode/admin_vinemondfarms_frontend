import { useEffect, useState } from 'react'
import logo from '../../assets/images/logo.png'
import {toast } from 'react-toastify';
import {NavLink, useLocation, useNavigate } from 'react-router-dom';
import { userAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import ButtonPreloader from '../../component/ButtonPreloader';

function Login() {
  const navigate = useNavigate();
 
  const [loading, setLoading] = useState<boolean>(false);
  const [switchPassword, setSwitchPassword] = useState<boolean>(false);
  const [switchLoginPassword, setSwitchLoginPassword] = useState<boolean>(false);
  const [loginEmail, setLoginEmail] = useState<string>('');
  const[loginPassword, setLoginPassword] = useState<string>('');
  const [auth, setAuth] = useState<string>('signin');
  const {baseUrl, loginAuth, logInUser}  = userAuth(); 

   const { pathname } = useLocation();
  
  useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);



  
  const switchHandle = (param : string) => {
   setAuth(param);
  }

  

   const handleLogin = async () => {
    setLoading(true);
    const raw = {
      'email' : loginEmail,
      'password' : loginPassword
    };
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(raw),
    };
    try {
      const response = await fetch(`${baseUrl}/auth/login`, requestOptions);   
      setLoading(false); 
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      const result = await response.json();
       loginAuth(result.data.userId, result.data.name, result.data.email,  result.data.address1, result.data.address2, result.data.phoneNumber1, result.data.phoneNumber2, result.data.city, result.data.city, result.data.postalCode, result.data.profileImage, result.cart, result.notification, result.data.role,  result.token);
        if(result.data.role == "admin"){
            toast.success("Logged in successfully!");
            logInUser();
            navigate("/admin/admin-dashboard"); 
          }else{
            toast.error("You are not allow")
          }
        setLoading(false);
    } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }
      setLoading(false);
      if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred.');
      }
    }
  }
  
 return (
     <div className="auth-con admin-login">
 
       <div className="auth-body">
 
          
 
         {/* =================== */}
         <div className="account-section">
 
                 <div className="auth-top">
                     <a href="/" className="account-logo">
                         <img src={logo} />
                     </a>
                 </div>

                 
                   <div className="auth-top-header">
                        <h1>admin dashboard</h1>
                   </div>
                 
 
                  <div className="auth-switch">
                     <div className={`login-switch ${auth === 'signin' ? 'switch-action' : ''}`} onClick={() => switchHandle('signin')}>sign in</div>
                     {/* <div className={`signup-switch ${auth === 'signup' ? 'switch-action' : ''}`} onClick={() => switchHandle('signup')}>sign up</div> */}
                  </div>
 
              
 
 
 {/* ----------------------------------------------------------------------------- */}
               
                     <div className="middle">
                             <div className="form-group">
                                 <label htmlFor="username">Email Id</label>
                                 <input type="text"  placeholder="Email" className="form--control"  value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}/>
                             </div>
               
                             <div className="form-group" style={{ position : "relative" }}>
                                 <label htmlFor="password">Password </label>
                                 <input 
                                 id="passwordInput" 
                                 type= {switchLoginPassword ? "text" : "password"} 
                                 placeholder="Enter Password" 
                                 className="form--control"
                                  value={loginPassword} 
                                  onChange={(e) => setLoginPassword(e.target.value)}
                                  />
                                   <span
                                       className='password-eyes'
                                         style={{ position: "absolute"}}
                                         onClick={() => setSwitchLoginPassword(prev => !prev)}
                                       >
                                         {switchLoginPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                       </span>
                             </div>
 
                         {/* ============= */}
                         <div className="btnFlex">


                               {  loginEmail !== '' && loginPassword !== '' ? 
                                    
                                    (
                                     loading ? (
                                     <div className='btn inActive'>
                                       <ButtonPreloader />
                                     </div>
                                     ) : (
                                     <div className='btn' onClick={handleLogin}>
                                       sign in
                                     </div>
                                       )
 
                               ) : (
                                 <div className='btn inActive'>
                                   sign in
                                 </div>
                               )
 
                               }
 
                         </div>
 
                            
                     </div>
                 
          </div>
          {/* ==================== */}
 
       </div>
 
     </div>
   )
}

export default Login


