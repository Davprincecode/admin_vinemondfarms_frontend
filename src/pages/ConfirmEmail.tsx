import React, { useEffect, useState } from 'react';
import { userAuth } from '../pages/context/AuthContext'
import { toast } from 'react-toastify';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import loadingImg from '../assets/images/loading.gif'
import { ImCheckmark } from 'react-icons/im';

function ConfirmEmail() {
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();
    const { token } = useParams();
    const tokens = `Bearer ${token}`;
    const {baseUrl} = userAuth(); 

    useEffect(() => {
        handleConfirmEmail();
      }, []);

    const handleConfirmEmail = async () => {
        setLoading(true)
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", tokens);
            const requestOptions: RequestInit = {
              method: 'GET',
              headers: myHeaders,
              redirect: 'follow'
            };
            try {
              const response = await fetch(`${baseUrl}/confirmemail`, requestOptions);
                if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.message);
                }
                const result = await response.text(); 
                navigate('/login');
                setLoading(false) ;
            }  catch (error) {
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
    <div>
        {
            loading ? (
            <div className="loadingWrapper">
                    <h1>loading........</h1>
                    <div className="loadingEmail">
                        <img src={loadingImg} alt="" />
                    </div>
            </div>
            ) :  (
                <div className="emailsucces">
                    <div className="markIcon">
                    <ImCheckmark />
                    </div>
                    <div className="bottomBellow">
                     <h1>email verification successfully</h1> 
                     <p>You will be redirected to login page in a second if not press the button bellow</p>
                     <NavLink to="/login">
                        Click Here
                     </NavLink>
                    </div>
                </div>
               
            )
        }
      
    </div>
  )
}

export default ConfirmEmail
