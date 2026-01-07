import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { userAuth } from './context/AuthContext';
import ButtonPreloader from '../component/ButtonPreloader';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

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

function  MasterCoursePayment() {

const {baseUrl, token} = userAuth();
 const [loading, setLoading] = useState<boolean>(false);
const [cart, setCart] = useState<cartInterface[]>([]);
const [total, setTotal] =useState<number>(0);

 const [name, setName] = useState<string>('');
 const [email, setEmail] = useState<string>('');
 const [address, setAddress] = useState<string>('');
 const [phoneNumber, setPhoneNumber] = useState<number>(0);
 const [orderNote, setOrderNote] = useState<string>('');

 const[courseDescription, setCourseDescription] = useState<string>('');
    const[courseId, setCourseId] = useState<string>('');
 const[courseImage, setCourseImage] = useState<string>('');
     const[coursePrice, setCoursePrice] = useState<number>(0);
     const[courseTitle, setCourseTitle] = useState<string>('');
     const[courseType, setCourseType] = useState<string>('');
     const[discountPrice, setDiscountPrice] = useState<string>('');
     const[earlyBirdEndDate, setEarlyBirdEndDate] = useState<string>('');
     const[earlyBirdPrice, setEarlyBirdPrice] = useState<string>('');
     const[earlyBirdStartDate, setEarlyBirdStartDate] = useState<string>('');
     const[endDate, setEndDate] = useState<string>('');
     const[startDate, setStartDate] = useState<string>('');
     const[pin , setPin] = useState<boolean>(false);
     const[status, setStatus] = useState<string>('');


const { id } = useParams<{ id: string }>();

 useEffect(() => {
            getData()
            }, [id]);
    
      const getData = async () => {
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
                  const response = await fetch(`${baseUrl}/course/${id}`, requestOptions);
                  if (!response.ok) {
                  const errorResponse = await response.json();
                  throw new Error(errorResponse.message);
                  }
                  const result = await response.json();  
                   
                    setCourseDescription(result.data.courseDescription);
                    setCourseId(result.data.courseId);
                    setCourseImage(result.data.courseImage);

                                                            
                            const now = new Date();
                            const earlyBirdEnd = new Date(result.data.earlyBirdEndDate);
                            const discount = parseFloat(result.data.discountPrice);
                            const course = result.data.coursePrice;
                            const earlyBird = parseFloat(result.data.earlyBirdPrice);

                            if (now <= earlyBirdEnd) {
                                setCoursePrice(earlyBird);
                            } else if (!isNaN(discount) && discount !== 0) {
                                setCoursePrice(discount);
                            } else {
                               setCoursePrice(course);
                            }
                                                            

                    // setCoursePrice(result.data.coursePrice);

                    setCourseTitle(result.data.courseTitle);
                    setCourseType(result.data.courseType);
                    setDiscountPrice(result.data.discountPrice);
                    setEarlyBirdEndDate(result.data.earlyBirdEndDate);
                    setEarlyBirdPrice(result.data.earlyBirdPrice);
                    setEarlyBirdStartDate(result.data.earlyBirdStartDate);
                    setEndDate(result.data.endDate);
                    setStartDate(result.data.startDate);
                    setPin(result.data.pin);
                    setStatus(result.data.status);
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
             "service_type" : "course",
             "amount" : coursePrice,
             "courseId" : courseId,
             "courseName" : courseTitle,
             "startDate" : startDate,
             "endDate" : endDate,
             "callBackUrl" : `${url}/payment/course/callback`
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
               <span> Course </span>  / payment
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
                        
                            <div className="billing-product flex-center justification-between">
                                    <p>{courseTitle}
                                         {/* ({size}) */}
                                         </p>
                                    <p>₦{coursePrice}</p>
                            </div>
                            

                         
                    </div>
                     
                     <div className="billing-total">
                        <div className="billing-sub flex-center justification-between">
                          <h2>subtotal</h2>
                          <h2>₦{coursePrice.toLocaleString()}</h2>
                        </div>
                        {/* <div className="billing-sub-total flex-center justification-between">
                          <h2>shipping</h2>
                          <h2>₦100</h2>
                        </div> */}
                     </div>

                     <div className="billing-ground-total flex-center justification-between">
                        <h1>total</h1>
                        <h1>₦{coursePrice.toLocaleString()}</h1>
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

export default MasterCoursePayment