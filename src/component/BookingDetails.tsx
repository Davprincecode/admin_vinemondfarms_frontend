import { useEffect, useState } from 'react'
import logo from '../assets/images/logo.png';
import {toast } from 'react-toastify';
import {NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { userAuth } from '../pages/context/AuthContext';
import { FaEye, FaEyeSlash, FaRegUser } from 'react-icons/fa';
import { RxCross2, RxDividerVertical } from 'react-icons/rx';
import { IoIosStar, IoIosStarOutline, IoMdCheckmark } from 'react-icons/io';
import product3sub4 from '../assets/images/product3sub4.png';
import { MdArrowOutward, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { IoCalendarOutline, IoLocationOutline } from 'react-icons/io5';
import { TbTruckDelivery } from 'react-icons/tb';
import { CiCircleQuestion } from 'react-icons/ci';
import { FiPrinter } from 'react-icons/fi';
import { RiShoppingBag4Line } from 'react-icons/ri';
import { PiDotsThreeVertical } from 'react-icons/pi';
import { TiWorld } from 'react-icons/ti';
import { FaRegCalendarDays } from 'react-icons/fa6';

interface authComponentInterface {
    authAction : boolean,
    setAuthAction: React.Dispatch<React.SetStateAction<boolean>>;
    bookingOrder : BookingInterface[]
}

interface BookingInterface {
        bookingDate : string;
        bookingDateFormat : string;
        bookingEndTime : string;
        bookingId : string;
        bookingStartTime : string;
        customerId : string;
        customerName : string;
        customerEmail : string;
        customerPhoneNumber : string;
        customerOrderNote : string;
        id : string;
        orderDate : string;
        orderStatus : string;
        paymentMethod : string;
        timeLeft : string;
        total : number
}

const BookingDetails : React.FC<authComponentInterface> = ({authAction, setAuthAction, bookingOrder}) =>{

    const navigate = useNavigate();
  const {baseUrl} = userAuth();  
  const { pathname } = useLocation();
// const [order, setOrder] = useState<orderInterface[]>([]);

  useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);


  return (
    <div className="booking-details track-con" style={{display : authAction ? "flex" : "none"}}>

      <div className="track-body viewDetailsPopUp">
         
         <div className="track-cancel-con flex-center justification-between">

             <div className="track-header flex-center gap-10">
                  <h1>Booking Details</h1>
             </div>

            <div className="track-cancel">
                <div className="cancel"  onClick={() => setAuthAction(!authAction)}>
                <RxCross2 />
                </div>
            </div>

         </div>

      {  bookingOrder.map((item, index) => (


         <div key={index} className='booking-order-details'>
         
        
         <div className="customer-container-wrapper">

            <div className="consultant-details">
                        <div className="flex-center consultant-date gap-10">
                            <FaRegCalendarDays />
                            <p>{item.bookingDateFormat}</p>
                        </div>
                        <div className="time">{item.bookingStartTime} - {item.bookingEndTime}</div>
                        {/* <div className="flex-center consultant-time gap-10">
                            <TiWorld />
                            <p>time zone europe</p>
                        </div> */}
                    </div>

            <div className="customer-flex customer-wrapper">
                <div className="customer-details-con">
                 <div className="customer-con flex">
                    <div className="customer-icon"><FaRegUser /></div>
                    <div className="customer-details-wrap">
                        <h1>customer</h1>
                        <div className="customer-name flex-center">
                            <p>full name : </p>
                            <p>{item.customerName}</p>
                        </div>
                        <div className="customer-name flex-center">
                            <p>email : </p>
                            <p>{item.customerEmail}</p>
                        </div>
                        <div className="customer-name flex-center">
                            <p>phone  : </p>
                            <p>{item.customerPhoneNumber}</p>
                        </div>
                    </div>
                 </div>
                </div>
            </div>

            
         </div>

         <div className="note-con">
            <div className="input">
                <label>Note</label>
                <textarea name="" id="" cols={30} rows={10}  readOnly>{item.customerOrderNote}</textarea>
            </div>
         </div>

        

         </div>
       ))}

      </div>

    </div>
  )
}

export default BookingDetails


