import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import Footer from '../../component/Footer'
import contactImg from '../assets/images/contactus.png'
import { BiSolidPhoneCall } from 'react-icons/bi'
import { FaDiscord, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedin,  FaWhatsapp } from 'react-icons/fa'

import { useLocation } from 'react-router-dom'
import axios from 'axios'
import ProductComponent from '../../component/ProductComponent'
import BioData from './BioData'
import UserOrder from './UserOrder'
import UserBooking from './UserBooking'
import UserCourse from './UserCourse'
import EditBioData from './EditBioData'

const headers = ['bio data', 'orders', 'booking', 'course'];
const Profile = () => {
  const { pathname } = useLocation();
  const [activeTab, setActiveTab] = useState('bio data'); 

 
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

 

    const [bioData, setData] = useState<boolean>(false);

    const bioFunction = () => {
      setData(!bioData);
    }

  return (

    <div className='user-profile pageNav'>
        <Header />

        <div className="user-profile-con">

              <div className="user-profile-header flex-center justification-between">
                  <p>profile</p>

                  <div className="profile-nav-con flex-center">
                        {headers.map((label) => (
                                    <div
                                    key={label}
                                    className={`profile-nav ${activeTab === label ? 'profile-active' : ''}`}
                                    onClick={() => setActiveTab(label)}
                                    >
                                    {label}
                                    </div>
                                ))}
                  </div>

              </div>

           <div className="user-profile-main-con">
                
               { 
              
               activeTab == 'orders' ? (
                      <UserOrder/>
                ) :  activeTab == 'booking' ? (
                        <UserBooking/>
                ) :  activeTab == 'course' ? (
                       <UserCourse/>
                ): (
                  bioData ? (
                    <EditBioData bioFunction={bioFunction}/>
                  ) : (
                    <BioData bioFunction={bioFunction}/>
                  )
                     
                     
                )
            }

               
            </div>
             
        </div>

   


    </div>

    )
}

export default Profile