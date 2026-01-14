import React, { useState, useEffect } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import invImg from '../../../assets/images/inventoryImg.png'
import { RiDeleteBin6Line, RiDeleteBinLine, RiEdit2Fill, RiPushpinFill, RiUnpinLine } from 'react-icons/ri';
import { FiEdit3 } from 'react-icons/fi';
import { CiSearch } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { userAuth } from '../../context/AuthContext';
import AdminPagination from './AdminPagination';
import { toast } from 'react-toastify';
import DeletePopup from './DeletePopUp';
import ButtonPreloader from '../../../component/ButtonPreloader';
import Carousel from 'react-multi-carousel';



interface Meta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}
interface Product {
productId: string;
productImage: string;
productName: string;
productPrice: number;
productWeight : string;
status : string;
}
interface HeroInterface {
  heroFunction: () => void;
  editId : string;
  setEditId : (id : string) => void;
}

const InActiveProduct : React.FC<HeroInterface> = ({ heroFunction, editId, setEditId }) => {

    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState<number>(1);
    const [meta, setMeta] = useState<Meta | null>(null);
    const {baseUrl, token} = userAuth();
      const[loading, setLoading] = useState<boolean>(false);
        const [showPopup, setShowPopup] = useState(false);
            const [selectedId, setSelectedId] = useState<string | null>(null);

            
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
                      const response = await fetch(`${baseUrl}/inactive-product?page=${pageNumber}`, requestOptions);
                      if (!response.ok) {
                      const errorResponse = await response.json();
                      throw new Error(errorResponse.message);
                      }
                      const result = await response.json();     
                      setProducts(result.data);
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
        
    const handleId = (id : string) => {
    setEditId(id);
    heroFunction();
    };
    const handleStatusToggle = async (id: string) => {
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
                const response = await fetch(`${baseUrl}/status-product/${id}`, requestOptions);
                if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
                }
                const result = await response.json();   
                    getData(page);
                    // setLoading(false);
            } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }
                
            }

    };

    const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setShowPopup(true);
    };
    const handleDeleteConfirm = async (id: string | number) => {
                setLoading(true);
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append("Authorization", token);
                const requestOptions: RequestInit = {
                    method: "DELETE",
                    headers: myHeaders,
                    redirect: "follow"
                };
                try {
                    const response = await fetch(`${baseUrl}/product/${id}`, requestOptions);
                    if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.message);
                    }
                    const result = await response.json();   
                    getData(page);
                    setLoading(false);
                    setShowPopup(false);
                    setSelectedId(null);
                    setLoading(false);
                    toast.error("delete successfully");
                } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }
                    
                }
        
    };

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
                    const response = await fetch(`${baseUrl}/all-product-search/inactive/${search}`, requestOptions);
                    if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.message);
                    }
                    const result = await response.json();
                    setProducts(result.data);
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
                const response = await fetch(`${baseUrl}/all-product-filter/inactive/${search}`, requestOptions);
                if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
                }
                const result = await response.json();
                setProducts(result.data);
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

        const responsive = {
            superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
            },
            desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
            },
            tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
            },
            mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
            }
    }
  return (
    <div>




        <div className="admin-header-form  flex-center gap-10 justification-between">
        
                <div className="flex-center gap-10">
                    <div className="header-form-filter">
                        <select  onChange={(e) => handleFilter(e.target.value)}>
                        <option value="">Filter</option>
                        <option value="pin">Pinned</option>
                        <option value="unpin">Unpinned</option>
                </select>
                    </div>
                    <div className="header-form-input">
                        <input type="text" placeholder='Search' onChange={(e) => handleSearch(e.target.value)}/>
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
                               <th>product</th>
                               <th>price</th>
                               <th>weight</th>
                               <th>status</th>
                               <th>action</th>
                           </tr>
               
                           {
                               products.map((item, index)=>(
                                       <tr key={index}>
                                       <td>{index + 1}</td>
                                       <td>
                                           <div className="gap-5 inv-con">
               
                                      
                                               <div className="inv">
                                               <img src={item.productImage}/>
                                               </div>
                                                                                      
                                                                                  
                                           <div className="invProductName">
                                           <h4>{item.productName}</h4>
                                           </div>
                                           
                                           </div>
                                       </td>
                                       
                                       <td>{item.productPrice.toLocaleString()}</td>
                                       <td>{item.productWeight}</td>
                                       <td>
                                           <div className="radio-group">
                                           <label className="toggle-switch">
                                           <input
                                           type="checkbox"
                                           checked={item.status === 'active'}
                                           onChange={() => handleStatusToggle(item.productId)}
                                           />
                                           <span className="slider"></span>
                                           </label>
                                           </div>
                                       </td>
                                       
                                           <td>
                                               <div className="flex-center gap-10">
                                               <div className="delete">
                                               <MdDelete className='delete' onClick={() => handleDeleteClick(item.productId)} />
                                               </div>
                                               <div className="edit">
                                                   <RiEdit2Fill className="edit" onClick={() => handleId(item.productId)}/>
                                               </div>
                                               </div>
                                           </td>
                                       </tr>
                               ))
                           }
               
               
                     
               
                       
                       </table>
        </div>


<DeletePopup
    isOpen={showPopup}
    itemId={selectedId ?? ""}
    onCancel={() => setShowPopup(false)}
    onDelete={handleDeleteConfirm}
    />

     <div className="adminPagination">
               {meta && <AdminPagination meta={meta} onPageChange={setPage} />}
            </div>

    </div>

    
  )
}

export default InActiveProduct