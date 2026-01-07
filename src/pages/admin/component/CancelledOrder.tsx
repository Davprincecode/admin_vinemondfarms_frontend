import React, { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import invImg from '../../../assets/images/inventoryImg.png'
import { CiSearch } from 'react-icons/ci';
import { RiDeleteBinLine, RiFolderDownloadLine } from 'react-icons/ri';
import { MdDelete, MdOutlineArrowDropDownCircle, MdOutlineDelete } from 'react-icons/md';
import { userAuth } from '../../context/AuthContext';
import ButtonPreloader from '../../../component/ButtonPreloader';
import AdminPagination from './AdminPagination';
import { AiOutlineEye } from 'react-icons/ai';
import OrderDetails from '../../../component/OrderDetails';
import { toast } from 'react-toastify';


interface orderInterface {
    id : string;
    customerAddress:  string;
    customerId:  string;
    customerName:  string;
    customerEmail : string;
   customerPhoneNumber : string;
    orderDate:  string;
    orderId:  string;
    orderStatus:  string;
    deliveryFee : string;
    total:  string;
    paymentMethod: string;
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

interface Meta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}

function CancelledOrder() {
  const [meta, setMeta] = useState<Meta | null>(null);
  const [PopOrder, setPopOrder] = useState<orderInterface[]>([]);
  const [authAction, setAuthAction] = useState<boolean>(false);
    const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
     
    
        const handleToggleDropdown = (id: string) => {
        setActiveOrderId(prev => (prev === id ? null : id));
        };
    
    const handleToggleView = (id: string) => {
    setActiveViewId(prev => (prev === id ? null : id));
    };
        const [activeViewId, setActiveViewId] = useState<string | null>(null);
        const [loading, setLoading] = useState<boolean>(false);
        const [order, setOrder] = useState<orderInterface[]>([]);
      const[page, setPage] = useState<number>(1);
        const{baseUrl, token} = userAuth();
    
useEffect(() => {
        getData(page)
        }, []);

const getData = async (pageNumber : number) => {
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
            const response = await fetch(`${baseUrl}/get-order/cancelled?page=${pageNumber}`, requestOptions);
            if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
            }
            const result = await response.json();  
            setOrder(result.data);
            setMeta(result.meta);
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

const confirmOrder = async (id: string) => {
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
              const response = await fetch(`${baseUrl}/get-order/confirmed/${id}/pending`, requestOptions);
              if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.message);
              }
              const result = await response.json();   
              setOrder(result.data);
              setMeta(result.meta);
              toast.success("order status updated successfully");
              setLoading(false);
          } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }
              
          }
  setActiveOrderId(null); // Close dropdown
};

const cancelOrder = async (id: string) => {
  // await fetch(`/api/orders/${id}/cancel`, { method: 'POST' });
  // setActiveOrderId(null); 
  // Close dropdown
};

  const handleSearch = async (search : string, status : string) => {
        if(search == ''){
             getData(page);
        }
        setLoading(true);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const requestOptions: RequestInit = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            try {
                const response = await fetch(`${baseUrl}/order-search/${search}/${status}`, requestOptions);
                
                if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
                }
                const result = await response.json();
                setOrder(result.data);
                setMeta(result.meta);
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

     const viewOrder = (id : string) => {
   setPopOrder(order.filter(item => item.id == id));
   setAuthAction(!authAction)
  }
  return (
    <div>
          <div className="admin-header-form  flex-center gap-10 justification-between">
            
                                <div className="flex-center gap-10">
                                    {/* <div className="header-form-filter">
                                        <select name="" id="">
                                            <option value="">Filter</option>
                                        </select>
                                    </div> */}
                                    <div className="header-form-input">
                                        <input type="text" placeholder='Search'  onChange={(e) => handleSearch(e.target.value, "cancelled")}/>
                                        <CiSearch />
                                    </div>
                                </div>
                                <MdDelete className='delete'/>
                            </div>


                             <div className="admin-shop-container">

                                                    {
                                                    loading && (
                                                        <div className="cart-prealoader">
                                                            <ButtonPreloader/>
                                                        </div>
                                
                                                    ) 
                                                    }
                                                    
                    <table>
                        <tr>
                        <th>sn</th>
                        <th>order id</th>
                        <th>date</th>
                        <th>Customer</th>
                        <th>Delivery Fee</th>
                        <th>total</th>
                        <th>payment status</th>
                        <th>order status</th>
                        <th></th>
                        
                        </tr>

                                                    {order.map((item, index) => (
                                                    <React.Fragment key={item.id}>
                                                    <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.orderId}</td>
                                                    <td>{item.orderDate}</td>
                                                    <td>{item.customerName}</td>
                                                    <td>{item.deliveryFee}</td>
                                                    <td>{item.total}</td>
                                                    <td><div className="paid">paid</div></td>
                                                    <td  style={{position : 'relative'}} >
                                                    <div className="ordercancalled flex-center gap-10" 
                        
                                                    onClick={() => handleToggleDropdown(item.id)}
                                                    >
                                                    {item.orderStatus}
                                                     {/* <IoIosArrowDown /> */}
                                                    </div>
                        
                                                    {/* {activeOrderId === item.id && (
                                                    <div className="confirmPop">
                                                    <div className='performAction'>
                                                      <div className="confirmAction  statusAction"  onClick={() => confirmOrder(item.orderId)}>Set to refund</div>
                                                      
                                                    </div>
                                                    </div>
                                                    )} */}
                        
                                                    </td>
                        
                        
                                                    <td className='action-arrow'   style={{position : 'relative'}}  onClick={() => handleToggleView(item.id)}>
                                                    <MdOutlineArrowDropDownCircle />
                        
                                                    {activeViewId === item.id && (
                                                    <div className="viewPop">
                                                    <div className='viewAction'>
                                                      <div className="confirmView  statusAction"    onClick={() => viewOrder(item.id)}>
                                                        <AiOutlineEye /> View Order Details
                                                      </div>
                                                      {/* <div className="cancelView statusAction"  onClick={() => cancelOrder(item.id)}>
                                                        <RiFolderDownloadLine /> Download Order Details
                                                      </div> */}
                                                    </div>
                                                    </div>
                                                    )}
                        
                                                    </td>
                        
                                                    </tr>
                        
                                                    </React.Fragment>
                                                    ))}

                       
                    </table>
            </div>

             <div className="adminPagination">
               {meta && <AdminPagination meta={meta} onPageChange={setPage} />}
            </div>
            <OrderDetails  authAction={authAction} setAuthAction={setAuthAction} PopOrder={PopOrder}/>
    </div>
  )
}

export default CancelledOrder