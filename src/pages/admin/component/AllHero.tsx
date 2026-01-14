import React, { useEffect, useState } from 'react'
import { userAuth } from '../../context/AuthContext';
import { tr } from 'framer-motion/client';
import { MdDelete } from 'react-icons/md';
import { RiEdit2Fill } from 'react-icons/ri';
import ButtonPreloader from '../../../component/ButtonPreloader';
import DeletePopup from './DeletePopUp';
import { toast } from 'react-toastify';


interface HeroData {
id: string;
image: string;
status: string;
}


interface HeroInterface {
  heroFunction: () => void;
  setEditId : (id : string) => void;
}

const AllHero : React.FC<HeroInterface> = ({  heroFunction, setEditId }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const {baseUrl, token} = userAuth();
    const [hero, setHero] = useState<HeroData[]>([]);

     const [isActive, setIsActive] = useState(false);
     const [showPopup, setShowPopup] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

     const handleId = (id : string) => {
        setEditId(id);
        heroFunction();
       };

 useEffect(() => {
       getHero()
     }, []);

     const getHero = async () => {
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
                  const response = await fetch(`${baseUrl}/hero-section`, requestOptions);
                  if (!response.ok) {
                  const errorResponse = await response.json();
                  throw new Error(errorResponse.message);
                  }
                  const result = await response.json();   
                   setHero(result.data);
                   
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
                  const response = await fetch(`${baseUrl}/status-hero-section/${id}`, requestOptions);
                  if (!response.ok) {
                  const errorResponse = await response.json();
                  throw new Error(errorResponse.message);
                  }
                  const result = await response.json();   
                   setHero(result.data);
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
                    const response = await fetch(`${baseUrl}/hero-section/${id}`, requestOptions);
                    if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.message);
                    }
                    const result = await response.json();   
                    setHero(result.data);
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


  return (
    <div className="admin-hero-wrap">

        <div className="admin-hero-con">
            <div className="admin-hero-header flex-center justification-between">
                <h4>All Banner</h4>
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
                        <th>banner image</th>
                        <th>status</th>
                        <th>action</th>
                        </tr>
                           {
                            hero.map((value, index)=> (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="inv">
                                        <img src={value.image} alt="" />
                                    </div>
                                </td>
                               
                              
                                <td>
                                    <div className="radio-group">
                                    <label className="toggle-switch">
                                    <input
                                    type="checkbox"
                                    checked={value.status === 'active'}
                                    onChange={() => handleStatusToggle(value.id)}
                                    />
                                    <span className="slider"></span>
                                    </label>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex-center gap-10">
                                        <div className="delete">
                                        <MdDelete className='delete' onClick={() => handleDeleteClick(value.id)} />
                                        </div>
                                        <div className="edit">
                                          <RiEdit2Fill className="edit" onClick={() => handleId(value.id)}/>
                                        </div>
                                    </div>
                                   
                                </td>
                              </tr>
                            ))
                           }
                       

                    </table>
            </div>

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

export default AllHero