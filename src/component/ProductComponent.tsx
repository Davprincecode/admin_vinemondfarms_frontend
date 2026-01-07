import { useEffect, useState } from 'react'
import logo from '../assets/images/logo.png';
import {toast } from 'react-toastify';
import {NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { userAuth } from '../pages/context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RxCross2, RxDividerVertical } from 'react-icons/rx';
import { IoIosStar, IoIosStarOutline, IoMdCheckmark } from 'react-icons/io';
import product3sub4 from '../assets/images/product3sub4.png';
import { MdArrowOutward, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { IoLocationOutline } from 'react-icons/io5';
import { TbTruckDelivery } from 'react-icons/tb';
import { CiCircleQuestion } from 'react-icons/ci';

interface authComponentInterface {
    authAction : boolean,
    setAuthAction: React.Dispatch<React.SetStateAction<boolean>>;

      PopOrder : orderInterface[];
      status : string;

}

interface orderInterface {
    id : string;
    customerAddress:  string;
    customerId:  string;
    customerName:  string;
    customerEmail:  string;
    customerPhoneNumber: string;
    orderDate:  string;
    orderId:  string;
    orderStatus:  string;
    total:  string;
    paymentMethod : string;
    products : products[]
}
interface products {
orderId : string;
productColor : string;
productId : string;
productImage : string;
productName : string;
quantity : number;
unitPrice : string;
total : string; 
}

const ProductComponent : React.FC<authComponentInterface> = ({authAction, setAuthAction, PopOrder,  status} ) =>{

  const navigate = useNavigate();
  const {baseUrl} = userAuth();  
  const { pathname } = useLocation();
  
  useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    const currentStage = status;
    const stages = ['pending', 'confirmed', 'shipped', 'delivered'];
  return (
    <div className="track-con" style={{display : authAction ? "flex" : "none"}}>

        {  
        
        PopOrder.map((item, index) => (
            <div className="track-body">
                
                <div className="track-cancel-con flex-center justification-between">

                    <div className="track-header flex-center gap-10">
                        <p>Home</p>
                        <MdOutlineKeyboardArrowRight />
                        <p>Orders</p>
                        <MdOutlineKeyboardArrowRight />
                        <p>ID {item.orderId}</p>
                    </div>

                    <div className="track-cancel">
                        <div className="cancel"  onClick={() => setAuthAction(!authAction)}>
                        <RxCross2 />
                        </div>
                    </div>

                </div>

                <div className="track-header-title flex-center justification-between">
                    <h1>Order ID : {item.orderId}</h1>

                    <div className="track-btn-con flex-center gap-10">
                            <div className="invoice-btn flex-center gap-10">
                            <LiaFileInvoiceSolid />
                            invoice
                            </div>
                            <div className="track-btn flex-center gap-10">
                            track order
                            <IoLocationOutline />
                            </div>
                    </div>
                    
                </div>
                
                <div className="track-delivery flex-center gap-10">
                    <div className="track-delivery-date">
                    <span>order date : </span>{item.orderDate}
                    </div>
                    {/* <div className="dash-right"><RxDividerVertical /></div>
                    <div className="track-delivery-car flex-center gap-10">
                        <TbTruckDelivery />
                        <p>estimated delivery: Oct 16, 2025</p> 
                    </div> */}
                </div>


                <div className="track-body-details">

                    <div className="track-progress">
                            <div className="progress-container">
                            {stages.map((stage, index) => {
                                    const isActive = stages.indexOf(currentStage) >= index;
                                    return (
                                        <div key={stage} className="progress-step">
                                        <div className={`progress-circle ${isActive ? 'active' : ''}`}></div>
                                        <div className="progress-label">{stage}</div>
                                        {index < stages.length - 1 && (
                                        <div className={`progress-line ${isActive ? 'active' : ''}`}></div>
                                        )}
                                        </div>
                                        );
                                    })}
                            </div>
                    </div>

                </div>

                <div className="track-item-con">
{
                        item.products.map((item, index)=>(
                    <div className="track-item flex justification-between">
                        <div className="track-item-details flex gap-10">
                            <div className="track-image">
                                <img src={item.productImage} alt="" />
                            </div>
                            <div className="track-name">
                                <h4>{item.productName}</h4>

                                <div className="track-size-con flex-center gap-10">
                                    <div className="track-size">{item.productColor}</div>
                                    <div className="track-mill">350ml</div>
                                </div>

                            </div>
                        </div>
                        <div className="track-price-con">
                            <h2>₦{item.unitPrice}</h2>
                            <div className="track-qty">
                                Qty : {item.quantity}
                            </div>
                        </div>
                    </div>
                        ))}
                    

                </div>

                <div className="track-address">
                    <h4>Delivery</h4>
                    <p>address : </p>
                    <p>{item.customerAddress}</p>
                </div>

                <div className="track-summary-con">
                    <div className="track-help">
                        <h4>Need Help</h4>
                        <NavLink to="#"><CiCircleQuestion /> Order issues <MdArrowOutward /></NavLink>
                    </div>

                    <div className="track-summary">
                        <h4>Order Summary</h4>

                        {/* <div className="track-order-flex flex-center gap-10 justification-between">
                            <div className="track-order-title">discount</div>
                            <div className="track-order-price">₦23,444</div>
                        </div>

                        <div className="track-order-flex flex-center gap-10 justification-between">
                            <div className="track-order-title">discount</div>
                            <div className="track-order-price">(20%) - ₦23,444</div>
                        </div> */}

                        {/* <div className="track-order-flex flex-center gap-10 justification-between">
                            <div className="track-order-title">delivery</div>
                            <div className="track-order-price">₦0.00</div>
                        </div>
                        <div className="track-order-flex flex-center gap-10 justification-between">
                            <div className="track-order-title">tax</div>
                            <div className="track-order-price">₦0</div>
                        </div> */}

                        <div className="track-order-flex track-total flex-center gap-10 justification-between">
                            <div className="track-order-title">total</div>
                            <div className="track-order-price">₦{item.total}</div>
                        </div>

                    </div>

                </div>

              { 
              item.orderStatus == "shipped" && (
                    <div className="track-review-con">

                    <div className="track-review-header flex-center justification-center">
                    <h2>submit review</h2>
                    <p>select rating from 1 - 5</p>
                    <div className="track-star flex-center gap-10">
                        <IoIosStar  className="starFilled" />
                        <IoIosStar  className="star" />
                        <IoIosStar  className="star" />
                        <IoIosStar  className="star" />
                        <IoIosStar  className="star" />
                    </div>
                    </div>

                    <div className="track-note">
                        <div className="input">
                            <label >Note <span>(optional)</span></label>
                            <textarea placeholder="Enter Note" cols={30} rows={10}></textarea>
                        </div>

                        <div className="inputBtn">
                            submit
                        </div>
                    </div>

                </div>
              )
                
                
                }

            </div>

        ))}

    </div>
  )
}

export default ProductComponent


