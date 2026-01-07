import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import { FaCcVisa } from 'react-icons/fa'
import Footer from '../component/Footer'
import { userAuth } from './context/AuthContext';
import ButtonPreloader from '../component/ButtonPreloader';
import { toast } from 'react-toastify';

interface cartInterface {
   id :  number;
   product_image  : string;
   product_size : string;
   product_color :  string;
   product_id :  string;
   product_name :  string;
   product_price :  number;
   quantity :  number;
   total :  number;
}


function Payment() {

const {baseUrl, token} = userAuth();
 const [loading, setLoading] = useState<boolean>(false);
const [cart, setCart] = useState<cartInterface[]>([]);
const [total, setTotal] =useState<number>(0);

 const [name, setName] = useState<string>('');
 const [email, setEmail] = useState<string>('');
 const [address, setAddress] = useState<string>('');
 const [phoneNumber, setPhoneNumber] = useState<number>(0);
 const [orderNote, setOrderNote] = useState<string>('');

 

    useEffect(() => {
          
          const fetchData = async () => {
            setLoading(true);
             const myHeaders = new Headers();
             myHeaders.append("Content-Type", "application/json");
             myHeaders.append("Authorization", token);
             const requestOptions: RequestInit = {
               method: 'GET',
               headers: myHeaders,
               redirect: 'follow'
             };
             try {
               const response = await fetch(`${baseUrl}/get-cart`, requestOptions);  
                     
               if (!response.ok) {
                 const errorResponse = await response.json();
                 throw new Error(errorResponse.message);
               }
                 const result = await response.json();
                 setCart(result.data);
                 setTotal(result.total);
                 setLoading(false);
             } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }          
               
             }
          
         };

      fetchData();
    
           }, []);

 const url = window.location.origin;
     const fetchData = async () => {
       setLoading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", token);
        const raw = JSON.stringify({
             "email" : email,
             "name" : name,
             "address" : address,
             "phoneNumber" : phoneNumber,
             "orderNote" : orderNote,
             "service_type" : "product",
             "amount" : total,
             "callBackUrl" : `${url}/payment/callback` 
         });
        const requestOptions: RequestInit = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        try {
          const response = await fetch(`${baseUrl}/payment`, requestOptions);     
          if (!response.ok) {
            const errorResponse = await response.json();  
            throw new Error(errorResponse.message);
          }
            const result = await response.json();  
            setLoading(false);
            window.location.href = result.authorization_url;
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
     
    };

  return (
    <div className='payment-con-wrapper pageNav'>
      <Header/>

      <div className="payment-con">

         <div className="page-title">
               <span> Cart </span> / shipping / payment
        </div>
         
         <div className="billing-con">

            <div className="billing-form form-con">

                <div className="form-title">Billing Details</div>

                <div className="formInput">
                    <label >name <span>(First name and Last name)</span>  *</label>
                    <input type="text" value={name}  placeholder='full name' onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="formInput">
                    <label >email</label>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>

            
                <div className="formInputFlex">
                       <div className="formInputItem">
                        <label >full address</label>
                        <input type="text" placeholder='address' value ={address} onChange={(e) => setAddress(e.target.value)}/>
                        </div>
                       <div className="formInputItem">
                        <label >Mobile Number</label>
                        <input type="number"  value ={phoneNumber} onChange={(e) => setPhoneNumber(parseInt(e.target.value))}/>
                        </div>
                </div>

                <div className="formInput textAreaInput">
                    <label >order note</label>
                    <textarea  cols={30} rows={10} placeholder='order note' value={orderNote} onChange={(e) => setOrderNote(e.target.value)}></textarea>
                </div>

            </div>

            <div className="billing-details">
                <div className="billing-header flex-center justification-between">
                    <h1>product</h1>
                    <h1>subtotal</h1>
                </div>

                <div className="billing-body">

                    <div className="billing-product-con">
                        {
                            cart.map((item, index)=>(
                            <div className="billing-product flex-center justification-between" key={index}>
                                    <p>{item.product_name} ({item.product_size})</p>
                                    <p>₦{item.total}</p>
                            </div>
                            ))
                        }
                        

                         
                    </div>
                     
                     <div className="billing-total">
                        <div className="billing-sub flex-center justification-between">
                          <h2>subtotal</h2>
                          <h2>₦{total.toLocaleString()}</h2>
                        </div>
                        {/* <div className="billing-sub-total flex-center justification-between">
                          <h2>shipping</h2>
                          <h2>₦100</h2>
                        </div> */}
                     </div>

                     <div className="billing-ground-total flex-center justification-between">
                        <h1>total</h1>
                        <h1>₦{total.toLocaleString()}</h1>
                     </div>

                </div>

                <div className="billing-card form-con">
                    <div className="card-title">payment</div>
                    {/* <div className="card-header flex-center gap-10">
                        <div className="flex-center card-header-title"><input type="radio"/> <p>credit card</p> </div>
                        <div className="flex-center card-header-title"><input type="radio"/> <p>visa card</p> </div>
                        <div className="card-header-title"><FaCcVisa /></div>
                        <div className="card-header-title"><FaCcVisa /></div>
                    </div> */}
                    <div className="card-body">

                        {/* <div className="formInput">
                            <input type="text" name="" placeholder='Card number' />
                        </div>
                         <div className="formInput">
                            <input type="text" name="" placeholder='Name on card' />
                        </div>

                        <div className="formInputFlex">
                            <div className="formInputItem">
                                <input type="text" name="" placeholder="Exp date (MM/YY)" />
                            </div>
                            <div className="formInputItem">
                                <input type="text" name="" placeholder="security code" />
                            </div>
                        </div> */}
                         {
                            loading ? (
                              <ButtonPreloader/>
                            ) : (

                                
                            name !== '' && email !=='' && address !=='' && phoneNumber > 0  ? (
                            <div className="paymentBtn" onClick={fetchData}>
                                place order
                            </div>
                            ) : (
                            <div className="paymentBtn inActive" >
                                place order
                            </div>
                            )
                                
                            )
                         }
                         

                    </div>

                </div>

            </div>


         </div>


     </div>

     <Footer/>
    </div>
  )
}

export default Payment