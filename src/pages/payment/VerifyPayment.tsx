import React, { useEffect, useRef, useState } from 'react'
import { userAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SuccessfulPayment from '../../component/SuccessfulPayment';
import ButtonPreloader from '../../component/ButtonPreloader';

function VerifyPayment() {
     const params = new URLSearchParams(window.location.search);
     const reference = params.get('reference');
     const tranRef = params.get('trxref');
     const [showPopup, setShowPopup] = useState<boolean>(false);
     const [loading, setLoading] = useState<boolean>(false);
     const {baseUrl, token} = userAuth(); 
     const navigate = useNavigate();

     

     const fetchData = async () => {
      setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", token);
        const requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
        try {
          const response = await fetch(`${baseUrl}/payment/${reference}`, requestOptions);
          
          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
          }
            const result = await response.json();
            setLoading(false); 
            toast.success(result.message);
            navigate("/");
        } catch (error) { 
          setLoading(false);         
          toast.error("Payment not successful");
          navigate("/payment");
        }
    };
    
    const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchData();
      hasFetched.current = true;
    }
  }, []);

  const handleConfirm = () => {
    navigate("/");
    setShowPopup(false);
  }

  return (
    <div>
          {
            loading && (
              <div className="success-loading">
                   <ButtonPreloader/>
                </div>
            )
          }
      

      <SuccessfulPayment 
            isOpen={showPopup}
            onCancel={() => setShowPopup(false)}
            onDelete={handleConfirm}
      />

    </div>
  )
}

export default VerifyPayment