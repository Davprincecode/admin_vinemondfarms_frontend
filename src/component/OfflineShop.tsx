import React, { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'
import logo from '../assets/images/logo.png'
import { toast } from 'react-toastify';
import { userAuth } from '../pages/context/AuthContext';
import ButtonPreloader from './ButtonPreloader';

interface comingSoonInterface {
    popAction : boolean,
    setPopAction: React.Dispatch<React.SetStateAction<boolean>>;
}

const OfflineShop : React.FC<comingSoonInterface> = ({popAction, setPopAction}) => {

    const[waitEmail, setWaitEmail] = useState<string>('');
    const[loading, setLoading] = useState<boolean>(false);
    const{baseUrl} = userAuth();
  
    const handleWait = async() =>{
     setLoading(true)
     if(waitEmail == ''){
      toast.error('fill email')
      return;
     }
      const raw = {
        "email" : waitEmail
      };
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(raw),
      };
    
      try {
        const response = await fetch(`${baseUrl}/waitlist`, requestOptions);     
        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message);
        }
        const result = await response.json();
        setWaitEmail('');
        toast.success("Subscription Successful")
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

  return (
    
       <div className="comingWrapper" style={{display : popAction ? "flex" : "none"}}>
        <div className="comingCon">
            <div className="comingSoonHeader">
                <div className="comingIcon" onClick={() => setPopAction(!popAction)}>
                    <RxCross2 />
                </div>
            </div>

            <div className="comingBody">
                <div className="comingHeader">
                    <img src={logo} />
                </div>
                <div className="comingContent flex-center">
                <div className="comingContentHeader" style={{ textAlign : "center"}}>
                    <h1>Our shop is currently Offline.</h1>
                </div>

                <div className="comingContentPara">
                        <p>
                            Get Notified when were back up.
                        </p>
                </div>
                
                <div className="comingInput flex-center">
                    <input type="text" placeholder='Enter Email Address'  value={waitEmail} onChange={(e) => setWaitEmail(e.target.value)}/>
                    {
                    loading ? (
                        <div className="sub">
                            <ButtonPreloader/>
                        </div>
                    ) : (
                    
                    <div className="sub"  onClick={handleWait}>subscribe</div>
                     )
                 }
                </div>
                 
                        <div className="join">
                                join the waitlist
                        </div>
                   
                

                    <a href="https://wa.me/2347077744145" target='_blank' className="whats-app">
                        <FaWhatsapp />
                        <p>Chat us on whatsapp</p>
                    </a>


                </div>
            </div>
        </div>
    
    </div>
  )
}

export default OfflineShop