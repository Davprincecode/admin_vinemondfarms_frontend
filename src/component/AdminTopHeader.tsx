import React, { useEffect, useState } from 'react'
import { userAuth } from '../pages/context/AuthContext';
import { IoIosArrowDropdown, IoIosNotificationsOutline} from 'react-icons/io';
import logo from '../assets/images/logo.png'


import { toast } from 'react-toastify';
import { IoSearchOutline } from 'react-icons/io5';
import { GoBell } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import Notification from './Notification';

interface SideNavProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
interface dataIntern {
  "id":string,
  "subject": string,
  "message": string,
  "path": string,
  "createdAt" : string,
  "status": string
}

const AdminTopHeader = () => {
  const {baseUrl, token, notification, role, image} = userAuth(); 
  const [loading, setLoading] = useState<boolean>(false);
  
  const [notificationData, setNotificationData] = useState<dataIntern[]>([]);
  const [notifications, setNotifications] = useState<boolean>(false);
  const [adminProfile, setAdminProfile] = useState<boolean>(false);


  const handleNotification = () => {
     setAdminProfile(false);
     setNotifications(true);  
  }

  const handleProfile = () => {
    setNotifications(false);
    setAdminProfile(!adminProfile);
  }

    useEffect(() => {
      const fetchData = async () => {
          setLoading(true);
          const myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          myHeaders.append("Authorization", token);
          const requestOptions: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };
          try {
            const response = await fetch(`${baseUrl}/notification`, requestOptions);
            
            if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.message);
            }
            const result = await response.json();
             setNotificationData(result.data);
            setLoading(false);
          } catch (error) {
                        setLoading(false);
                        if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                        toast.error(error.message);
                        } else {
                        toast.error('An unknown error occurred.');
                        }
            
              setLoading(false);
              if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
                // toast.error(error.message);
              } else {
                toast.error('An unknown error occurred.');
              }
            }
        
      };
      fetchData();
    }, []);
    

  return (
    <div>

      <div className="topCon">
        
          <div className="flex-center justification-between adminTopNav">

            <div className="flex-center adminLogoCon">
              
              <NavLink to="">
                <div className="adminTopLogo">
                    <img src={logo} alt="" />
                </div>
              </NavLink>

              
            </div>

          
          

          </div>

      </div>
     
   
    </div>
  )
}

export default AdminTopHeader
