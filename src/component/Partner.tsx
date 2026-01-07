import React, { useEffect, useState } from 'react'
import partner1 from '../assets/images/brandlogo/partner1.png'
import partner2 from '../assets/images/brandlogo/partner2.png'
import partner3 from '../assets/images/brandlogo/partner3.png'
import partner4 from '../assets/images/brandlogo/partner4.png'
import partner5 from '../assets/images/brandlogo/partner5.png'
import partner6 from '../assets/images/brandlogo/partner6.png'
import partner7 from '../assets/images/brandlogo/partner7.png'
import partner8 from '../assets/images/brandlogo/partner8.png'
import partner9 from '../assets/images/brandlogo/partner9.png'
import partner10 from '../assets/images/brandlogo/partner10.png'
import { userAuth } from '../pages/context/AuthContext'
import ButtonPreloader from './ButtonPreloader'

interface imageIntern {
    id : number;
image : string;
status : string
}
function Partner() {

   
   const [items, setItem] = useState<imageIntern[]>([]);
   const {baseUrl} = userAuth();
   const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        getData()
    }, []);
    const getData = async () => {
           setLoading(true);
               const myHeaders = new Headers();
               myHeaders.append("Content-Type", "application/json");
               const requestOptions: RequestInit = {
                   method: "GET",
                   headers: myHeaders,
                   redirect: "follow"
               };
               try {
                   const response = await fetch(`${baseUrl}/page-brand-logo`, requestOptions);
                   if (!response.ok) {
                   const errorResponse = await response.json();
                   throw new Error(errorResponse.message);
                   }
                   const result = await response.json(); 
                   setItem(result.data); 
                   setLoading(false);
               } catch (error) {
                   
               }
       }

  return (
    <div className="partnerCon">
        <div className="partnerHeader">
         Brands we’ve worked with
        </div>
        {
            loading && (
            <div className="cart-prealoader">
              <ButtonPreloader/>
            </div>

            ) 
        }
         
         <div className="partnerFlexCon">
            <div className="partnerFlex">

                {
                        items.map((item, index) => (

                        <div className="partnerImg" key={index}>
                            <img src={item.image} />
                        </div>
                        ))
                }
              
            </div>
        </div>

    </div>
  )
}

export default Partner