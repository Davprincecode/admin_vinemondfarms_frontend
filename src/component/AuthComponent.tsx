import { useEffect, useState } from 'react'
import logo from '../assets/images/logo.png';
import {toast } from 'react-toastify';
import {NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { userAuth } from '../pages/context/AuthContext';
import { RxCross2 } from 'react-icons/rx';
import { IoMdCheckmark } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import ButtonPreloader from './ButtonPreloader';
import { address } from 'framer-motion/client';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';


interface authComponentInterface {
    authAction : boolean,
    setAuthAction: React.Dispatch<React.SetStateAction<boolean>>;
    setSubNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthComponent: React.FC<authComponentInterface> = ({authAction, setAuthAction, setSubNav}) =>{

  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [switchPassword, setSwitchPassword] = useState<boolean>(false);
  const [switchLoginPassword, setSwitchLoginPassword] = useState<boolean>(false);
  const [switchConfirmPassword, setSwitchConfirmPassword] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [address1, setAddress1] = useState<string>('');
  const [phoneNumber1, setPhoneNumber1] = useState<string>('');
  const[loginPassword, setLoginPassword] = useState<string>('');
  const [auth, setAuth] = useState<string>('signin');

  const {baseUrl, loginAuth, logInUser, token, adminLoading, setAdminLoading}  = userAuth(); 

  
   const [errors, setErrors] = useState<string[]>([]);



   const { pathname } = useLocation();
  
  useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);


  useEffect(() => {
    if (confirmPassword && confirmPassword !== password) {
      const issues : string[] = [];
      issues.push('Password and confirm password not match.');
      setErrors(issues);
    } 
  }, [password, confirmPassword]);

  useEffect(() => {
  validateAll(password, confirmPassword);
}, [password, confirmPassword, userName, userEmail]);


const validateAll = (pwd: string, confirmPwd: string) => {
  const issues: string[] = [];

  // Password length
  if (pwd.length < 8) {
    issues.push('Password must be at least 8 characters.');
  }

  const lowerPwd = pwd.toLowerCase();

  // Name check
  if (userName && lowerPwd.includes(userName.toLowerCase())) {
    issues.push('Password cannot contain your name.');
  }

  // Email check
  if (userEmail && lowerPwd.includes(userEmail.toLowerCase())) {
    issues.push('Password cannot contain your email.');
  }

  // Symbol or number check
  if (!/[0-9!@#$%^&*(),.?":{}|<>]/.test(pwd)) {
    issues.push('Password must include at least one number or symbol.');
  }

  // Match check
  if (confirmPwd && pwd !== confirmPwd) {
    issues.push('Password and confirm password do not match.');
  }

  setErrors(issues);
};


   

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPwd = e.target.value;
    setPassword(newPwd);
    // validatePassword(newPwd);
  };

  
  const switchHandle = (param : string) => {
   setAuth(param);
  }

   const handleGoogleLogin = async() => {
        window.location.href = `${baseUrl}/auth/google/redirect`;
        setAdminLoading(true);
    };

  const handleSignUp = async () => {
    setLoading(true);
    const raw = {
     "name" : userName,
    "email" : userEmail,
    "password" : password,
    "phone_number1" : phoneNumber1,
    "address1" : address1
    };
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(raw),
    };
    try {
      const response = await fetch(`${baseUrl}/auth/signup`, requestOptions);
      setLoading(false);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      const result = await response.json();
  
      loginAuth(result.data.userId, result.data.name, result.data.email,  result.data.address1, result.data.address2, result.data.phoneNumber1, result.data.phoneNumber2, result.data.city, result.data.city, result.data.postalCode,  result.data.profileImage, 0, 0, result.data.role,  result.token);
      setSubNav(false);
      toast.success("Signup in successfully!");
        if(result.data.role == "admin"){
             navigate("/admin/admin-dashboard");
              logInUser();
          }
      logInUser();
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
       setSubNav(false);
       toast.success("Logged in successfully!");
        if(result.data.role == "admin"){
             navigate("/admin/admin-dashboard");
              logInUser();
          }
        logInUser();
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
    <div className="auth-con" style={{display : authAction ? "flex" : "none"}}>

      <div className="auth-body">

         <div className="auth-cancel">
          <div className="cancel"  onClick={() => setAuthAction(!authAction)}>
            <RxCross2 />
          </div>
         </div>

        {/* =================== */}
        <div className="account-section">

                <div className="auth-top">
                    <a href="/" className="account-logo">
                        <img src={logo} />
                    </a>
                </div>

                 <div className="auth-switch">
                    <div className={`login-switch ${auth === 'signin' ? 'switch-action' : ''}`} onClick={() => switchHandle('signin')}>sign in</div>
                    <div className={`signup-switch ${auth === 'signup' ? 'switch-action' : ''}`} onClick={() => switchHandle('signup')}>sign up</div>
                 </div>

               {
                  auth == 'signup' && (
                    <div className="middle">
                            <div className="form-group">
                                <label htmlFor="username">Name </label>
                                <input type="text"  placeholder="Name" className="form--control"  value={userName} onChange={(e) => setUserName(e.target.value)}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="username">Email Id</label>
                                <input type="email"  placeholder="Email" className="form--control"  value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
                            </div>
                               
                               <div className="form-group">
                                <label htmlFor="username">Address</label>
                                <input type="text"  placeholder="Address" className="form--control"  value={address1} onChange={(e) => setAddress1(e.target.value)}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="username">Phone Number</label>
                                <input type="number"  placeholder="Phone Number" className="form--control"  value={phoneNumber1} onChange={(e) => setPhoneNumber1(e.target.value)}/>
                            </div>
              
                            {/* <div className="form-group" style={{ position : "relative" }}>
                                <label htmlFor="password">Password </label>
                                <input id="passwordInput" type= {switchPassword ? "text" : "password"} placeholder="Enter Password" className="form--control" value={password} onChange={handleChange}/>
                            </div> */}

                            <div className="form-group" style={{ position: "relative" }}>
                                  <label htmlFor="password">Password</label>
                                  <input
                                    // id="password"
                                    type={switchPassword ? "text" : "password"}
                                    placeholder="Enter Password"
                                    className="form--control"
                                    value={password}
                                    onChange={handleChange}
                                  />
                                      <span
                                      className='password-eyes'
                                        style={{ position: "absolute"}}
                                        onClick={() => setSwitchPassword(prev => !prev)}
                                      >
                                        {switchPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                      </span>
                                    </div>


                            <div className="form-group" style={{ position : "relative" }}>
                                <label htmlFor="password">Confirm Password </label>
                                <input 
                                // id="passwordInput" 
                                type= {switchConfirmPassword ? "text" : "password"}
                                 placeholder="Enter Password" 
                                 className="form--control" 
                                 value={confirmPassword} 
                                 onChange={(e) => setConfirmPassword(e.target.value)}/>

                                      <span
                                      className='password-eyes'
                                    style={{ position: "absolute"}}
                                    onClick={() => setSwitchConfirmPassword(prev => !prev)}
                                    >
                                    {switchConfirmPassword ?  <FaRegEyeSlash /> : <FaRegEye />}
                                    </span>

                                    </div>

                          
                              <ul>
                              {errors.map((err, idx) => (
                              <li key={idx} style={{ color: 'red' }}>{err}</li>
                              ))}
                              </ul>

                        {/* ============= */}
                        <div className="btnFlex">
                        {  userEmail !== '' && password !== '' && errors.length < 1 ? (
                        loading ? (
                        <div className='btn inActive'>
                          <ButtonPreloader />
                        </div>
                        ) : (
                        <div className='btn' onClick={handleSignUp}>
                          create account
                        </div>
                        )
                        ) : (
                          
                        <div className='btn inActive'>
                          create account
                        </div>
                        )
                        }

                        </div>

                            <div className="other-part">

                                  <div className="or-flex flex-center">
                                    <div className="or-dot-line"></div>
                                    <p>or</p>
                                    <div className="or-dot-line"></div>
                                  </div>

                                <div className="google-sign"  onClick={handleGoogleLogin}>
                                  <div className="google-Icon">
                                    <FcGoogle />
                                  </div>
                                  <p>sign up with google</p>
                                </div>

                                <div className="logContent">
                                <p>By signing up to create an account I accept Company’s</p>  
                                <NavLink to="#">Terms of use & Privacy Policy.</NavLink>
                                </div>

                            </div>
                              
                    </div>
                  )
               }


{/* ----------------------------------------------------------------------------- */}
               {
                  auth == 'signin' && (
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
                              {  loginEmail !== '' && loginPassword !== '' ? (
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

                            <div className="other-part">
                                  <div className="or-flex flex-center">
                                    <div className="or-dot-line"></div>
                                    <p>or</p>
                                    <div className="or-dot-line"></div>
                                  </div>

                                <div className="google-sign" onClick={handleGoogleLogin}>
                                  <div className="google-Icon">
                                    <FcGoogle />
                                  </div>
                                  <p>sign in with google</p>
                                </div>
                                <div className="logContent">
                                <p>By signing up to create an account I accept Company’s</p>  
                                <NavLink to="#">Terms of use & Privacy Policy.</NavLink>
                                </div>
                            </div>
                    </div>
                  )
               }
         </div>
         {/* ==================== */}

      </div>

    </div>
  )
}

export default AuthComponent


