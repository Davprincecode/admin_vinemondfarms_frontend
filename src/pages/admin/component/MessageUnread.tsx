import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { CiSearch } from 'react-icons/ci'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoIosStar } from 'react-icons/io'
import profile from '../../../assets/images/profile.png'
import ButtonPreloader from '../../../component/ButtonPreloader'
import { toast } from 'react-toastify'
import { userAuth } from '../../context/AuthContext'
import AdminPagination from './AdminPagination'


interface messageIntern {
  id : string;
  address : string;
  email : string;
  is_favorite : boolean;
  is_read : boolean;
  message : string;
   attachment : string;
  name : string;
  createdAt : string;
  phoneNumber : string;
  subject : string;
  onGoing : boolean;
 }

 interface msg{
     setMsgDetail: React.Dispatch<React.SetStateAction<boolean>>;
     setMessageData: React.Dispatch<React.SetStateAction<messageIntern[]>>;
  }

interface Meta {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}


function MessageUnread({setMsgDetail, setMessageData} : msg) {
  const [page, setPage] = useState(1);
const [meta, setMeta] = useState<Meta | null>(null); 
  const {baseUrl, token} = userAuth();
  const [loading, setLoading] = useState<boolean>(false);  
  const [message, setMessage] = useState<messageIntern[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

    useEffect(() => {
          handleEmail(page);
        }, [page]);

      const handleEmail = async(pageNumber : number) => {
          setLoading(true);
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", token);
          const requestOptions: RequestInit = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
          };
          try {
            const response = await fetch(`${baseUrl}/message-unread?page=${pageNumber}`, requestOptions);
            if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.message);
              }
              const result = await response.json(); 
              setMessage(result.data); 
              setMeta(result.meta);   
          } catch (error: any) {
            toast.error(error.message || "Something went wrong");
          } finally {
            setLoading(false);
          }
        
       }

      const handleFavourite = async(id : string) => {
              setLoading(true);
              const myHeaders = new Headers();
              myHeaders.append("Content-Type", "application/json");
              myHeaders.append("Authorization", token);
              const requestOptions: RequestInit = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
              };
              try {
                const response = await fetch(`${baseUrl}/message-mark-favourite/${id}`, requestOptions);
                if (!response.ok) {
                  const errorResponse = await response.json();
                  throw new Error(errorResponse.message);
                  }
                  const result = await response.json(); 
                  handleEmail(page);
                  toast.success(result.message);
              } catch (error: any) {
                toast.error(error.message || "Something went wrong");
              } finally {
                setLoading(false);
              }
            
          }

     const handleMove = async(id : string, path : string) => {
            setLoading(true);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", token);
            const requestOptions: RequestInit = {
              method: "GET",
              headers: myHeaders,
              redirect: "follow",
            };
            try {
              const response = await fetch(`${baseUrl}/move-to-${path}/${id}`, requestOptions);
              if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.message);
                }
                const result = await response.json(); 
               handleEmail(page);
                toast.success(result.message);
            } catch (error: any) {
              toast.error(error.message || "Something went wrong");
            } finally {
              setLoading(false);
            }
          
         }

     const handleMessage = ($data : messageIntern) => {
      setMsgDetail(true);
      setMessageData([$data]);
     }

       const handleDateFilter = async(e: React.ChangeEvent<HTMLSelectElement>) => {
                
     
                 const value = e.target.value;
     
                 if(value){
     
                
                 let startDate: Date;
                 let endDate: Date = new Date(); 
     
                 switch (value) {
                   case 'today':
                     startDate = new Date();
                     break;
     
                   case 'week':
                     startDate = new Date();
                     startDate.setDate(startDate.getDate() - 7);
                     break;
     
                   case 'month':
                     startDate = new Date();
                     startDate.setMonth(startDate.getMonth() - 1);
                     break;
     
                   case 'year':
                     startDate = new Date();
                     startDate.setFullYear(startDate.getFullYear() - 1);
                     break;
     
                   default:
                     startDate = new Date(0); 
                 }
                 //  const formatDate = (date: Date) => date.toISOString().split('T')[0];        
             setLoading(true);
             const myHeaders = new Headers();
             myHeaders.append("Content-Type", "application/json");
             myHeaders.append("Authorization", token);
             const requestOptions: RequestInit = {
               method: "GET",
               headers: myHeaders,
               redirect: "follow",
             };
             try {
               const response = await fetch(`${baseUrl}/filter-message/unread/${startDate.toISOString()}/${endDate.toISOString()}`, requestOptions);
               if (!response.ok) {
                 const errorResponse = await response.json();
                 throw new Error(errorResponse.message);
                 }
                 const result = await response.json(); 
                 setMessage(result.data);  
                 setMeta(result.meta);
                 toast.success(result.message);
             } catch (error: any) {
               toast.error(error.message || "Something went wrong");
             } finally {
               setLoading(false);
             } 
           
           } else {
             handleEmail(page);
           }
           
          
          };
     
       const handleDateSearch = async(value : string) => { 
            if(value){
        
             setLoading(true);
             const myHeaders = new Headers();
             myHeaders.append("Content-Type", "application/json");
             myHeaders.append("Authorization", token);
             const requestOptions: RequestInit = {
               method: "GET",
               headers: myHeaders,
               redirect: "follow",
             };
             try {
               const response = await fetch(`${baseUrl}/filter-message/unread/${value}`, requestOptions);
               if (!response.ok) {
                 const errorResponse = await response.json();
                 throw new Error(errorResponse.message);
                 }
                 const result = await response.json();
                 setMessage(result.data);  
                 setMeta(result.meta); 
                 toast.success(result.message);
             } catch (error: any) {
               toast.error(error.message || "Something went wrong");
             } finally {
               setLoading(false);
             }
           } else{
      handleEmail(page);
           }
          };

          const handleDelete = async(id : string) => {
                  setLoading(true);
                  const myHeaders = new Headers();
                  myHeaders.append("Content-Type", "application/json");
                  myHeaders.append("Authorization", token);
                  const requestOptions: RequestInit = {
                    method: "DELETE",
                    headers: myHeaders,
                    redirect: "follow",
                  };
                  try {
                    const response = await fetch(`${baseUrl}/message/${id}`, requestOptions); 
                    if (!response.ok) {
                      const errorResponse = await response.json();
                      throw new Error(errorResponse.message);
                      }
                      const result = await response.json(); 
                      setMessage(message.filter(item => item.id !== id));
                      toast.success(result.message);
                  } catch (error: any) {
                    toast.error(error.message || "Something went wrong");
                  } finally {
                    setLoading(false);
                  }
                
               }
  return (
    <div className='admin-dashboard'>

            <div className="admin-header-form  flex-center gap-10 justification-between">
    
                <div className="flex-center gap-10">
                    

                    <div className="header-form-input">
                                            <input type="text" placeholder='Search' onChange={(e) => handleDateSearch(e.target.value)}/>
                                            <CiSearch />
                                        </div>
                                        <div className="header-form-filter">
                                                <select onChange={handleDateFilter}>
                                                    <option value="">None</option>
                                                    <option value="today">Today</option>
                                                    <option value="week">This Week</option>
                                                    <option value="month">This Month</option>
                                                    <option value="year">This Year</option>
                                                </select>
                                        </div>

                </div>
                    {/* <MdDelete className='delete'/> */}
            </div>

             <div className="admin-message-body">
              {
                loading ? (
                  <ButtonPreloader/>
                )  : (

                  message.map((item, index)=>(

                   <div className="admin-message-con-wrapper" style={{ background : item.is_read ? "white" : "unset" }}>

                   <div className="admin-message-con" key={index}  onClick={() => handleMessage(item)}>

                 <div className="admin-message-header flex-center justification-between">
                    <h2>{item.subject}</h2>
                 </div>

                 <div className="admin-message-body">
                    <div className="admin-message-icon flex justification-between">
                        <div className="admin-message-container">
                          {/* <div className="admin-message-title">
                            How to deposit money to my portal?
                          </div> */}
                          <div className="admin-message">
                          <div dangerouslySetInnerHTML={{ __html: item.message }} />
                        </div>
                        </div>
                    
                    </div>
                 </div>
                 
                 {
                    item.attachment && (
                      <div className="admin-message-attachment" style={{   height: "50px"}}>
                        <img src={item.attachment}/>
                      </div>
                    )
                  }

                 <div className="admin-message-footer flex-center justification-between">
                     <div className="admin-message-user flex-center gap-5">
                         <div className="admin-profile">
                           <img src={profile} alt="" />
                         </div>
                        <p>{item.name}</p>
                     </div>
                 </div>

                  </div>

                    <div className="another-message-section">
                            <p>Posted at {item.createdAt}</p>
                             <div className="three-dot"  onClick={() =>
                                  setActiveDropdown(activeDropdown === index ? null : index)
                                }>
                          <BsThreeDotsVertical />
                              {activeDropdown === index && (
                                <div className="dropdown-menu">
                                  <div onClick={() => handleMove(item.id, "inbox")}>Move to Inbox</div>
                                  <div onClick={() => handleMove(item.id, "read")}>Mark as read</div>
                                  <div onClick={() => handleMove(item.id, "archive")}>Move to Archive</div>
                                  <div onClick={() => handleDelete(item.id)}>Delete Message</div>
                                </div>
                              )}
                        </div>



                    <div className="admin-star admin-starr" onClick={() => handleFavourite(item.id)}>
                      {
                        item.is_favorite ? (
                            <IoIosStar className='star-fill'/>
                        ) : (
                          <IoIosStar />
                        )
                      }
                     </div>

                    </div>
                   
                 </div>

                  ))
                )
              }
             

            </div>

          <div className="adminPagination">
              {meta && <AdminPagination meta={meta} onPageChange={setPage} />}
          </div>
      
    </div>
    
  )
}

export default MessageUnread