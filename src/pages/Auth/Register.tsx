import { useEffect, useState } from 'react'
import logo from '../../assets/images/logo.png';
import {toast } from 'react-toastify';
import {NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { userAuth } from '../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { IoMdCheckmark } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';

function Register() {


  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState <boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [switchPassword, setSwitchPassword] = useState<boolean>(false);
  const [auth, setAuth] = useState<string>('signup');
  const {baseUrl} = userAuth();  
const { pathname } = useLocation();
  
  useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  useEffect(() => {
    if (confirmPassword && confirmPassword !== password) {
      setError(false);
    } else if(confirmPassword && confirmPassword === password) {
      setError(true);
    }else{
      setError(false);
    }
  }, [password, confirmPassword]);

  const handleLogin = async () => {
    setLoading(true);
    const raw = {
      'name' : name
    };
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(raw),
    };
    try {
      const response = await fetch(`${baseUrl}/signupuser`, requestOptions);
      setLoading(false);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      const result = await response.json();
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
  
  const switchHandle = (param : string) => {
   setAuth(param);
  }

  return (
    <div className="auth-con">

      <div className="auth-body">
         <div className="auth-cancel">
          <div className="cancel">
            <RxCross2 />
          </div>
         </div>
        {/* =================== */}
        <div className="account-section">

                <div className="top">
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
                                <input type="text"  placeholder="Name" className="form--control"  value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="username">Email Id</label>
                                <input type="text"  placeholder="Email" className="form--control"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
              
                            <div className="form-group" style={{ position : "relative" }}>
                                <label htmlFor="password">Password </label>
                                <input id="passwordInput" type= {switchPassword ? "text" : "password"} placeholder="Enter Password" className="form--control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>

                            <div className="form-group" style={{ position : "relative" }}>
                                <label htmlFor="password">Confirm Password </label>
                                <input id="passwordInput" type= {switchPassword ? "text" : "password"} placeholder="Enter Password" className="form--control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                            </div>

                            <div className="error-message">
                                <div className="error-icon flex-center gap-10"><IoMdCheckmark /><p>password strength weak</p></div>
                                <div className="error-icon flex-center gap-10"><IoMdCheckmark /><p>at least 8 characters</p></div>
                                <div className="error-icon flex-center gap-10"><IoMdCheckmark /><p>cannot contain your name or email address</p></div>
                                <div className="error-icon flex-center gap-10"><IoMdCheckmark /><p>contains a number of symbol</p></div>
                            </div>

                        {/* ============= */}
                        <div className="btnFlex">
                        {  email !== '' && password !== '' && error ? (
                        loading ? (
                        <div className='btn'>
                          processing.....
                        </div>
                        ) : (
                        <div className='btn' onClick={handleLogin}>
                          create account
                        </div>
                        )
                        ) : (
                          // className="btnInactive"
                        <div className='btn'>
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

                                <div className="google-sign">
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

               {
                  auth == 'signin' && (
                    <div className="middle">
                            <div className="form-group">
                                <label htmlFor="username">Email Id</label>
                                <input type="text"  placeholder="Email" className="form--control"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
              
                            <div className="form-group" style={{ position : "relative" }}>
                                <label htmlFor="password">Password </label>
                                <input id="passwordInput" type= {switchPassword ? "text" : "password"} placeholder="Enter Password" className="form--control" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>

                        {/* ============= */}
                        <div className="btnFlex">
                        {  email !== '' && password !== '' && error ? (
                        loading ? (
                        <div className='btn'>
                          processing.....
                        </div>
                        ) : (
                        <div className='btn' onClick={handleLogin}>
                          sign in
                        </div>
                        )
                        ) : (
                          // className="btnInactive"
                        <div className='btn'>
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

                                <div className="google-sign">
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

export default Register


