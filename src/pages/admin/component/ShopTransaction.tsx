import React, { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import invImg from '../../../assets/images/inventoryImg.png'
import { CiSearch } from 'react-icons/ci';
import { IoSettingsOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';
import { userAuth } from '../../context/AuthContext';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';
import ButtonPreloader from '../../../component/ButtonPreloader';
import AdminPagination from './AdminPagination';
import { toast } from 'react-toastify';
import OrderDetails from '../../../component/OrderDetails';




interface PaymentInterface {
  paymentFunction: () => void; 
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
    deliveryFee : string;
    total:  string;
    paymentMethod : string;
    transactionType : string;
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

const ShopTransaction: React.FC<PaymentInterface> = ({ paymentFunction }) =>{
            const [meta, setMeta] = useState<Meta | null>(null);
            const [page, setPage] = useState(1);
            const [isActive, setIsActive] = useState(false);
            const [loading, setLoading] = useState<boolean>(false);
            const [order, setOrder] = useState<orderInterface[]>([]);
            const{baseUrl, token} = userAuth();

            const [PopOrder, setPopOrder] = useState<orderInterface[]>([]);
            const [authAction, setAuthAction] = useState<boolean>(false);

            useEffect(() => {
            getData(page)
            }, [page]);

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
            const response = await fetch(`${baseUrl}/get-transaction?page=${pageNumber}`, requestOptions);
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
            setLoading(false);
            }
            }

        const handleSearch = async (search : string) => {
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
                    const response = await fetch(`${baseUrl}/transaction-search/${search}`, requestOptions);
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
                        // if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        // toast.error(error.message);
                        // } else {
                        // toast.error('An unknown error occurred.');
                        // }
                    setLoading(false);
                }
        }

        const handleFilter = async (search : string) => {
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
                    const response = await fetch(`${baseUrl}/transaction-filter/${search}`, requestOptions);
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
                        // toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }
                    setLoading(false);
                }
        }


  const viewOrder = (id : string) => {
   setPopOrder(order.filter(item => item.id == id)); 
   setAuthAction(!authAction)
  }

    return (
      <div>
         
  
         <div className="admin-shop-transactions">
            <div className="admin-shop-header">
                          
                            <div className="admin-header-form  flex-center gap-10 justification-between">
            
                                <div className="flex-center gap-10">

                                    <div className="header-form-filter">
                                        <select name="" id="" onChange={(e) => handleFilter(e.target.value)}>
                                            <option value="">Filter</option>
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>

                                    <div className="header-form-input">

                                     <input type="text" placeholder='Search'  onChange={(e) => handleSearch(e.target.value)} />
                                        <CiSearch />
                                    </div>
                                </div>

                                <IoSettingsOutline className='setting-icon' onClick={paymentFunction}/>
                            </div>
            
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
                        <th>s/n</th>
                        <th>id</th>
                        {/* <th>ref</th> */}
                        <th>date</th>
                        <th>Customer</th>
                        <th>total</th>
                        <th>purpose</th>
                        <th>status</th>
                        {/* <th>action</th> */}
                        {/* <th></th> */}
                         </tr>


{
                        order.map((item, index)=>(
                            <tr key={index}>
                             <td>{index + 1}</td>
                             {/* <td>{item.}</td> */}
                             <td>{item.orderId}</td>
                             <td>{item.orderDate}</td>
                             <td>{item.customerName}</td>
                             <td>{item.total}</td>
                             <td>{item.transactionType}</td>
                             <td><div className={item.orderStatus}>{item.orderStatus}</div></td>
                              {/* <td className='action-arrow viewDetails'     
                              onClick={() => viewOrder(item.id)}
                              >
                                view details</td> */}
                            </tr>
                        ))
                        
                      }

                       
                       

                    </table>
            </div>

            <div className="adminPagination">
               {meta && <AdminPagination meta={meta} onPageChange={setPage} />}
            </div>


 <OrderDetails  authAction={authAction} setAuthAction={setAuthAction} PopOrder={PopOrder}/>

         </div>
  
      </div>
    )
}

export default ShopTransaction