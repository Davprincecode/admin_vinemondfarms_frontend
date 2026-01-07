import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import product1 from '../assets/images/product3.jpg'
import { RxCross2 } from 'react-icons/rx'
import { AiOutlineDelete } from 'react-icons/ai'
import { VscDash } from 'react-icons/vsc'
import { FiPlus } from 'react-icons/fi'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { TiMinus, TiPlus } from 'react-icons/ti'
import { GoPlus } from 'react-icons/go'
import { PiMinusThin } from 'react-icons/pi'
import { userAuth } from './context/AuthContext'
import { useNavigate } from 'react-router-dom'
import ButtonPreloader from '../component/ButtonPreloader'
import { toast } from 'react-toastify'


interface cartInterface {
   id :  string;
   product_image  : string;
   product_size : string;
   product_color :  string;
   product_id :  string;
   product_name :  string;
   product_price :  number;
   quantity :  number;
   total :  number;
}

function Cart() {

    const {baseUrl, setCart, token} = userAuth();

    const [carts, setCarts] = useState<cartInterface[]>([]);
    const [total, setTotal] =useState<number>(0);
    const [loadingProductId, setLoadingProductId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

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
                 setCarts(result.data);
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

       const deleteCart = async(cartId : string) =>{
             setLoading(true);
             const myHeaders = new Headers();
             myHeaders.append("Content-Type", "application/json");
             myHeaders.append("Authorization", token);
             const requestOptions: RequestInit = {
               method: 'DELETE',
               headers: myHeaders,
               redirect: 'follow'
             };
             try {
               const response = await fetch(`${baseUrl}/remove-item/${cartId}`, requestOptions);  
                     
               if (!response.ok) {
                 const errorResponse = await response.json();
                 throw new Error(errorResponse.message);
               }
                 const result = await response.json();
                 setCarts(result.data);
                 setTotal(result.total);
                 setCart(result.cartCount);
                 setLoading(false);
             } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }          
               
             }
          
         ;
       }
       const increament = async (cartId : string) => {
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
               const response = await fetch(`${baseUrl}/increase-qty/${cartId}`, requestOptions);  
                     
               if (!response.ok) {
                 const errorResponse = await response.json();
                 throw new Error(errorResponse.message);
               }
                 const result = await response.json();
                 setCarts(result.data);
                 setTotal(result.total);
                  setCart(result.cartCount);
                 setLoading(false);
             } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }          
               
             }
          
         ;
       }
       const decreament = async(cartId : string) => {
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
               const response = await fetch(`${baseUrl}/decrease-qty/${cartId}`, requestOptions);  
                     
               if (!response.ok) {
                 const errorResponse = await response.json();
                 throw new Error(errorResponse.message);
               }
                 const result = await response.json();
                 setCarts(result.data);
                 setTotal(result.total);
                 setCart(result.cartCount);
                 setLoading(false);
             } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }          
               
             }
          
         ;
       }
       const navigateToPayment = () => {
         navigate('/payment');
       }
  return (
    <div className='cart-con-wrapper pageNav'>
      <Header/>

      <div className="cart-con">

         {
            loading && (
               <div className="cart-prealoader">
                  <ButtonPreloader/>
               </div>
         
            ) 
         }
           

         <div className="page-title">
               <span> Cart </span> /
            </div>

         <div className="cart-body-con">
             <div className="tableCount-header">
                  <h1>cart ({carts.length } items)</h1>
             </div>
             <div className="flex-center cart-body-item cart-body-desk">
                        <table id="customers">
                           <tr>
                              <th><AiOutlineDelete /></th>
                              <th>PHOTO</th>
                              <th>PRODUCT</th>
                              <th>COLOR/SIZE</th>
                              <th>UNIT PRICE</th>
                              <th>QUANTITY</th>
                              <th>SUB TOTAL</th>
                           </tr>
                        {
                           carts.map((item, index) => (

                               <tr key={index}>
                              <td><RxCross2 className="cart-delete" onClick={()  => deleteCart(item.id)}/></td>
                              <td><div className="cart-image"><img src={item.product_image} /></div></td>
                              <td><div className="cart-name">{item.product_name}</div></td>
                              <td>
                                 <div className="cart-size-con">
                                    <div className="cart-color" style={{ color:"black"}}></div>
                                    <div className="cart-size">{item.product_size}</div>
                                 </div>
                              </td>
                              <td><div className="cart-price">₦{item.product_price.toLocaleString()}</div></td>
                              <td>
                                 <div className="cart-qty flex-center">
                                    <div className="cart-minus" onClick={() => decreament(item.id)}><PiMinusThin /></div>
                                    <div className="cart-qt-num">{item.quantity}</div>
                                    <div className="cart-plus" onClick={() => increament(item.id)}><FiPlus /></div>
                                 </div>
                              </td>
                              {/* <p className="cart-moq">MOQ : 20</p></td> */}
                           <td><div className="cart-sub-total">₦{item.total}</div></td>
                           </tr>
                           )
                        )}
                          

                        </table>
             </div>
            

            {
               carts.map((item, index) =>(
            <div className="cart-body-mobile" key={index}>
               <div className="delete-cart" onClick={() => deleteCart(item.id)}><RxCross2 /></div>

               <div className="flex-center gap-20">
                  <div className="cart-image">
                  <img src={item.product_image}/>
                  </div>
                  <div className="cart-image-details">
                     <h1 className='cart-title'>{item.product_name}</h1>
                     <div className="flex-center gap-20 cart-size">
                           <h2>size:</h2>
                           <h1>{item.product_size}</h1>
                     </div>
                     {/* <div className="flex-center gap-20 cart-moq">
                           <h2>moq:</h2>
                           <h1>10</h1>
                     </div> */}
                  </div>
               </div>


               <div className="cart-description">
                  <div className="flex-center justification-between unit-price">
                     <h2>unit price</h2> 
                     <h1>₦{item.product_price.toLocaleString()}</h1>
                     
                  </div>
                  <div className="flex-center justification-between cart-mobile-qty">
                     <h2>quantity</h2> 
                     <div className="flex-center justification-between cart-mobile-qty-item">
                        <div className="qty-minus" onClick={() => decreament(item.id)}><PiMinusThin /></div>
                        <div className="qty-number">{item.quantity}</div>
                        <div className="qty-plus" onClick={()=> increament(item.id)}><GoPlus /></div>
                     </div>
                  </div>
                  <div className="flex-center justification-between cart-mobile-total">
                     <h2>sub total</h2> 
                     <h1>₦{item.total.toLocaleString()}</h1>
                  </div>
               </div>
               
            </div>
               ))
            }
           



         </div>

    <div className="cart-summary-wrapper flex justification-end">
      <div className="cart-summary">
             <h4>cart total</h4>

             <div className="sub-total flex-center justification-between">
               <h2>subtotal</h2>
               <h1>₦{total.toLocaleString()}</h1>
             </div>

             <div className="cart-total flex-center justification-between">
               <h2>cart total</h2>
               <h1>₦{total.toLocaleString()}</h1>
             </div>

             <div className="proceed-btn" onClick={navigateToPayment}>
               proceed to checkout
            </div>
      </div>
    </div>
      

      </div>

      {/* <Footer/> */}
    </div>
  )
}

export default Cart