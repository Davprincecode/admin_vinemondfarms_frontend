// import React, { useRef, useState } from 'react'
// import { toast } from 'react-toastify';
// import { userAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// function VerifyOtp() {
//     const navigate = useNavigate();
//     // const {baseUrl, token, setTrp, setUserAccountDetails, setTransactions, setSellingPrice, setNetwork, setProvider, setProviderList, setProviderAirtime, setProviderBill, setProviderCable, setSiteName, setBaseColor, setSecondaryColor, setWebLogo, setWhatsAppLink, loginAuth, logInUser, webLogo, setTwoStep} = userAuth();  
//     const [loading, setLoading] = useState<boolean>(false);

//     const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    
//     const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  
//     const handleInputChange = (index: number, value: string) => {
//       if (value.length > 1) return;
  
//       const newOtp = [...otp];
//       newOtp[index] = value;
//       setOtp(newOtp);
  
//       if (value !== '' && index < 5 && inputRefs.current[index + 1]) {
//         inputRefs.current[index + 1]?.focus();
//       }
//     };
  
//     const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
//         if (event.key === 'Backspace' && index > 0 && otp[index] === '' && inputRefs.current[index - 1]) {
//           inputRefs.current[index - 1]?.focus();
//         }
//       };
//       const confirmPin = async () => {
//         setLoading(true);
//         const isOtpComplete = otp.every(value => value !== '');
//         if(isOtpComplete){
//           const otpNumber = parseInt(otp.reduce((acc, current) => acc + current, ''));
//         const raw = {
//            "otp" : otpNumber
//         };
//         const requestOptions: RequestInit = {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             "Authorization" : token
//           },
//           body: JSON.stringify(raw),
//         };
//         try {
//           const response = await fetch(`${baseUrl}/otpverification`, requestOptions);
//           if (!response.ok) {
//             const errorResponse = await response.json();
//             throw new Error(errorResponse.message);
//           }
//           const result = await response.json();
//           setOtp(['', '', '', '']);
//           if(result.data.role !== "admin"){
//             toast.success("Logged in successfully!");
//             loginAuth(result.data.userId, result.data.userName, result.data.email, result.data.firstName, result.data.lastName, result.data.city, result.data.country, result.data.countryCode, result.data.address, result.data.mobile, result.data.zipCode, result.data.accountNumber, result.data.balance, result.data.bonusBalance, result.data.image, result.data.role, result.token);
//             setUserAccountDetails(result.data.bankAccount);
//             setTransactions(result.data.transaction);
//             setSellingPrice(result.price);
//             setNetwork(result.network);
//             setProvider(result.vtuProvider);
//             setProviderList(result.providerList);
//             setProviderAirtime(result.airtimeProvider);
//             setProviderCable(result.cableProvider);
//             setProviderBill(result.billProvider);
//             setTrp(result.tr_pin);
//             setTwoStep(result.verification);
//             logInUser();
//             navigate("/user/dashboard");
//           } 
  
//           if(result.data.role == "admin"){
//             toast.success("Logged in successfully!");
//             loginAuth(result.data.userId, result.data.userName, result.data.email, result.data.firstName, result.data.lastName, result.data.city, result.data.country, result.data.countryCode, result.data.address, result.data.mobile, result.data.zipCode, result.data.accountNumber, result.data.balance, result.data.bonusBalance, result.data.image, result.data.role, result.token);
//             setTwoStep(result.verification);
//             logInUser();
//             navigate("/admin/admin-dashboard");
//           }
//           setLoading(false);
//         } catch (error) {
//           setLoading(false);
//           if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
//             toast.error(error.message);
//           } else {
//             toast.error('An unknown error occurred.');
//           }
//         } 
//     }else{
//         toast.error("Your otp should be four");
//         setLoading(false);
//     }    
//  }

//   return (
//     <div>
//          <div className="authMainWrapper">
//             <div className="otp-con otp-verification" style={{display: "flex"}}>

//                 <div className="otp-header">
//                     <div className="otp-flex">
//                     <div>
//                         <h3>
//                          Verify your otp
//                         </h3>
//                         </div>
//                     </div>
//                     <div>
//                         <p>
//                             you are about to verify your otp
//                         </p>
//                     </div>
//                 </div>

//             <div className="otp-container">
//                 <div className="otp-title">
//                     <p>enter one time password</p>
//                 </div>
//                 <div className="otp-input">
//                 {otp.map((value, index) => (
//                                 <input
//                                     key={index}
//                                     type="number"
//                                     id={`otp-reset-${index + 1}`}
//                                     maxLength={1}
//                                     value={value}
//                                     ref={(ref) => (inputRefs.current[index] = ref)}
//                                     onChange={(event) => handleInputChange(index, event.target.value)}
//                                     onKeyDown={(event) => handleKeyDown(index, event)}
//                                 />
//                                 ))}
//                 </div>
                
//                 {
//                         loading ? (
//                             <div className="setsubmit">
//                                 processing.....
//                             </div>
//                         ) : (
//                             <div className="setsubmit" onClick={confirmPin}>
//                                 submit
//                             </div>
//                         )
//                     }

//             </div>
//             </div>
//         </div>

//     </div>
//   )
// }

// export default VerifyOtp