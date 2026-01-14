import React, { useState, useEffect } from 'react'
import { IoIosArrowDown } from 'react-icons/io';
import invImg from '../../../assets/images/inventoryImg.png'
import { RiDeleteBin6Line, RiDeleteBinLine, RiEdit2Fill, RiPushpinFill, RiUnpinFill, RiUnpinLine } from 'react-icons/ri';
import { FiEdit3 } from 'react-icons/fi';
import { CiSearch } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { userAuth } from '../../context/AuthContext';
import AdminPagination from './AdminPagination';
import { tr } from 'framer-motion/client';
import { toast } from 'react-toastify';
import DeletePopup from './DeletePopUp';
import ButtonPreloader from '../../../component/ButtonPreloader';



interface HeroInterface {
  heroFunction: () => void;
  setEditId : (id : string) => void;
}

const  AllAboutUs : React.FC<HeroInterface> = ({  heroFunction, setEditId }) => {
    
    const {baseUrl, token} = userAuth();
    const[loading, setLoading] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const [id, setId] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
      getData()
      }, []);
    
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
                  const response = await fetch(`${baseUrl}/about-us`, requestOptions); 
                  if (!response.ok) {
                  const errorResponse = await response.json();
                  throw new Error(errorResponse.message);
                  }
                  const result = await response.json();  
                  setId(result.data.id);
                  setMessage(result.data.content);
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
        
     

          const handleDeleteClick = (id: string) => {
          setSelectedId(id);
          setShowPopup(true);
          };
          const handleDeleteConfirm = async (id: string | number) => {
                      setLoading(true);
                      const myHeaders = new Headers();
                      myHeaders.append("Authorization", token);
                      const requestOptions: RequestInit = {
                          method: "DELETE",
                          headers: myHeaders,
                          redirect: "follow"
                      };
                      try {
                          const response = await fetch(`${baseUrl}/delete-about-us/${id}`, requestOptions);      
                          if (!response.ok) {
                          const errorResponse = await response.json();
                          throw new Error(errorResponse.message);
                          }
                          const result = await response.json();   
                          // setProducts(result.data);
                          setLoading(false);
                          setShowPopup(false);
                          setSelectedId(null);
                          setLoading(false);
                          setId('');
                          setMessage('');
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

              
  return (
    <div>

        

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
                <th>content</th>
                <th>action</th>
            </tr>
                
                {
                  id && (
                    <tr>
                                              
                        <td>
                            <div className='flex-wrap gap-2'  dangerouslySetInnerHTML={{ __html: message }} />
                            </td>
    
                            <td>
                                <div className="flex-center gap-10">
                                  <div className="edit">
                                    <RiEdit2Fill className="edit" onClick={() => handleId(id)}/>
                                </div>

                                <div className="delete">
                                <MdDelete className='delete' onClick={() => handleDeleteClick(id)} />
                                </div>
                                
                                </div>
                            </td>
                        </tr>
                  )
                }
                        
                        

        </table>
</div>

    <DeletePopup
    isOpen={showPopup}
    itemId={selectedId ?? ""}
    onCancel={() => setShowPopup(false)}
    onDelete={handleDeleteConfirm}
    />
    
        
    </div>
  )
}

export default AllAboutUs