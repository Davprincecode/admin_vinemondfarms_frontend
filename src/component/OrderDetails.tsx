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

interface authComponentInterface {
    authAction : boolean,
    setAuthAction: React.Dispatch<React.SetStateAction<boolean>>;
    PopOrder : orderInterface[]
}

// interface orderInterface {
//     id : string;
//     customerAddress:  string;
//     customerId:  string;
//     customerName:  string;
//     orderDate:  string;
//     orderId:  string;
//     orderStatus:  string;
//     total:  string;
// }

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

const OrderDetails : React.FC<authComponentInterface> = ({authAction, setAuthAction, PopOrder}) =>{

    const navigate = useNavigate();
  const {baseUrl} = userAuth();  
  const { pathname } = useLocation();
  const [print, setPrint] = useState<boolean>(false);
// const [order, setOrder] = useState<orderInterface[]>([]);

  useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

 const handlePrint = () => {
    setPrint(true);
  };

  useEffect(() => {
    if (print) {
      setTimeout(() => {
        window.print();
        setPrint(false); 
      }, 100);
    }
  }, [print]);

  return (
    <div className="track-con" style={{display : authAction ? "flex" : "none"}}>

      <div className={print ? "track-con-print" : "track-body viewDetailsPopUp" } >
         
         <div className="track-cancel-con flex-center justification-between">

             <div className="track-header flex-center gap-10">
                  <h1>Order Details</h1>
             </div>

            <div className="track-cancel">
                <div className="cancel"  onClick={() => setAuthAction(!authAction)}>
                <RxCross2 />
                </div>
            </div>

         </div>

      {  PopOrder.map((item, index) => (


         <div key={index}>
         <div className="track-header-title flex-center justification-between">
           <div className="flex-center gap-10">
            <p>Order ID : {item.orderId}</p>
            <div className="view-pending">{item.orderStatus}</div>
            </div> 

            <div className='view-date flex-center gap-5'>
                 <IoCalendarOutline />
                 <p>{item.orderDate}</p> 
            </div>
         </div>

         <div className="print-download">
            <div className="print" onClick={handlePrint}><FiPrinter /></div>
            <div className="download"  onClick={handlePrint}>download</div>
         </div>

         <div className="customer-container-wrapper">
            <div className="customer-flex">
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

                <div className="order-info-con">
                     <div className="customer-con flex">
                         <div className="customer-icon"><RiShoppingBag4Line /></div> 
                        <div className="customer-details-wrap">
                        <h1>order info</h1>
                        <div className="customer-name flex-center">
                            {/* <p>shipping : </p>
                            <p>next express</p> */}
                        </div>
                        <div className="customer-name flex-center">
                            <p>payment method : </p>
                            <p>{item.paymentMethod}</p>
                        </div>
                        <div className="customer-name flex-center">
                            <p>status  : </p>
                            <p>{item.orderStatus}</p>
                        </div>
                    </div>
                     </div>
                </div>

            </div>
            <div className="delivered-address">
                <div className="del-icon"><RiShoppingBag4Line /></div>
                <h1>deliver to : </h1>
                <p>{item.customerAddress}</p>
            </div>
            
         </div>

         <div className="note-con">
            <div className="input">
                <label>Note</label>
                <textarea name="" id="" cols={30} rows={10}>{item.customerAddress}</textarea>
            </div>
         </div>

         <div className="product-details">
            <div className="product-details-header">
                <h1>products</h1>
                <PiDotsThreeVertical />
            </div>
            <div className="products-list">
                <table>

                        <tr>
                        <th>s/n</th>
                        <th>Product Name</th>
                        <th>Order Id</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>total</th>
                         </tr>
{
                        item.products.map((item, index)=>(
                            <tr key={index}>
                             <td>{index + 1}</td>
                             <td>
                                <div className="product-item-flex">
                                    <div className="track-image">
                                        <img src={item.productImage} alt="" />
                                    </div>
                                    <p>{item.productName}</p>
                                </div>
                             </td>
                             <td>{item.orderId}</td>
                             <td>{item.unitPrice}</td>
                             <td>{item.quantity}</td>
                             <td>{item.total}</td>
                            </tr>
                        ))
                        
                      }

                    </table>
            </div>
            <div className="product-details-footer">
                 <div className="details-total flex-center ">
                    <h1>total</h1>
                    <h1>₦{Number(item.total).toLocaleString()}</h1>
                 </div>
            </div>
         </div>

         </div>
       ))}

      </div>

    </div>
  )
}

export default OrderDetails


