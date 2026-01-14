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

interface profileInterface{
    id : string;
    staffImg : string;
    staffName : string;
    staffPosition : string;
    staffProfile : string;
    staffQuanlification : string;
}

const  AllTeam : React.FC<HeroInterface> = ({  heroFunction, setEditId }) => {
    
    const {baseUrl, token} = userAuth();
    const[loading, setLoading] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [profile, setProfile] = useState<profileInterface[]>([]);

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
                  const response = await fetch(`${baseUrl}/team`, requestOptions); 
                  if (!response.ok) {
                  const errorResponse = await response.json();
                  throw new Error(errorResponse.message);
                  }
                  const result = await response.json();
                  setProfile(result.data);
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
                          const response = await fetch(`${baseUrl}/team/${id}`, requestOptions);  
                            
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
                          setProfile(data => data.filter(item => item.id != id));
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
                <th>staff</th>
                <th>staff position</th>
                <th>staff quanlification</th>
                <th>staff profile</th>
                <th>action</th>
            </tr>

            {
              profile.map((item, id) => (
            <tr >         
                <td><div className="flex gap-5 inv-con">

                            <div className="inv">
                            <img src={item.staffImg}/>
                            </div>
                            <div className="invProductName">
                            <h4>{item.staffName}</h4>
                            
                            </div>
                            
                            </div>
                            </td>    
                       
                         <td>{item.staffPosition}</td>
                         <td>{item.staffQuanlification}</td>  
                                        
                         <td>
                            <div className='flex-wrap gap-2'  dangerouslySetInnerHTML={{ __html: item.staffProfile }} />
                        </td>

                            <td>
                                <div className="flex-center gap-10">
                                    <div className="edit">
                                    <RiEdit2Fill className="edit" onClick={() => handleId(item.id)}/>
                                </div>

                                <div className="delete">
                                <MdDelete className='delete' onClick={() => handleDeleteClick(item.id)} />
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
    
        
    </div>
  )
}

export default AllTeam