// import { useEffect, useState } from 'react'
// import logo from '../../assets/images/logo1.png';

// import {toast } from 'react-toastify';
// import {NavLink, useNavigate, useParams } from 'react-router-dom';
// import { userAuth } from '../context/AuthContext';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';

// function ChangePassword() {
//   const [password, setPassword] = useState<string>('');
//   const [confirmpassword, setConfirmPassword] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [matchPassword, setMatchPassword] = useState<boolean>(false);
//   const [changed, setChanged] = useState<boolean>(false);
//   const { token } = useParams();
//   const tokens = `Bearer ${token}`;

//   const {baseUrl, webLogo} = userAuth();  

//   const handleLogin = async () => {
//     setLoading(true);
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     myHeaders.append("Authorization", tokens);
//     const raw = {
//       "newPassword": password
//     };  
//     const requestOptions: RequestInit = {
//       method: 'POST',
//       headers: myHeaders,
//       body: JSON.stringify(raw),
//     };
//     try {
//       const response = await fetch(`${baseUrl}/changepassword`, requestOptions); 
//       if (!response.ok) {
//         const errorResponse = await response.json();
//         throw new Error(errorResponse.message);
//       }
//       const responseJson = await response.json();
//       toast.success(responseJson.message);
//       setChanged(true);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
//         toast.error(error.message);
//       } else {
//         toast.error('An unknown error occurred.');
//       }
//     }
//   };
  
//   useEffect(() => {
//     if (password === confirmpassword) {
//       setMatchPassword(true);
//     } else {
//       setMatchPassword(false);
//     }
//   }, [confirmpassword, password]);

// const handleConfirmPassword = (eventPassword: string) => {
//     setConfirmPassword(eventPassword);
//   };
  
//   return (

//     <div className="authMainWrapper">
//       <section className="account-section bg_img">
// {/* =================== */}
// <div className="account-section-right">
//         <div className="top text-center" style={{    marginBottom: "20px" }}>
//             <a href="/" className="account-logo">
//                 <img src={webLogo} />
//             </a>
// 			<br/>
//         </div>

//         <div className="middle">
//         <div className="formHeader">
//             <h2>Change your password</h2>
//           </div>

//             <form className="account-form">               
//                 <div className="form-group">
//                     <label htmlFor="username">Enter New Password *</label>

//                     <input type="password" placeholder='enter new password'
//                      value={password} onChange={(e) => setPassword(e.target.value)}
//                    />
//                 </div> 

//                 <div className="form-group">
//                     <label htmlFor="username">Confirm Password *</label>

//                     <input type="password" placeholder='confirm password'
//                      value={confirmpassword} onChange={(e) => handleConfirmPassword(e.target.value)}
//                    />
//                 </div> 

//                 {
//                     confirmpassword && matchPassword == false ? (
//                       <p>password does not match </p> 
//                     ) : (
//                         ' '
//                     )
//                 }

//       <div className="btnFlex">
//       {
//                   password && matchPassword ? (
//                     <button onClick={handleLogin} disabled={loading}>
//                       {loading ? 'Loading....' : 'Change Password'}
//                     </button>
//                   ) : (
//                     <button disabled={true}>
//                       {loading ? 'Loading....' : 'Change Password'}
//                     </button>
//                   )
//               }
//       </div>

  
//     </form>


//         </div>
        
//     </div>
// {/* ==================== */}
//       </section>
//     </div>
//   )
// }

// export default ChangePassword


