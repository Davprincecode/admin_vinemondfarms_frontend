// import { useState } from 'react'
// import logo from '../../assets/images/logo1.png';

// import {toast } from 'react-toastify';
// import {NavLink, useNavigate } from 'react-router-dom';
// import { userAuth } from '../context/AuthContext';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// function ForgetPassword() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [changed, setChanged] = useState<boolean>(false);
//   const {baseUrl, webLogo} = userAuth();  



//   const handleLogin = async () => {
//     setLoading(true);
//     const raw = {
//       "email": email
//     };
  
//     const requestOptions: RequestInit = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(raw),
//     };
  
//     try {
//       const response = await fetch(`${baseUrl}/forgetpassword`, requestOptions);
//       if (!response.ok) {
//         const errorResponse = await response.json();
//         throw new Error(errorResponse.message);
//       }
//       const result = await response.json();
//       setLoading(false);
//       toast.success(result.message);
//     } catch (error) {
//       setLoading(false);
//       if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
//         toast.error(error.message);
//       } else {
//         toast.error('An unknown error occurred.');
//       }
//     }
//   }
//   return (

//     <div className="authMainWrapper">
//       <section className="account-section bg_img">
// {/* =================== */}
// <div className="account-section-right">
//         <div className="top text-center" style={{ marginBottom: "20px"}}>
//             <a href="/" className="account-logo">
//                 <img src={webLogo} />
//             </a>
// 			<br/>
//         </div>

//         <div className="middle">
//         <div className="formHeader">
//             <h2>Forgot your password?</h2>

//             <p>Enter your email below, you will 
//                 receive an email with instructions on how to reset 
//                 your password in a few minutes.
//                 </p>
//           </div>
//             <form className="account-form" onSubmit={(e) => e.preventDefault()}>               
//                 <div className="form-group">
//                     <label htmlFor="username">Enter your e-mail address *</label>

//                     <input type="email" placeholder='enter email'
//                      value={email} onChange={(e) => setEmail(e.target.value)}
//                    />

//                 </div>               
//       <div className="btnFlex">
//         {
//           loading ? (
//             <button >
//               Loading....
//             </button>
//           ) : (
//             <button onClick={handleLogin} >
//               Send
//             </button>
//           )
//         }
          
//       </div>

  
//     </form>


//         </div>
        
//     </div>
// {/* ==================== */}
//       </section>
//     </div>
//   )
// }

// export default ForgetPassword


