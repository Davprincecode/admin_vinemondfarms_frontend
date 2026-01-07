import React, { useEffect, useState } from "react";
import { IoEyeOutline, IoSettingsOutline } from "react-icons/io5";
import { userAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import ButtonPreloader from "../../../component/ButtonPreloader";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";


const ChangePassword = () =>  {
  const { baseUrl, token, logout} = userAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [switchCurrentPassword, setSwitchCurrentPassword] = useState<boolean>(false);
  const [switchLoginPassword, setSwitchLoginPassword] = useState<boolean>(false);
  const[currentPassword, setCurrentPassword] = useState<string>('');
  const[loginPassword, setLoginPassword] = useState<string>('');
  

  const handleLogin = async () => {
    setLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token);
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "currentPassword" : currentPassword,
      "newPassword" : loginPassword
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${baseUrl}/auth/change-password`, requestOptions);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
        }
        const result = await response.json(); 
          toast.success(result.message);
          logout();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
     
      <div className="admin-password-con">
      
        <div className="middle">
        <h1>Change Password</h1>
        <div className="form-group" style={{ position : "relative" }}>
            <label htmlFor="password">Current Password </label>
            <input 
            id="passwordInput" 
            type= {switchCurrentPassword ? "text" : "password"} 
            placeholder="Enter Password" 
            className="form--control"
            value={currentPassword} 
            onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <span
                className='password-eyes'
                    style={{ position: "absolute"}}
                    onClick={() => setSwitchCurrentPassword(prev => !prev)}
                >
                    {switchCurrentPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
        </div>

        <div className="form-group" style={{ position : "relative" }}>
            <label htmlFor="password">New Password </label>
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
                {  currentPassword !== '' && loginPassword !== '' ? 
                        (
                        loading ? (
                        <div className='btn inActive'>
                        <ButtonPreloader />
                        </div>
                        ) : (
                        <div className='btn' onClick={handleLogin}>
                            Change Password
                        </div>
                        )

                ) : (
                    <div className='btn inActive'>
                        Change Password
                    </div>
                )

                }

        </div>
        {/* ===================== */}

        </div>
      
      </div>

    </div>
  );
};

export default ChangePassword;
